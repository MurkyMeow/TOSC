const http = require('http');
const express = require('express');
const path = require('path');

const { startWebSocket } = require('./websocket');

const PORT = process.env.PORT || 9080;
const app = express();
app.use(express.static(path.resolve(__dirname, 'public/')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/', 'index.html'));
});

startWebSocket({
    server: http.createServer(app),
    path: '/ws',
});

app.listen(PORT, () => {
    console.log('Starting server on port', PORT);
});
