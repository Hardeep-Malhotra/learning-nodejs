const net = require('node:net');

// Create a TCP server
const server = net.createServer((socket) => {
  console.log('--- New Client Connected ---');

  // 1. READABLE side of the Duplex Stream:
  // Listen for data coming FROM the client
  socket.on('data', (data) => {
    console.log('\nClient says:', data.toString().trim());
    process.stdout.write('Your Reply: '); // Show prompt after receiving message
  });

  // 2. WRITABLE side of the Duplex Stream:
  // We pipe our terminal input (stdin) DIRECTLY into the socket
  // Whatever you type in this terminal will be sent to the client
  process.stdout.write('Your Reply: ');
  process.stdin.pipe(socket);

  // Handle client disconnection
  socket.on('end', () => {
    console.log('\n--- Client Disconnected ---');
  });

  // Error handling to prevent server crash
  socket.on('error', (err) => {
    console.log('Socket Error:', err.message);
  });
});

// Start listening on Port 3000
server.listen(3000, () => {
  console.log('Server is listening on port 3000...');
});