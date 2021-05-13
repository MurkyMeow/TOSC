const http = require('http');
const express = require('express');
const path = require('path');
const WebSocket = require('ws');
const { User } = require('./user.js');

const PORT = process.env.PORT || 9080;

//////////////////////////////////////////////////////////////////////

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

//////////////////////////////////////////////////////////////////////

app.use(express.static(path.resolve(__dirname, 'public/')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/', 'index.html'));
});

//////////////////////////////////////////////////////////////////////

//saves avatar on disk and returns link to it
const saveAvatar = async (id, avatar) => {
    return 'link';
};

//////////////////////////////////////////////////////////////////////
const rooms = new Map(); //room_id --> { room, [ users ] };

wss.on('connection', (ws) => {
    ws.say = (type, data) => ws.send(JSON.stringify({ type, data }));

    ws.on('message', async (message) => {
        const data = JSON.parse(message);
        switch (type) {
            case 'join_room': //data.user = { name, pro, avatar, id }
                const user = new User(ws, data.user);
                user.avatar = await saveAvatar(data.user.id, data.user.avatar);

                const room = rooms.get(data.room_id);
                user.say('init', room.users);
                room.users.forEach(old => old.say('add_user', user));
                room.say('add_user', user);
                room.users.push(user);
                break;

            case 'left_room': //data.user_id
                const room = rooms.get(data.room_id);
                const userIndex = room.users.indexOf(data.user_id);
                if (userIndex !== -1) {
                    room.users.splice(userIndex, 1);
                    room.users.forEach(old => old.say('del_user', data.user_id));
                    room.say('del_user', data.user_id);
                }
                break;

            case 'update_user': //data.user = { name, pro, avatar, id }
                const user = new User(ws, data.user);
                user.avatar = await saveAvatar(data.user.id, data.user.avatar);

                const room = rooms.get(data.room_id);
                const userIndex = room.users.indexOf(data.user.id);

                if (userIndex !== -1) {
                    const user = new User(ws, data.user);
                    user.avatar = await saveAvatar(data.user.id, data.user.avatar);

                    room.users[userIndex] = user;
                    users.forEach(old => old.say('upd_user', user));
                    room.say('upd_user', user);
                }
                break;

            case 'add_room': //room - user { !pro, !name, !avatar, id }
                const room = new User(ws, { id: data.room_id });
                rooms.set(data.room_id, { room, users: new Array() });
                break;

            case 'delete_room': //data.room_id
                rooms.delete(data.room_id); //FIXME
                break;
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
