class User {
    constructor(ws, user) {
        this.name = user.name; //sting;
        this.pronoun = user.pronoun; //string;
        this.tosc = user.tosc; //TOSC()
        this.id = user.id; //string
        this.avatar = undefined; //link (string);

        this.say = ws.say;
    }

    toJSON() {
        return {
            name: this.name,
            pronoun: this.pronoun,
            tosc: this.tosc,
            id: this.id,
            avatar: this.avatar,
        }
    }

};

module.exports = { User };
