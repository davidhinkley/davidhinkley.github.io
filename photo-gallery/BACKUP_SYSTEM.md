# Photo Gallery Backup System

This document explains how to use the backup and restore system for the Photo Gallery application.

## Overview

The backup system allows you to:
- Create snapshots of the current application state
- List all available backups
- Restore the application to a previous state
- Delete old backups
- Schedule automatic backups
- Manage backups through a web interface (admin only)

The system backs up both the database (users and photos) and the uploaded image files.

## Prerequisites

Before using the backup system, make sure you have installed the required dependencies:

```bash
cd server
npm run install-backup-deps
```

Also, ensure that you have the sample images in your uploads directory:

```bash
cd server
npm run add-sample-images
```

**Important**: You should stop the server before running backup operations and restart it afterward.

## Making the Backup Script Executable

To make the backup script executable, run:

```bash
cd server
chmod +x backup-cli.js
```

## Using the Backup System

### Creating a Backup

To create a new backup:

```bash
cd server
npm run backup create
```

You'll be prompted to enter an optional name for the backup. The backup will be stored in the `server/backups` directory with a timestamp and the name you provided.

### Listing Available Backups

To see all available backups:

```bash
cd server
npm run backup list
```

This will display a list of all backups with their creation dates and sizes.

### Restoring from a Backup

To restore the application to a previous state:

```bash
cd server
npm run backup restore
```

You'll be shown a list of available backups to choose from. Select the backup you want to restore, and confirm the action. This will replace the current database state and uploaded files with those from the backup.

**Warning**: Restoring from a backup will overwrite the current state of the application. Any changes made since the backup was created will be lost.

### Deleting a Backup

To delete a backup:

```bash
cd server
npm run backup delete
```

You'll be shown a list of available backups to choose from. Select the backup you want to delete, and confirm the action.

## How It Works

The backup system works by:

1. Saving the in-memory database state to a JSON file
2. Creating a compressed TAR archive (tar.xz) containing:
   - The database JSON file
   - All uploaded images from the `uploads` directory
3. Storing the TAR.XZ archive in the `backups` directory with a timestamp

When restoring, the system:
1. Extracts the archive (ZIP or TAR.XZ) to a temporary directory
2. Loads the database state from the JSON file
3. Copies the uploaded images back to the `uploads` directory

## Automatic State Saving

The application automatically saves the database state to a file (`db.json`) whenever changes are made, such as:
- Registering a new user
- Uploading a new photo
- Updating a photo
- Deleting a photo
- Liking a photo

This ensures that the database state is always up-to-date for backup purposes.

## Scheduled Backups

The system can automatically create backups on a schedule. To set up scheduled backups:

```bash
cd server
npm run setup-scheduled-backups
```

This will configure a daily backup at 2 AM using cron. The system will automatically keep only the 10 most recent scheduled backups to manage disk space.

To run a scheduled backup manually:

```bash
cd server
npm run run-scheduled-backup
```

## Web Interface

Administrators can manage backups through the web interface. To access the backup management interface, log in as an admin user and navigate to the backup management page.

The web interface allows you to:
- Create new backups
- View all available backups
- Restore from a backup
- Delete backups
- View backup system logs

## Backup File Location

Backups are stored in the `server/backups` directory. Each backup is a compressed TAR file (.tar.xz) with a timestamp and optional name.

## Backup Rotation

To prevent the backups from consuming too much disk space, the scheduled backup system automatically implements a rotation policy:

- Only the 10 most recent scheduled backups are kept
- Older scheduled backups are automatically deleted
- Manual backups are not affected by the rotation policy

You can adjust the number of backups to keep by editing the `maxBackups` value in `server/scheduled-backup.js`.

## Troubleshooting

If you encounter any issues with the backup system:

1. Make sure you have the required dependencies installed
2. Check that the `backups` directory exists and is writable
3. Verify that the `uploads` directory exists and contains the expected files
4. Check the server logs for any error messages
5. Review the backup logs in `server/backup-logs.txt`

If problems persist, you can manually restore from a backup by extracting the ZIP file and copying the files to the appropriate locations.