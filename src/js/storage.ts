import { Person } from './types';

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch (err) {
    console.error(err);
    return null;
  }
}

function safeSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    console.error(err);
  }
}

const ROOM_ID_KEY = 'room_id';
const USER_DATA_KEY = 'user_data';
const ROOM_TOKEN_KEY = 'room_token';

export function getRoomId() {
  return safeGet(ROOM_ID_KEY);
}
export function setRoomId(roomId: string) {
  safeSet(ROOM_ID_KEY, roomId);
}

export function getUserData(): Person | null {
  const data = safeGet(USER_DATA_KEY);

  if (!data) return null;

  const user = JSON.parse(data);

  return user;
}
export function setUserData(userData: Person) {
  safeSet(USER_DATA_KEY, JSON.stringify(userData));
}

export function setRoomToken(token: string) {
  safeSet(ROOM_TOKEN_KEY, token);
}
