import http from 'http';
import Debug from 'debug';

import app from './app';

const debug = Debug('user-api:server');

function normalizePort(val: string): string | number | boolean {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error: NodeJS.ErrnoException, normalizedPort: number | string | boolean): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof normalizedPort === 'string' ? `Pipe ${normalizedPort}` : `Port ${normalizedPort}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      window.console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      window.console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(httpServer: http.Server): void {
  const addr = httpServer.address();
  const bind = typeof addr === 'string' || addr == null ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

const server = http.createServer(app);
const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

server.listen(port);
server.on('error', error => {
  onError(error, port);
});
server.on('listening', () => {
  onListening(server);
});
