const http = require('http');
const express = require('express');
const path = require('path');
const { startWebSocket } = require('./websocket');

const PORT = process.env.PORT || 9080;

const app = express();
const server = http.createServer(app);

app.use(express.static(path.resolve(__dirname, 'public/')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/', 'index.html'));
});

app.get('/room', (req, res) => {
    console.log(`someone entered the room: ${req.query.id}`);
    res.sendFile(path.resolve(__dirname, 'public/', 'index.html'));
});

startWebSocket({
    server,
    //path: '/ws',
});

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
