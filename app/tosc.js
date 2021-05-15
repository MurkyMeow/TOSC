const colors = { R: 'red', B: 'blue', G: 'green', r: 'red', b: 'blue', g: 'green' };

class TOSC {
    constructor(str) {
        this.T = { letter: 'T', color: 'blue', extra: false };
        this.O = { letter: 'O', color: 'blue', extra: false };
        this.S = { letter: 'S', color: 'blue', extra: false };
        this.C = { letter: 'C', color: 'blue', extra: false };
        this.fromJSON(str);
    }

    toJSON() {
        return this.map((el) => (el.extra ? el.color[0] + '+' : el.color[0])).join('');
    }

    fromJSON(str) {
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

    map(callback) {
        return [this.T, this.O, this.S, this.C].map(callback);
    }
}

module.exports = { TOSC };
