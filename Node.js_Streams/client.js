const net = require('node:net');

// Connect to the server running on localhost:3000
const client = net.createConnection({ port: 3000 }, () => {
  console.log('✅ Connected to Server!');
  
  // WRITING to the stream: Send an initial message
  client.write('Hello from Hardeep!');
});

// READING from the stream: Listen for any data the server sends back
client.on('data', (data) => {
  console.log('\nServer replied:', data.toString().trim());
});

// Handle when the server closes the connection
client.on('end', () => {
  console.log('❌ Disconnected from server');
});

// Error handling (e.g., if the server is not running)
client.on('error', (err) => {
  console.error('Connection Error:', err.message);
});