class ServerAPI {
    constructor() {
        this.handlers = new Map();
        this.tries = 0;

        this.on = (type, handler) => {
            if (!this.handlers.has(type)) this.handlers.set(type, []);
            this.handlers.get(type).push(handler);
        };
    }

    connect() {
        this.ws = new WebSocket(`ws://${location.host}`);

        this.ws.onopen = () => {
            console.log('WebSocket is open now');
            this.tries = 0;
            clearInterval(this.reconnect);
            if (this.onconnection) this.onconnection();
        };

        this.ws.onclose = () => {
            console.log('WebSocket is closed now');
            this.reconnect = setInterval(() => {
                if (this.tries < 3) {
                    this.tries++;
                    this.connect();
                    console.log('Trying to reconnect');
                } else {
                    console.log('Im dead');
                    clearInterval(this.reconnect);
                }
            }, 2000);
        };

        this.ws.onerror = () => {
            console.log('Some sort of error in WebSocket');
            clearInterval(this.reconnect);
        };

        this.ws.onmessage = (event) => {
            let data = JSON.parse(event.data);
            if (this.handlers.has(data.type)) {
                this.handlers.get(data.type).forEach((handler) => handler(data.data));
            } else {
                console.log('Unknown type of event: ' + data.type);
                console.log(data.data);
            }
        };
    }

    say(type, data) {
        this.ws.send(JSON.stringify({ type, data }));
    }
}

export const api = new ServerAPI();
api.connect();
