#!/bin/bash

echo "Setting up the complete Photo Gallery backup system..."

# Step 1: Install dependencies
echo "\nStep 1: Installing backup system dependencies..."
bash install-backup-deps.sh

# Step 2: Set up basic backup system
echo "\nStep 2: Setting up basic backup system..."
bash setup-backup.sh

# Step 3: Set up scheduled backups
echo "\nStep 3: Setting up scheduled backups..."
bash setup-scheduled-backups.sh

# Step 4: Create initial backup
echo "\nStep 4: Creating initial backup..."
node backup-cli.js create initial-backup

echo "\n✅ Backup system setup complete!"
echo "You can now use the following commands to manage backups:"
echo "  - npm run backup create    # Create a new backup"
echo "  - npm run backup list      # List all backups"
echo "  - npm run backup restore   # Restore from a backup"
echo "  - npm run backup delete    # Delete a backup"
echo "\nScheduled backups will run daily at 2 AM."
echo "Administrators can also manage backups through the web interface."
echo "\nFor more information, see the BACKUP_SYSTEM.md file."