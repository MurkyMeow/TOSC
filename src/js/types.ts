import { TOSC } from './tosc';

export interface Person {
  id: string;
  avatar: string;
  name: string;
  pronoun: string;
  tosc: TOSC;
}

export interface Room {
  id: string;
  name: string;
  users: Person[];
}
