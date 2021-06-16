import { Router } from 'express';
import * as st from 'simple-runtypes';

import { LetterColor } from '../src/js/tosc';
import { Room } from '../src/js/types';

const rooms: Record<string, Room> = {};

const router = Router();

router.post('/room/create', (req, res) => {
  const room_id = Math.random().toString(36).slice(2);

  rooms[room_id] = {
    users: {},
  };

  res.json({ room_id });
});

const infoQuery = st.record({
  id: st.string(),
});

router.get('/room/:id/info/', (req, res) => {
  const { id } = infoQuery(req.query);

  const room = rooms[id];

  res.json({ room });
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

const joinQuery = st.record({
  id: st.string(),
});

const joinBody = st.record({
  user,
});

router.post('/room/:id/join', (req, res) => {
  const { id } = joinQuery(req.query);
  const { user } = joinBody(req.body);

  const room = rooms[id];

  if (!room) {
    return res.status(400).end('Room not found');
  }

  const token = Math.random().toString(36).slice(2);

  room.users[token] = user;

  res.json({ token });
});

const leaveQuery = st.record({
  id: st.string(),
});
const leaveBody = st.record({
  token: st.string(),
});

router.post('/room/:id/leave', (req, res) => {
  const { id } = leaveQuery(req.query);
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

const deleteQuery = st.record({
  id: st.string(),
});

router.post('/room/:id/delete', (req, res) => {
  const { id } = deleteQuery(req.query);

  const room = rooms[id];

  if (!room) {
    return res.status(400).end('Room not found');
  }

  delete rooms[id];

  res.json({ ok: true });
});

export default router;
