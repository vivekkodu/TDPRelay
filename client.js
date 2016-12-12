'use strict';

const Net = require('net');

const Client = new Net.Socket();

Client.connect(1337, '127.0.0.1', () => {
	console.log('Connected');
  const Stdin = process.openStdin();
  Stdin.on('data', (chunk) => {
    Client.write(chunk);
  });
});

Client.on('data', (data) => {
	console.log('Received: ' + data);
	//Client.destroy(); // kill client after server's response
});

Client.on('close', () => {
	console.log('Connection closed');
});
