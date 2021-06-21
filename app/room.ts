import { ErrorRequestHandler, Router } from 'express';
import * as st from 'simple-runtypes';

import { LetterColor } from '../src/js/tosc';
import { Person, Room } from '../src/js/types';

interface ServerRoom {
  id: string;
  name: string;
  token: string;
  users: Record<string, Person>;
}

function formatRoom(room: ServerRoom): Room {
  return { ...room, users: Object.values(room.users) };
}

const rooms: Record<string, ServerRoom> = {};

const router = Router();

const createBody = st.record({
  name: st.string(),
});

router.post('/room/create', (req, res) => {
  const { name } = createBody(req.body);

  const id = Math.random().toString(36).slice(2);
  const token = Math.random().toString(36).slice(2);

  const room = {
    id,
    name,
    token,
    users: {},
  };

  rooms[id] = room;

  res.json({ token, room: formatRoom(room) });
});

const roomIdParams = st.record({
  id: st.string(),
});

router.get('/room/:id/info/', (req, res) => {
  const { id } = roomIdParams(req.params);

  const room = rooms[id];

  if (!room) {
    return res.status(400).json({ message: 'Room not found' });
  }

  res.json({ room: formatRoom(room) });
});

const letter = st.record({
  color: st.enum(LetterColor),
  extra: st.boolean(),
});

const user = st.record({
  id: st.string(),
  avatar: st.string(),
  name: st.string(),
  pronoun: st.string(),
  tosc: st.record({ T: letter, O: letter, S: letter, C: letter }),
});

const joinBody = st.record({
  user,
  token: st.optional(st.string()),
});

router.post('/room/:id/join', (req, res) => {
  const { id } = roomIdParams(req.params);
  const { user, token } = joinBody(req.body);

  const room = rooms[id];

  if (!room) {
    return res.status(400).json({ message: 'Room not found' });
  }

  // give new token if the current one is not provided or invalid
  if (!token || !room.users[token]) {
    const newToken = Math.random().toString(36).slice(2);
    // also provide an id, since initially the user won't have one
    const newId = Math.random().toString(36).slice(2);

    const newUser = { ...user, id: newId };

    room.users[newToken] = newUser;

    return res.json({ user: newUser, token: newToken, room: formatRoom(room) });
  }

  room.users[token] = user;

  res.json({ user, token, room: formatRoom(room) });
});

const updateUserBody = st.record({
  user,
  token: st.string(),
});

router.post('/room/:id/update_user', (req, res) => {
  const { id } = roomIdParams(req.params);
  const { user, token } = updateUserBody(req.body);

  const room = rooms[id];

  if (!room) {
    return res.status(400).json({ message: 'Room not found' });
  }

  if (!room.users[token]) {
    return res.status(400).json({ message: 'Invalid token' });
  }

  room.users[token] = user;

  res.json({ user });
});

const removeUserBody = st.record({
  token: st.string(),
  userId: st.string(),
});

router.post('/room/:id/remove_user', (req, res) => {
  const { id } = roomIdParams(req.params);
  const { token, userId } = removeUserBody(req.body);

  const room = rooms[id];

  if (!room) {
    return res.status(400).json({ message: 'Room not found' });
  }

  if (room.token !== token) {
    return res.status(400).json({ message: 'Invalid token' });
  }

  const [userToken] = Object.entries(room.users).find(([token, user]) => user.id === userId) || [];

  if (!userToken) {
    return res.status(400).json({ message: 'User not found' });
  }

  delete room.users[userToken];

  res.json({ ok: true });
});

const leaveBody = st.record({
  token: st.string(),
});

router.post('/room/:id/leave', (req, res) => {
  const { id } = roomIdParams(req.params);
  const { token } = leaveBody(req.body);

  const room = rooms[id];

  if (!room) {
    return res.status(400).json({ message: 'Room not found' });
  }

  const user = room.users[token];

  if (!user) {
    return res.status(400).json({ message: 'Invalid token' });
  }

  delete room.users[token];

  res.json({ ok: true });
});

router.post('/room/:id/delete', (req, res) => {
  const { id } = roomIdParams(req.params);

  const room = rooms[id];

  if (!room) {
    return res.status(400).json({ message: 'Room not found' });
  }

  delete rooms[id];

  res.json({ ok: true });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof st.RuntypeError) {
    res.status(400).json({ messagee: err.message });
  } else {
    next();
  }
};

router.use(errorHandler);

export default router;
