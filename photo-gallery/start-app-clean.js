#!/usr/bin/env node

// Simple script to start the application with warnings suppressed (clean start)
process.env.NODE_NO_WARNINGS = 1;

// First run the kill-server script
const { execSync } = require('child_process');
try {
  execSync('npm run kill-server', { stdio: 'inherit' });
} catch (error) {
  console.error('Error killing server:', error);
}

// Then run the concurrently package
require('concurrently')(["npm run server", "npm run client"], {
  prefix: 'name',
  killOthers: ['failure', 'success'],
  restartTries: 3,
  restartDelay: 1000
});