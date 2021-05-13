class User {
    constructor(ws, user) {
        this.name = user.name; //sting;
        this.pro = user.pro; //string;
        this.tosc = user.tosc; //TOSC()
        this.id = user.id; //string
        this.avatar = undefined; //link (string);

        this.say = ws.say;
    }

    toJSON() {
        return {
            name: this.name,
            pro: this.pro,
            tosc: this.tosc.toJSON(),
            id: this.id,
            avatar: this.avatar,
        }
    }

};

module.exports = { User };
