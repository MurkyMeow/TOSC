import { toscFromString } from './tosc';

export const examples = [
  {
    id: 0,
    name: 'Example 0 really long name with short pro',
    pronoun: 'xey',
    tosc: toscFromString('rGBB'),
  },
  {
    id: 1,
    name: 'Example 1 long name',
    pronoun: 'sie',
    tosc: toscFromString('rgbb'),
  },
  { id: 2, name: 'Example 2', pronoun: 'he', tosc: toscFromString('rRgg') },
  {
    id: 3,
    name: 'Example 3 really long name with long pro',
    pronoun: 'they/them/themselves',
    tosc: toscFromString('gGgG'),
  },
  { id: 4, name: 'Example 4', pronoun: '', tosc: toscFromString('rbgR') },
  {
    id: 5,
    name: 'Example 5 long name',
    pronoun: 'they/them/themselves',
    tosc: toscFromString('GrgG'),
  },
];
