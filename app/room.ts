import { Router } from 'express';
import * as st from 'simple-runtypes';

import { LetterColor } from '../src/js/tosc';
import { Person } from '../src/js/types';

export interface Room {
  users: Record<string, Person>;
}

const rooms: Record<string, Room> = {};

const router = Router();

router.post('/room/create', (req, res) => {
  const room_id = Math.random().toString(36).slice(2);

  rooms[room_id] = {
    users: {},
  };

  res.json({ room_id });
});

const roomIdQuery = st.record({
  id: st.string(),
});

router.get('/room/:id/info/', (req, res) => {
  const { id } = roomIdQuery(req.query);

  const room = rooms[id];
  const users = Object.values(room.users);

  res.json({ users });
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
});

router.post('/room/:id/join', (req, res) => {
  const { id } = roomIdQuery(req.query);
  const { user } = joinBody(req.body);

  const room = rooms[id];

  if (!room) {
    return res.status(400).end('Room not found');
  }

  const token = Math.random().toString(36).slice(2);

  room.users[token] = user;

  res.json({ token });
});

const updateUserBody = st.record({
  user,
  token: st.string(),
});

router.post('/room/:id/update_user', (req, res) => {
  const { id } = roomIdQuery(req.query);
  const { user, token } = updateUserBody(req.body);

  const room = rooms[id];

  if (!room) {
    return res.status(400).end('Room not found');
  }

  if (!room.users[token]) {
    return res.status(400).end('Invalid token');
  }

  room.users[token] = user;

  res.json({ user });
});

const leaveBody = st.record({
  token: st.string(),
});

router.post('/room/:id/leave', (req, res) => {
  const { id } = roomIdQuery(req.query);
  const { token } = leaveBody(req.body);

  const room = rooms[id];

  if (!room) {
    return res.status(400).end('Room not found');
  }

  const user = room.users[token];

  if (!user) {
    return res.status(400).end('Invalid token');
  }

  delete room.users[token];

  res.json({ ok: true });
});

router.post('/room/:id/delete', (req, res) => {
  const { id } = roomIdQuery(req.query);

  const room = rooms[id];

  if (!room) {
    return res.status(400).end('Room not found');
  }

  delete rooms[id];

  res.json({ ok: true });
});

export default router;
