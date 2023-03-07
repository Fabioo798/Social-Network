import http from 'http';
import createDebug from 'debug';
import { dbConnect } from './db/db.connect.js';
import { app } from './app.js';

const debug = createDebug('W7CH5: index');
const PORT = process.env.port || 5000;

const server = http.createServer(app);

dbConnect()
  .then((mongoose) => {
    server.listen(PORT);
    debug('DB', mongoose.connection.db.databaseName);
  })
  .catch((error) => server.emit('error', error));

server.on('error', (error) => {
  debug('DB ', error.message);
});
server.on('listening', () => {
  debug('http:localhost:' + PORT);
});
