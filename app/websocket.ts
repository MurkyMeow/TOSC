import { Router } from 'express';
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
  users: Record<string, Person>;
}

const rooms: Record<string, Room> = {};

const router = Router();

router.post('/create', (req, res) => {
  const room_id = Math.random().toString(36).slice(2);

  rooms[room_id] = {
    users: {},
  };

  res.json({ room_id });
});

router.get('/info/:id', (req, res) => {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).end('Invalid room id');
  }

  const room = rooms[id];

  res.json(room);
});

router.post('/join/:id', (req, res) => {
  const { id } = req.query;
  const { user } = req.body;

  if (!id || typeof id !== 'string') {
    return res.status(400).end('Invalid room id');
  }

  if (!user) {
    return res.status(400).end('User not provided');
  }

  const room = rooms[id];

  if (!room) {
    return res.status(400).end('Room not found');
  }

  const token = Math.random().toString(36).slice(2);

  room.users[token] = user;

  res.json({ token });
});

router.post('/leave/:id', (req, res) => {
  const { id } = req.query;
  const { token } = req.body;

  if (!id || typeof id !== 'string') {
    return res.status(400).end('Invalid room id');
  }

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

router.post('/delete/:id', (req, res) => {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).end('Invalid room id');
  }

  const room = rooms[id];

  if (!room) {
    return res.status(400).end('Room not found');
  }

  delete rooms[id];

  res.json({ ok: true });
});

export default router;
