const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const extract = require('extract-zip');
const { promisify } = require('util');
const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);

// Backup directory - using relative path from the application root
const backupDir = path.join(__dirname, '../backups');

// Ensure backup directory exists
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
  console.log(`Created backup directory at: ${backupDir}`);
}

/**
 * Create a backup of the current state
 * @param {string} name - Optional name for the backup
 * @returns {Promise<string>} - Path to the backup file
 */
async function createBackup(name = '') {
  try {
    // Create timestamp for backup name
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupName = name ? `${timestamp}_${name}` : timestamp;
    const backupPath = path.join(backupDir, `${backupName}.zip`);
    
    // Create a file to stream archive data to
    const output = fs.createWriteStream(backupPath);
    const archive = archiver('zip', {
      zlib: { level: 9 } // Maximum compression
    });
    
    // Listen for all archive data to be written
    const archiveFinished = new Promise((resolve, reject) => {
      output.on('close', () => resolve());
      archive.on('error', err => reject(err));
    });
    
    // Pipe archive data to the file
    archive.pipe(output);
    
    // Add database snapshot
    const dbSnapshot = JSON.stringify(global.db, null, 2);
    archive.append(dbSnapshot, { name: 'db.json' });
    
    // Add uploads directory
    const uploadsDir = path.join(__dirname, '../uploads');
    archive.directory(uploadsDir, 'uploads');
    
    // Finalize the archive
    await archive.finalize();
    await archiveFinished;
    
    console.log(`Backup created: ${backupPath} (${archive.pointer()} bytes)`);
    return backupPath;
  } catch (error) {
    console.error('Backup creation failed:', error);
    throw error;
  }
}

/**
 * List all available backups
 * @returns {Promise<Array>} - Array of backup info objects
 */
async function listBackups() {
  try {
    const files = fs.readdirSync(backupDir).filter(file => file.endsWith('.zip'));
    
    return files.map(file => {
      const filePath = path.join(backupDir, file);
      const stats = fs.statSync(filePath);
      
      return {
        filename: file,
        path: filePath,
        size: stats.size,
        created: stats.mtime
      };
    }).sort((a, b) => b.created - a.created); // Sort by date, newest first
  } catch (error) {
    console.error('Error listing backups:', error);
    throw error;
  }
}

/**
 * Restore from a backup
 * @param {string} backupPath - Path to the backup file
 * @returns {Promise<boolean>} - Success status
 */
async function restoreBackup(backupPath) {
  try {
    // Create a temporary directory for extraction
    const tempDir = path.join(__dirname, '../temp_restore');
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    fs.mkdirSync(tempDir, { recursive: true });
    
    // Extract the backup
    await extract(backupPath, { dir: tempDir });
    
    // Read the database snapshot
    const dbSnapshot = fs.readFileSync(path.join(tempDir, 'db.json'), 'utf8');
    global.db = JSON.parse(dbSnapshot);
    
    // Restore uploads directory
    const uploadsDir = path.join(__dirname, '../uploads');
    const backupUploadsDir = path.join(tempDir, 'uploads');
    
    // Clear current uploads directory
    if (fs.existsSync(uploadsDir)) {
      // Keep the directory but remove all files except .gitkeep
      const files = fs.readdirSync(uploadsDir);
      for (const file of files) {
        if (file !== '.gitkeep') {
          fs.unlinkSync(path.join(uploadsDir, file));
        }
      }
    } else {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    // Copy files from backup to uploads directory
    const backupFiles = fs.readdirSync(backupUploadsDir);
    for (const file of backupFiles) {
      await copyFile(
        path.join(backupUploadsDir, file),
        path.join(uploadsDir, file)
      );
    }
    
    // Clean up temp directory
    fs.rmSync(tempDir, { recursive: true, force: true });
    
    console.log(`Backup restored from: ${backupPath}`);
    return true;
  } catch (error) {
    console.error('Backup restoration failed:', error);
    throw error;
  }
}

/**
 * Delete a backup
 * @param {string} backupPath - Path to the backup file
 * @returns {Promise<boolean>} - Success status
 */
async function deleteBackup(backupPath) {
  try {
    fs.unlinkSync(backupPath);
    console.log(`Backup deleted: ${backupPath}`);
    return true;
  } catch (error) {
    console.error('Backup deletion failed:', error);
    throw error;
  }
}

module.exports = {
  createBackup,
  listBackups,
  restoreBackup,
  deleteBackup
};