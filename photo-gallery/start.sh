#!/bin/bash

# Start the application with Node.js warnings suppressed
NODE_NO_WARNINGS=1 npm run server & NODE_NO_WARNINGS=1 npm run client

# Wait for both processes
wait