import { TOSC } from './tosc';

function safeGet(key) {
    try {
        return localStorage.getItem(key);
    } catch (err) {
        console.error(err);
        return null;
    }
}

function safeSet(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (err) {
        console.error(err);
    }
}

const ROOM_ID_KEY = 'room_id';
const USER_DATA_KEY = 'user_data';

export function getRoomId() {
    return safeGet(ROOM_ID_KEY);
}
export function setRoomId(roomId) {
    safeSet(ROOM_ID_KEY, roomId);
}

export function getUserData() {
    const data = safeGet(USER_DATA_KEY);

    if (!data) return null;

    const user = JSON.parse(data);
    user.tosc = new TOSC(user.tosc);

    return user;
}
export function setUserData(userData) {
    safeSet(USER_DATA_KEY, JSON.stringify(userData));
}
