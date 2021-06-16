import { Person, Room } from './types';

export interface CreateRoomResponse {
  room_id: string;
}

export function createRoom(): Promise<CreateRoomResponse> {
  return fetch('/room/create', { method: 'POST' }).then((res) => res.json());
}

export interface GetRoomInfoParams {
  roomId: string;
}
export interface GetRoomInfoResponse {
  room: Room;
}

export function getRoomInfo({ roomId }: GetRoomInfoParams): Promise<GetRoomInfoResponse> {
  return fetch(`/room/${roomId}/info`).then((r) => r.json());
}

export interface JoinRoomParams {
  roomId: string;
  user: Person;
}
export interface JoinRoomResponse {
  token: string;
}

export function joinRoom({ roomId, user }: JoinRoomParams): Promise<JoinRoomResponse> {
  return fetch(`/room/${roomId}/join`, {
    method: 'POST',
    body: JSON.stringify(user),
  }).then((r) => r.json());
}

export interface LeaveRoomParams {
  roomId: string;
  token: string;
}
export interface LeaveRoomResponse {
  ok: true;
}

export function leaveRoom({ roomId, token }: LeaveRoomParams): Promise<LeaveRoomResponse> {
  return fetch(`/room/${roomId}/leave`, {
    method: 'POST',
    body: JSON.stringify({ token }),
  }).then((r) => r.json());
}

export interface DeleteRoomParams {
  roomId: string;
}
export interface DeleteRoomResponse {
  ok: true;
}

export function deleteRoom({ roomId }: DeleteRoomParams): Promise<DeleteRoomResponse> {
  return fetch(`/room/${roomId}/delete`, {
    method: 'POST',
  }).then((r) => r.json());
}
