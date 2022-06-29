const { startServer } = require('./src/server.js');
const { app } = require('./src/app.js');

startServer(4444, app());
