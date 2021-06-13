import WebSocket, { ServerOptions } from 'ws';
import { Person } from '../src/js/types';

import {
  INIT,
  JOIN_ROOM,
  LEFT_ROOM,
  ADD_ROOM,
  DELETE_ROOM,
  ROOM_GONE,
  ADD_USER,
  DEL_USER,
  UPDATE_USER,
  APIEvent,
  JoinRoom,
  CLOSE,
} from './events';

//////////////////////////////////////////////////////////////////////
interface Room {
  users: Map<string, Person>;
}

const rooms = new Map<string, Room>();

function sayToUser(ws: WebSocket, event: APIEvent): void {
  ws.send(JSON.stringify(event));
}

export const startWebSocket = (options: ServerOptions) => {
  const wss = new WebSocket.Server(options);

  wss.on('connection', (ws) => {
    console.log('got connection');

    ws.on('message', async (message) => {
      const event = JSON.parse(String(message)) as APIEvent;
      console.log(`Got event ${event.type}`);

      switch (event.type) {
        case JOIN_ROOM:
          joinUser(ws, event.data);
          break;
        case LEFT_ROOM:
          leftUser(event.data);
          break;
        case UPDATE_USER:
          updateUser(ws, event.data);
          break;
        case ADD_ROOM:
          addRoom(ws, event.data);
          break;
        case DELETE_ROOM:
          deleteRoom(event.data);
          break;
      }
    });

    ws.on(CLOSE, () => {
      if (ws.userData) {
        console.log(`User ${ws.userData.user_id} exited`);
        if (ws.userData.user_id) leftUser(ws.userData);
        else deleteRoom(ws.userData);
      }
    });
  });

  //////////////////////////////////////////////////////////////////////

  const joinUser = async (ws: WebSocket, data: JoinRoom['data']) => {
    const { room_id, user } = data;
    const room = rooms.get(room_id);

    if (!room) {
      console.log('Error: incorrect room id:', room_id);
      return;
    }

    ws.userData = { room_id, user_id: user.id };

    const existing = room.users.get(user.id);
    if (existing) {
      console.log('Error: already existing user trying to connect:', room_id);
      sayToUser(ws, { type: 'close' });
      room.users.delete(user.id);
    }

    const roomUsers = Array.from(room.users, ([id, roomUser]) => roomUser);
    sayToUser(ws, { type: INIT, data: roomUsers });

    if (!existing) {
      roomUsers.forEach((roomUser) => roomUser.say(ADD_USER, user));
      room.say(ADD_USER, user);
    }

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
    user.say = ws.say;

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
    const room = rooms.get(data.room_id);
    if (room) {
      const { users } = room;
      rooms.delete(data.room_id);
      users.forEach((old) => old.say(ROOM_GONE, data.room_id));
    }
  };
};
