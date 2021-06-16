import { TOSC } from './tosc';

export interface Person {
  avatar: string;
  name: string;
  pronoun: string;
  tosc: TOSC;
}

export interface Room {
  users: Record<string, Person>;
}
