import { Person } from '../src/js/types';

export interface Room {
  users: Record<string, Person>;
}

const ROOM_NOT_FOUND = 'ROOM_NOT_FOUND';
const INVALID_TOKEN = 'INVALID_TOKEN';

const rooms: Record<string, Room> = {};

export function createRoom() {
  const room_id = Math.random().toString(36).slice(2);

  rooms[room_id] = {
    users: {},
  };

  return { room_id };
}

export function getRoomInfo({ query }: { query: { id: string } }) {
  const { id } = query;
  const room = rooms[id];

  if (!room) {
    return { error: ROOM_NOT_FOUND };
  }

  return room;
}

export function joinRoom({ query, body }: { query: { id: number }; body: { user: Person } }) {
  const { id } = query;
  const { user } = body;

  const room = rooms[id];

  if (!room) {
    return { error: ROOM_NOT_FOUND };
  }

  const token = Math.random().toString(36).slice(2);

  room.users[token] = user;

  return { token };
}

export function leaveRoom({ query, body }: { query: { id: string }; body: { token: string } }) {
  const { id } = query;
  const { token } = body;

  const room = rooms[id];

  if (!room) {
    return { error: ROOM_NOT_FOUND };
  }

  const user = room.users[token];

  if (!user) {
    return { error: INVALID_TOKEN };
  }

  delete room.users[token];

  return { ok: true };
}

export function deleteRoom({ query }: { query: { id: string } }) {
  const { id } = query;
  const room = rooms[id];

  if (!room) {
    return { error: ROOM_NOT_FOUND };
  }

  delete rooms[id];

  return { ok: true };
}
