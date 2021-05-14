const { User } = require('./user.js');
const WebSocket = require('ws');

//////////////////////////////////////////////////////////////////////
const rooms = new Map(); //room_id --> { room, [ users ] };

//saves avatar on disk and returns link to it
const saveAvatar = async (user) => {
    console.log(user);
    //if (!user.avatar || !user.avatar.startsWith("blob:"))
    //return avatar;

    //const link = `/img/users/avatar_id${id}`;

    //return link;
    return undefined;
};

const startWebSocket = (options) => {
    const wss = new WebSocket.Server(options);

    wss.on('connection', (ws) => {
        console.log('got connection');
        ws.say = (type, data) => ws.send(JSON.stringify({ type, data }));

        ws.on('message', async (message) => {
            const { type, data } = JSON.parse(message);
            console.log(`Got event ${type}`);

            switch (type) {
                case 'join_room': //data.user = { name, pro, avatar, id }
                    joinUser(ws, data);
                    break;
                case 'left_room': //data.user_id
                    leftUser(data);
                    break;
                case 'update_user': //data.user = { name, pro, avatar, id }
                    updateUser(ws, data);
                    break;
                case 'add_room': //room - user { !pro, !name, !avatar, id }
                    addRoom(ws, data);
                    break;
                case 'delete_room': //data.room_id
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
        ws.say('init', roomUsers);
        roomUsers.forEach((roomUser) => roomUser.say('add_user', user));
        room.say('add_user', user);
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
            room.users.forEach((old) => old.say('del_user', user_id));
            room.say('del_user', user_id);
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
        room.users.forEach((old) => old.say('upd_user', user));
        room.say('upd_user', user);
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
        users.forEach((old) => old.say('room_gone', data.room_id));
    };
};

module.exports = { startWebSocket };
