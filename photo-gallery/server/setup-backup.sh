#!/bin/bash

# Make backup-cli.js executable
chmod +x backup-cli.js

# Create backups directory if it doesn't exist
mkdir -p backups

echo "Backup system setup complete!"
echo "You can now use 'npm run backup' to manage backups."