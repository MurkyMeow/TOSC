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
        if (!rooms.has(data.room_id)) {
            console.log('Error: incorrect room id:', data.room_id);
            return;
        }

        const newAvatar = await saveAvatar(data.user);
        const user = new User(ws, data.user);

        if (newAvatar) user.setAvatar(newAvatar);

        ws.userData = { room_id: data.room_id, user_id: data.user.id };

        const room = rooms.get(data.room_id);
        user.say(
            'init',
            Array.from(room.users, ([name, value]) => value)
        );
        room.users.forEach((old) => old.say('add_user', user));
        room.say('add_user', user);
        room.users.set(user.id, user);
    };

    const leftUser = (data) => {
        if (!rooms.has(data.room_id)) {
            console.log('Left Error: incorrect room id:', data.room_id);
            return;
        }

        const room = rooms.get(data.room_id);
        if (room.users.delete(data.user_id)) {
            room.users.forEach((old) => old.say('del_user', data.user_id));
            room.say('del_user', data.user_id);
            console.log('user deleted', data.user_id);
        }
    };

    const updateUser = async (ws, data) => {
        if (!rooms.has(data.room_id)) {
            console.log('Update Error: incorrect room id:', data.room_id);
            return;
        }

        const room = rooms.get(data.room_id);
        const newAvatar = await saveAvatar(data.user);
        const user = new User(ws, data.user);

        if (newAvatar) user.setAvatar(newAvatar);

        room.users.set(data.user.id, user);
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
