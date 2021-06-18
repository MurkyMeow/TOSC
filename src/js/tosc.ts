export enum LetterColor {
  red = 'red',
  green = 'green',
  blue = 'blue',
}

export interface Letter {
  color: LetterColor;
  extra: boolean;
}

export interface TOSC {
  T: Letter;
  O: Letter;
  S: Letter;
  C: Letter;
}

const letters: Record<string, Letter> = {
  R: { color: LetterColor.red, extra: true },
  r: { color: LetterColor.red, extra: false },
  G: { color: LetterColor.green, extra: true },
  g: { color: LetterColor.green, extra: false },
  B: { color: LetterColor.blue, extra: true },
  b: { color: LetterColor.blue, extra: false },
};

export function toscFromString(str: string): TOSC {
  return {
    T: letters[str[0]],
    O: letters[str[1]],
    S: letters[str[2]],
    C: letters[str[3]],
  };
}

export function toscMap<T>(tosc: TOSC, cb: (letter: keyof TOSC, data: Letter) => T): T[] {
  const keys = Object.keys(tosc) as (keyof TOSC)[];
  return keys.map((key) => cb(key, tosc[key]));
}
