'use strict';

const Net = require('net');
const Uuid = require('node-uuid');

const Sockets = {};
let numConnections = 0;

const Server = Net.createServer((clientSocket) => {
	numConnections += 1;
  if(numConnections >= 3) {
    console.log('Closing client. No more new connections allowed');
    return clientSocket.destroy();
  }

  clientSocket.id = Uuid.v4();
  Sockets[clientSocket.id] = clientSocket;

  clientSocket.on('data', (chunks) => {
    //console.log(`Data received : ${chunks}`);
    //this chunks need to relay, when number of connection is 2
    if(numConnections == 2) {
      let s1 = clientSocket.id;
      let s2 = null;
      for (let key in Sockets) {
        if(s1 !== key) {
          s2 = key;
          break;
        }
      }

      Sockets[s2].write(chunks);
    }
  });

  clientSocket.on('close', () => {
    numConnections -= 1;
    delete Sockets[clientSocket.id];
  });
});

Server.listen(1337, '127.0.0.1', () => {
  console.log('Server is listening on port 1337');
});

process.on('uncaughtException', (err) => {
  console.error(err.stack);
  console.log('Node NOT Exiting...');
});
