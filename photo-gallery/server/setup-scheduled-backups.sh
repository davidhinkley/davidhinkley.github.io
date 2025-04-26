#!/bin/bash

# Make the scheduled backup script executable
chmod +x scheduled-backup.js

# Check if crontab is available
if ! command -v crontab &> /dev/null; then
    echo "Error: crontab is not installed. Please install cron to use scheduled backups."
    exit 1
fi

# Get the absolute path to the scheduled-backup.js script
SCRIPT_PATH="$(cd "$(dirname "$0")" && pwd)/scheduled-backup.js"

# Create a temporary file for the new crontab
TEMP_CRON=$(mktemp)

# Export the current crontab
crontab -l > "$TEMP_CRON" 2>/dev/null || echo "" > "$TEMP_CRON"

# Check if the backup job is already in the crontab
if grep -q "scheduled-backup.js" "$TEMP_CRON"; then
    echo "Scheduled backup is already set up."
    rm "$TEMP_CRON"
    exit 0
fi

# Add the daily backup job (runs at 2 AM)
echo "# Photo Gallery scheduled backup - runs daily at 2 AM" >> "$TEMP_CRON"
echo "0 2 * * * cd $(dirname "$SCRIPT_PATH") && NODE_PATH=$(dirname "$SCRIPT_PATH") $SCRIPT_PATH >> $(dirname "$SCRIPT_PATH")/backup-cron.log 2>&1" >> "$TEMP_CRON"

# Install the new crontab
crontab "$TEMP_CRON"

# Clean up
rm "$TEMP_CRON"

echo "Scheduled backup has been set up to run daily at 2 AM."
echo "Logs will be written to backup-logs.txt and backup-cron.log in the server directory."