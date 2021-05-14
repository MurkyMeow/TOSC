const WebSocket = require('ws');

const {
    INIT,
    JOIN_ROOM,
    LEFT_ROOM,
    ADD_ROOM,
    DELETE_ROOM,
    ROOM_GONE,
    ADD_USER,
    DEL_USER,
    UPDATE_USER,
} = require('../events');

//////////////////////////////////////////////////////////////////////
const rooms = new Map(); //room_id --> { room, [ users ] };

const startWebSocket = (options) => {
    const wss = new WebSocket.Server(options);

    wss.on('connection', (ws) => {
        console.log('got connection');
        ws.say = (type, data) => ws.send(JSON.stringify({ type, data }));

        ws.on('message', async (message) => {
            const { type, data } = JSON.parse(message);
            console.log(`Got event ${type}`);

            switch (type) {
                case JOIN_ROOM: //data.user = { name, pro, avatar, id }
                    joinUser(ws, data);
                    break;
                case LEFT_ROOM: //data.user_id
                    leftUser(data);
                    break;
                case UPDATE_USER: //data.user = { name, pro, avatar, id }
                    updateUser(ws, data);
                    break;
                case ADD_ROOM: //room - user { !pro, !name, !avatar, id }
                    addRoom(ws, data);
                    break;
                case DELETE_ROOM: //data.room_id
                    deleteRoom(data);
                    break;
            }
        });

        ws.on('close', () => {
            if (ws.userData) {
                console.log(`User ${ws.userData.user_id} exited`);
                if (ws.userData.user_id) leftUser(ws.userData);
                else deleteRoom(ws.userData);
            }
        });
    });

    //////////////////////////////////////////////////////////////////////

    const joinUser = async (ws, data) => {
        const { room_id, user } = data;
        const room = rooms.get(room_id);

        if (!room) {
            console.log('Error: incorrect room id:', room_id);
            return;
        }

        ws.userData = { room_id, user_id: user.id };

        const roomUsers = Array.from(room.users, ([id, roomUser]) => roomUser);
        ws.say(INIT, roomUsers);
        roomUsers.forEach((roomUser) => roomUser.say(ADD_USER, user));
        room.say(ADD_USER, user);
        room.users.set(user.id, user);
    };

    const leftUser = (data) => {
        const { room_id, user_id } = data;
        const room = rooms.get(room_id);

        if (!room) {
            console.log('Left Error: incorrect room id:', data.room_id);
            return;
        }

        if (room.users.delete(user_id)) {
            room.users.forEach((old) => old.say(DEL_USER, user_id));
            room.say(DEL_USER, user_id);
            console.log('user deleted', user_id);
        }
    };

    const updateUser = async (ws, data) => {
        const { room_id, user } = data;
        const room = rooms.get(room_id);

        if (!room) {
            console.log('Update Error: incorrect room id:', room_id);
            return;
        }

        room.users.set(user.id, user);
        room.users.forEach((old) => old.say(UPDATE_USER, user));
        room.say(UPDATE_USER, user);
        console.log('user updated');
    };

    const addRoom = (ws, data) => {
        const room = { id: data.room_id, say: ws.say, users: new Map() };
        rooms.set(data.room_id, room);
        ws.userData = { room_id: data.room_id, user_id: undefined };
        console.log('Added room', room.id);
    };

    const deleteRoom = (data) => {
        //FIXME
        const { users } = rooms.get(data.room_id);
        rooms.delete(data.room_id);
        users.forEach((old) => old.say(ROOM_GONE, data.room_id));
    };
};

module.exports = { startWebSocket };
