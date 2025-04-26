const { exec } = require('child_process');

// Find and kill processes using port 5000
console.log('Looking for processes using port 5000...');

exec('lsof -i :5000 -t', (error, stdout, stderr) => {
  if (error) {
    if (error.code === 1) {
      console.log('No processes found using port 5000.');
      return;
    }
    console.error(`Error finding processes: ${error.message}`);
    return;
  }
  
  if (stderr) {
    console.error(`Error: ${stderr}`);
    return;
  }
  
  const pids = stdout.trim().split('\n').filter(Boolean);
  
  if (pids.length === 0) {
    console.log('No processes found using port 5000.');
    return;
  }
  
  console.log(`Found ${pids.length} process(es) using port 5000: ${pids.join(', ')}`);
  
  pids.forEach(pid => {
    console.log(`Killing process ${pid}...`);
    exec(`kill -9 ${pid}`, (killError, killStdout, killStderr) => {
      if (killError) {
        console.error(`Error killing process ${pid}: ${killError.message}`);
        return;
      }
      
      if (killStderr) {
        console.error(`Error killing process ${pid}: ${killStderr}`);
        return;
      }
      
      console.log(`Successfully killed process ${pid}`);
    });
  });
});