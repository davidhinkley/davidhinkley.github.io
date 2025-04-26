# Moving the Photo Gallery Application

## Overview

This guide provides instructions for moving the Photo Gallery application to a new location or partition. The application has been designed to work in any location, but there are a few things to keep in mind when moving it.

## Moving Steps

1. **Stop the Server**: Before moving the application, make sure to stop the server to prevent any data corruption.

   ```bash
   cd /path/to/current/photo-gallery/server
   node kill-server.js
   ```

2. **Create a Backup**: It's always a good idea to create a backup before moving the application.

   ```bash
   cd /path/to/current/photo-gallery/server
   npm run backup create "pre-move-backup"
   ```

3. **Copy the Entire Directory**: Copy the entire photo-gallery directory to the new location.

   ```bash
   cp -r /path/to/current/photo-gallery /new/location/
   ```

4. **Update Scheduled Backups** (if configured): If you have scheduled backups configured, you'll need to update the crontab to point to the new location.

   ```bash
   cd /new/location/photo-gallery/server
   npm run setup-scheduled-backups
   ```

5. **Start the Server in the New Location**: Navigate to the new location and start the server.

   ```bash
   cd /new/location/photo-gallery/server
   npm start
   ```

## Important Considerations

### Paths

The application uses relative paths internally, so it should work correctly in any location. However, there are a few things to keep in mind:

- **Database**: The database file (`db.json`) is stored in the `server` directory and will be moved with the application.
- **Uploads**: All uploaded photos are stored in the `server/uploads` directory and will be moved with the application.
- **Backups**: Backups are stored in the `server/backups` directory and will be moved with the application.

### Scheduled Backups

If you have scheduled backups configured using cron, you'll need to update the crontab to point to the new location. The `setup-scheduled-backups.sh` script will do this for you.

### Client Configuration

The client is configured to automatically detect the server location, so it should work without any changes. If you're accessing the application from a different domain or IP address, you may need to update the client configuration in `client/src/utils/api.js`.

## Troubleshooting

### Server Not Starting

If the server doesn't start in the new location, check the following:

1. Make sure all dependencies are installed:

   ```bash
   cd /new/location/photo-gallery/server
   npm install
   ```

2. Check if the port is already in use. The server will automatically try the next available port if the default port (5000) is in use.

### Backups Not Working

If backups are not working in the new location, check the following:

1. Make sure the backup directory exists and is writable:

   ```bash
   mkdir -p /new/location/photo-gallery/server/backups
   chmod 755 /new/location/photo-gallery/server/backups
   ```

2. Make sure the backup script is executable:

   ```bash
   chmod +x /new/location/photo-gallery/server/backup-cli.js
   chmod +x /new/location/photo-gallery/server/scheduled-backup.js
   ```

3. If using scheduled backups, make sure the crontab is updated:

   ```bash
   cd /new/location/photo-gallery/server
   npm run setup-scheduled-backups
   ```

### Client Not Connecting to Server

If the client is not connecting to the server in the new location, check the following:

1. Make sure the server is running and accessible from the client.

2. If you're accessing the application from a different domain or IP address, you may need to update the client configuration in `client/src/utils/api.js`.

## Conclusion

The Photo Gallery application is designed to work in any location, and moving it should be straightforward. If you encounter any issues, refer to the troubleshooting section above or check the application logs for more information.