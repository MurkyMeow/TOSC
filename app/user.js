class User {
    constructor(ws, user) {
        this.name = user.name; //sting;
        this.pronoun = user.pronoun; //string;
        this.tosc = user.tosc; //TOSC as string
        this.id = user.id; //string
        this.avatar = user.avatar; //link (string);

        this.say = ws.say;
    }

    setAvatar(newAvatar) {//link to avatar (string)
        this.avatar = newAvatar;
        this.say('upd_avatar', newAvatar);
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
