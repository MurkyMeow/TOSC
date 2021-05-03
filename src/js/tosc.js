const colors = { R: 'red', B: 'blue', G: 'green', r: 'red', b: 'blue', g: 'green' };

export class TOSC {
  constructor(str) {
    this.T = { color: 'blue', extra: false };
    this.O = { color: 'blue', extra: false };
    this.S = { color: 'blue', extra: false };
    this.C = { color: 'blue', extra: false };

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
}
