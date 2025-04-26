import axios from 'axios';

// Function to check if a port is available
const checkServerPort = async (port) => {
  try {
    // Try to connect to the server with a timeout
    const response = await axios.get(`http://localhost:${port}`, { 
      timeout: 1000,
      validateStatus: () => true // Accept any status code as valid
    });
    return port; // If we get any response, the port is in use by our server
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      // If connection refused, try the next port
      return checkServerPort(port + 1);
    }
    if (error.code === 'ETIMEDOUT') {
      // If timeout, try the next port
      return checkServerPort(port + 1);
    }
    // For any other error, assume the server is running on this port
    return port;
  }
};

// Determine the base URL dynamically
const getBaseUrl = () => {
  // Get the current hostname (works for localhost or any domain)
  const hostname = window.location.hostname;
  // Default port
  const defaultPort = 5000;
  
  // If we're in development (using localhost)
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `http://${hostname}:${defaultPort}`;
  }
  
  // For GitHub Pages deployment, we need to use a remote API server
  // Since GitHub Pages can only serve static content, we need to point to an external API
  if (hostname.includes('github.io')) {
    // Replace this URL with your actual API server URL when deploying
    // For demo purposes on GitHub Pages, we'll use a mock API or disable backend features
    console.log('GitHub Pages detected - API calls will be mocked or disabled');
    return 'https://mock-api-server.example.com'; // Replace with your actual API server if available
  }
  
  // In production, use the same origin (hostname) with the API on the same domain
  // This works when the client is served by the same server or through a reverse proxy
  return window.location.origin;
};

// Set initial base URL
axios.defaults.baseURL = getBaseUrl();

// Try to detect the correct server port (only in development)
(async () => {
  try {
    // Only run port detection in development environment
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      const port = await checkServerPort(5000);
      if (port !== 5000) {
        console.log(`Server detected on port ${port}, updating API base URL`);
        axios.defaults.baseURL = `http://${window.location.hostname}:${port}`;
      }
    }
  } catch (error) {
    console.error('Error detecting server port:', error);
  }
})();

export default axios;