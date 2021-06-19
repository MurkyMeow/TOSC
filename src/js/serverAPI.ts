import { Person } from './types';

function req<T>(input: RequestInfo, method: string, body?: unknown): Promise<T> {
  const init = {
    method,
    ...(body
      ? {
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        }
      : {}),
  };

  return fetch(input, init).then((res) =>
    res.ok ? res.json() : res.text().then((text) => Promise.reject(text))
  );
}

export interface CreateRoomResponse {
  roomId: string;
}

export function createRoom(): Promise<CreateRoomResponse> {
  return req('/room/create', 'POST');
}

export interface GetRoomInfoParams {
  roomId: string;
}
export interface GetRoomInfoResponse {
  users: Person[];
}

export function getRoomInfo({ roomId }: GetRoomInfoParams): Promise<GetRoomInfoResponse> {
  return req(`/room/${roomId}/info`, 'GET');
}

export interface JoinRoomParams {
  roomId: string;
  user: Person;
}
export interface JoinRoomResponse {
  token: string;
}

export function joinRoom({ roomId, user }: JoinRoomParams): Promise<JoinRoomResponse> {
  return req(`/room/${roomId}/join`, 'POST', { user });
}

export interface LeaveRoomParams {
  roomId: string;
  token: string;
}
export interface LeaveRoomResponse {
  ok: true;
}

export function leaveRoom({ roomId, token }: LeaveRoomParams): Promise<LeaveRoomResponse> {
  return req(`/room/${roomId}/leave`, 'POST', { token });
}

export interface DeleteRoomParams {
  roomId: string;
}
export interface DeleteRoomResponse {
  ok: true;
}

export function deleteRoom({ roomId }: DeleteRoomParams): Promise<DeleteRoomResponse> {
  return req(`/room/${roomId}/delete`, 'POST');
}

export interface UpdateUserParams {
  roomId: string;
  token: string;
  user: Person;
}
export interface UpdateUserResponse {
  user: Person;
}

export function updateUser({ roomId, token, user }: UpdateUserParams): Promise<UpdateUserResponse> {
  return req(`/room/${roomId}/update_user`, 'POST', { token, user });
}
