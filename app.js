const http = require('http');
const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const bodyparser = require('body-parser');
const api = require('./api');

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use('/api', api);
app.use('/test', express.static('./test/dist'));

const server = http.createServer(app);
global.io = socket(server);

server.listen(80);
