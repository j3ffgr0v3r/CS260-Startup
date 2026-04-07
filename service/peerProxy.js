const { WebSocketServer } = require('ws');
const DB = require('./database.js');

const connections = new Map();

const authCookieName = 'authToken';

function parseCookies(cookieHeader) {
  const cookies = {};

  if (!cookieHeader) {
    return cookies;
  }

  for (const pair of cookieHeader.split(';')) {
    const [name, value] = pair.trim().split('=');
    cookies[name] = value;
  }

  return cookies;
}

function addConnection(username, socket) {
  let userSockets = connections.get(username);

  if (!userSockets) {
    userSockets = new Set();
    connections.set(username, userSockets);
  }

  userSockets.add(socket);
}

function removeConnection(username, socket) {
  const userSockets = connections.get(username);
  if (!userSockets) {
    return;
  }

  userSockets.delete(socket);

  if (userSockets.size === 0) {
    connections.delete(username);
  }
}

class PeerProxy {
  constructor(httpServer) {
    // Create a websocket object
    this.socketServer = new WebSocketServer({ server: httpServer });

    this.socketServer.on('connection', async (socket, req) => {
      socket.isAlive = true;
      const cookies = parseCookies(req.headers.cookie);
      const authToken = cookies[authCookieName];
      const user = await DB.findUser('authToken', authToken);

      if (!user) {
        socket.close();
        return;
      }

      socket.username = user.username;
      addConnection(user.username, socket);

      // Respond to pong messages by marking the connection alive
      socket.on('pong', () => {
        socket.isAlive = true;
      });

      // Remove socket from directory on close
      socket.on('close', () => {
        removeConnection(socket.username, socket);
      });
    });

    // Periodically send out a ping message to make sure clients are alive
    setInterval(() => {
      this.socketServer.clients.forEach(function each(client) {
        if (client.isAlive === false) {
          removeConnection(client.username, client);
          return client.terminate();
        }

        client.isAlive = false;
        client.ping();
      });
    }, 10000);
  }

  sendToUser(username, payload) {
    const userSockets = connections.get(username);
    if (!userSockets) {
      return false;
    }

    const message = JSON.stringify(payload);

    for (const socket of userSockets) {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(message);
      }
    }

    return true;
  }

}

module.exports = {
  PeerProxy
};
