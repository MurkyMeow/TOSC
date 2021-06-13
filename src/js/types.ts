import { TOSC } from './tosc';

export type Tosc = TOSC;

export interface Person {
  id: string;
  avatar: string;
  name: string;
  pronoun: string;
  tosc: Tosc;
}
