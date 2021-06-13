const colors: Record<string, string> = {
  R: 'red',
  B: 'blue',
  G: 'green',
  r: 'red',
  b: 'blue',
  g: 'green',
};

export interface Letter {
  letter: string;
  color: string;
  extra: boolean;
}

export class TOSC {
  T: Letter;
  O: Letter;
  S: Letter;
  C: Letter;

  constructor(str: string) {
    this.T = { letter: 'T', color: 'blue', extra: false };
    this.O = { letter: 'O', color: 'blue', extra: false };
    this.S = { letter: 'S', color: 'blue', extra: false };
    this.C = { letter: 'C', color: 'blue', extra: false };
    this.fromJSON(str);
  }

  toJSON(): string {
    return this.map((el) => (el.extra ? el.color[0] + '+' : el.color[0])).join('');
  }

  fromJSON(str: string) {
    let i = 0;
    this.T.color = colors[str[i++]];
    if (str[i] === '+') {
      this.T.extra = true;
      i++;
    }
    this.O.color = colors[str[i++]];
    if (str[i] === '+') {
      this.O.extra = true;
      i++;
    }
    this.S.color = colors[str[i++]];
    if (str[i] === '+') {
      this.S.extra = true;
      i++;
    }
    this.C.color = colors[str[i++]];
    if (str[i] === '+') {
      this.C.extra = true;
      i++;
    }
  }

  map<T>(callback: (l: Letter) => T): T[] {
    return [this.T, this.O, this.S, this.C].map(callback);
  }
}
