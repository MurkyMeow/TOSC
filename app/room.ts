import { ErrorRequestHandler, Router } from 'express';
import * as st from 'simple-runtypes';

import { LetterColor } from '../src/js/tosc';
import { Room } from '../src/js/types';

const rooms: Record<string, Room> = {};

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
    users: {},
  };

  rooms[id] = room;

  res.json({ token, room });
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

  res.json({ room });
});

const letter = st.record({
  color: st.enum(LetterColor),
  extra: st.boolean(),
});

const user = st.record({
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

  if (!token) {
    const newToken = Math.random().toString(36).slice(2);

    room.users[newToken] = user;

    return res.json({ token: newToken, room });
  }

  if (!room.users[token]) {
    return res.status(400).json({ message: 'Invalid token' });
  }

  room.users[token] = user;

  res.json({ token, room });
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
