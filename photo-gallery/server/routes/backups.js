const express = require('express');
const router = express.Router();
const { createBackup, listBackups, restoreBackup, deleteBackup } = require('../utils/backup');
const auth = require('../middleware/auth');
const fs = require('fs');
const path = require('path');

// Format file size
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Get all backups (admin only)
router.get('/', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
    
    const backups = await listBackups();
    
    // Format the response
    const formattedBackups = backups.map(backup => ({
      id: backup.filename.replace('.zip', ''),
      filename: backup.filename,
      created: backup.created,
      createdFormatted: new Date(backup.created).toLocaleString(),
      size: backup.size,
      sizeFormatted: formatBytes(backup.size)
    }));
    
    res.json(formattedBackups);
  } catch (error) {
    console.error('Error listing backups:', error);
    res.status(500).json({ message: 'Failed to list backups' });
  }
});

// Create a new backup (admin only)
router.post('/', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
    
    const { name } = req.body;
    const backupPath = await createBackup(name || 'manual');
    
    res.json({ 
      message: 'Backup created successfully',
      backupPath
    });
  } catch (error) {
    console.error('Error creating backup:', error);
    res.status(500).json({ message: 'Failed to create backup' });
  }
});

// Restore from a backup (admin only)
router.post('/restore/:id', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
    
    const backups = await listBackups();
    const backupId = req.params.id;
    
    // Find the backup with the matching ID
    const backup = backups.find(b => b.filename.replace('.zip', '') === backupId);
    
    if (!backup) {
      return res.status(404).json({ message: 'Backup not found' });
    }
    
    await restoreBackup(backup.path);
    
    res.json({ 
      message: 'Backup restored successfully',
      backupPath: backup.path
    });
  } catch (error) {
    console.error('Error restoring backup:', error);
    res.status(500).json({ message: 'Failed to restore backup' });
  }
});

// Delete a backup (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
    
    const backups = await listBackups();
    const backupId = req.params.id;
    
    // Find the backup with the matching ID
    const backup = backups.find(b => b.filename.replace('.zip', '') === backupId);
    
    if (!backup) {
      return res.status(404).json({ message: 'Backup not found' });
    }
    
    await deleteBackup(backup.path);
    
    res.json({ 
      message: 'Backup deleted successfully',
      backupPath: backup.path
    });
  } catch (error) {
    console.error('Error deleting backup:', error);
    res.status(500).json({ message: 'Failed to delete backup' });
  }
});

// Get backup logs (admin only)
router.get('/logs', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
    
    const logPath = path.join(__dirname, '../backup-logs.txt');
    
    // Check if log file exists
    if (!fs.existsSync(logPath)) {
      return res.json({ logs: [] });
    }
    
    // Read the log file
    const logContent = fs.readFileSync(logPath, 'utf8');
    const logs = logContent.split('\n')
      .filter(line => line.trim() !== '')
      .map(line => {
        // Extract timestamp and message
        const match = line.match(/\[(.*?)\]\s(.*)/);
        if (match) {
          return {
            timestamp: match[1],
            message: match[2]
          };
        }
        return { message: line };
      });
    
    res.json({ logs });
  } catch (error) {
    console.error('Error reading backup logs:', error);
    res.status(500).json({ message: 'Failed to read backup logs' });
  }
});

module.exports = router;