const WebSocket = require('ws');

const example = require('../src/js/example');

const users = [...example];

export function startWebSocket(options) {
    const wss = new WebSocket.Server(options);

    wss.on('connection', (ws) => {
        ws.on('message', (message) => {
            try {
                const data = JSON.parse(message);

                if (data.type === 'join') {
                    const user = data.payload;
                    users.push(user);
                    const update = JSON.stringify({ type: 'update', payload: users });
                    wss.clients.forEach((client) => client.send(update));
                }
            } catch (_) {
                const error = JSON.stringify({ type: 'error', payload: 'Could not parse the message' });
                ws.send(error);
            }
        });
    });
}
