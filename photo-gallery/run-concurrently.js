#!/usr/bin/env node

// This is a wrapper script for concurrently that uses our fixed spawn-command

// Save the original require function
const originalRequire = require;

// Override require to intercept spawn-command
require = function(moduleName) {
  if (moduleName === 'spawn-command') {
    return originalRequire('./spawn-command-fixed');
  }
  return originalRequire(moduleName);
};

// Run concurrently
require('concurrently/dist/bin/concurrently');