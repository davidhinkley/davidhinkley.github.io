#!/usr/bin/env node

// Simple script to start the application with warnings suppressed
process.env.NODE_NO_WARNINGS = 1;

// Run the concurrently package directly
require('concurrently')(["npm run server", "npm run client"], {
  prefix: 'name',
  killOthers: ['failure', 'success'],
  restartTries: 3,
  restartDelay: 1000
});