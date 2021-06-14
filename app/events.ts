import { Person } from '../src/js/types';

export const INIT = 'init';
export const CLOSE = 'close';

export const JOIN_ROOM = 'join_room';
export const LEFT_ROOM = 'left_room';

export const ADD_ROOM = 'add_room';
export const DELETE_ROOM = 'delete_room';
export const ROOM_GONE = 'room_gone';

export const ADD_USER = 'add_user';
export const DEL_USER = 'del_user';
export const UPDATE_USER = 'update_user';

export interface Init {
  type: 'init';
  data: Person[];
}
export interface JoinRoom {
  type: 'join_room';
  data: { room_id: string; user: Person };
}
export interface LeftRoom {
  type: 'left_room';
  data: { user_id: string };
}
export interface AddRoom {
  type: 'add_room';
  data: { room_id: string };
}
export interface DeleteRoom {
  type: 'delete_room';
  data: { room_id: string };
}
export interface UpdateUser {
  type: 'update_user';
  data: { user: Person };
}
export interface Close {
  type: 'close';
}

export type APIEvent = Init | JoinRoom | LeftRoom | AddRoom | DeleteRoom | UpdateUser | Close;
