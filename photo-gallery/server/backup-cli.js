#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { 
  createBackup, 
  listBackups, 
  restoreBackup, 
  deleteBackup 
} = require('./utils/backup');

// Initialize global.db for backup/restore operations
global.db = require('./db.json');

// Format file size
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Format date
function formatDate(date) {
  return new Date(date).toLocaleString();
}

// Create a backup
async function backup() {
  try {
    const { name } = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter a name for this backup (optional):',
      }
    ]);
    
    console.log(chalk.blue('Creating backup...'));
    const backupPath = await createBackup(name);
    console.log(chalk.green(`✓ Backup created successfully: ${backupPath}`));
  } catch (error) {
    console.error(chalk.red('Backup failed:'), error);
  }
}

// List all backups
async function list() {
  try {
    const backups = await listBackups();
    
    if (backups.length === 0) {
      console.log(chalk.yellow('No backups found.'));
      return;
    }
    
    console.log(chalk.blue('\nAvailable backups:'));
    console.log(chalk.blue('--------------------------------------------------'));
    
    backups.forEach((backup, index) => {
      // Determine the format for display
      const format = backup.filename.endsWith('.zip') ? 'ZIP' : 'TAR.XZ';
      
      console.log(
        `${chalk.green(index + 1)}. ${backup.filename}\n` +
        `   Created: ${formatDate(backup.created)}\n` +
        `   Size: ${formatBytes(backup.size)}\n` +
        `   Format: ${format}\n`
      );
    });
  } catch (error) {
    console.error(chalk.red('Failed to list backups:'), error);
  }
}

// Restore a backup
async function restore() {
  try {
    const backups = await listBackups();
    
    if (backups.length === 0) {
      console.log(chalk.yellow('No backups found.'));
      return;
    }
    
    const choices = backups.map((backup, index) => ({
      name: `${backup.filename} (${formatDate(backup.created)})`,
      value: backup.path
    }));
    
    const { backupPath } = await inquirer.prompt([
      {
        type: 'list',
        name: 'backupPath',
        message: 'Select a backup to restore:',
        choices
      }
    ]);
    
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: chalk.yellow('WARNING: This will overwrite the current state. Continue?'),
        default: false
      }
    ]);
    
    if (!confirm) {
      console.log(chalk.yellow('Restore cancelled.'));
      return;
    }
    
    console.log(chalk.blue('Restoring backup...'));
    await restoreBackup(backupPath);
    console.log(chalk.green('✓ Backup restored successfully!'));
  } catch (error) {
    console.error(chalk.red('Restore failed:'), error);
  }
}

// Delete a backup
async function remove() {
  try {
    const backups = await listBackups();
    
    if (backups.length === 0) {
      console.log(chalk.yellow('No backups found.'));
      return;
    }
    
    const choices = backups.map((backup, index) => ({
      name: `${backup.filename} (${formatDate(backup.created)})`,
      value: backup.path
    }));
    
    const { backupPath } = await inquirer.prompt([
      {
        type: 'list',
        name: 'backupPath',
        message: 'Select a backup to delete:',
        choices
      }
    ]);
    
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: chalk.yellow('Are you sure you want to delete this backup?'),
        default: false
      }
    ]);
    
    if (!confirm) {
      console.log(chalk.yellow('Delete cancelled.'));
      return;
    }
    
    await deleteBackup(backupPath);
    console.log(chalk.green('✓ Backup deleted successfully!'));
  } catch (error) {
    console.error(chalk.red('Delete failed:'), error);
  }
}

// Set up CLI commands
program
  .name('photo-gallery-backup')
  .description('Backup and restore utility for Photo Gallery')
  .version('1.0.0');

program
  .command('create')
  .description('Create a new backup')
  .action(backup);

program
  .command('list')
  .description('List all available backups')
  .action(list);

program
  .command('restore')
  .description('Restore from a backup')
  .action(restore);

program
  .command('delete')
  .description('Delete a backup')
  .action(remove);

program.parse(process.argv);