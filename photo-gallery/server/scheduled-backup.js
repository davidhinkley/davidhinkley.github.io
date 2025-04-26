#!/usr/bin/env node

const { createBackup, listBackups, deleteBackup } = require('./utils/backup');
const fs = require('fs');
const path = require('path');

// Initialize global.db for backup operations
global.db = require('./db.json');

// Configuration
const config = {
  // Maximum number of backups to keep
  maxBackups: 10,
  // Backup name prefix
  namePrefix: 'scheduled',
  // Log file path - using relative path from the application root
  logFile: path.join(__dirname, 'backup-logs.txt')
};

// Log the current working directory and script location for debugging
console.log(`Current working directory: ${process.cwd()}`);
console.log(`Script location: ${__dirname}`);
console.log(`Using tar.xz format for backups`);

/**
 * Log a message to console and log file
 * @param {string} message - Message to log
 */
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  
  console.log(logMessage);
  
  // Append to log file
  fs.appendFileSync(config.logFile, logMessage + '\n');
}

/**
 * Create a scheduled backup
 */
async function runScheduledBackup() {
  try {
    log('Starting scheduled backup...');
    
    // Create a new backup
    const backupPath = await createBackup(config.namePrefix);
    log(`Backup created successfully: ${backupPath}`);
    
    // Rotate backups if needed
    await rotateBackups();
    
    log('Scheduled backup completed successfully');
  } catch (error) {
    log(`ERROR: Scheduled backup failed: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Rotate backups to keep only the specified number of most recent backups
 */
async function rotateBackups() {
  try {
    // Get all backups
    const backups = await listBackups();
    
    // Filter scheduled backups (both .zip and .tar.xz formats)
    const scheduledBackups = backups.filter(backup => 
      backup.filename.includes(config.namePrefix)
    );
    
    // If we have more than the maximum allowed, delete the oldest ones
    if (scheduledBackups.length > config.maxBackups) {
      log(`Found ${scheduledBackups.length} scheduled backups, keeping ${config.maxBackups}`);
      
      // Sort by creation date (oldest first)
      const backupsToDelete = scheduledBackups
        .sort((a, b) => a.created - b.created)
        .slice(0, scheduledBackups.length - config.maxBackups);
      
      // Delete old backups
      for (const backup of backupsToDelete) {
        log(`Deleting old backup: ${backup.filename}`);
        await deleteBackup(backup.path);
      }
    }
  } catch (error) {
    log(`ERROR: Backup rotation failed: ${error.message}`);
    throw error;
  }
}

// Run the backup
runScheduledBackup();