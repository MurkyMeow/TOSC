export interface Handler {
  (message: unknown): void;
}

class ServerAPI {
  handlers = new Map<string, Handler[]>();
  tries = 0;
  reconnect = -1;
  ws: WebSocket | undefined;

  onconnection?: () => void;

  on(type: string, handler: Handler): void {
    const handlers = this.handlers.get(type);

    if (handlers) {
      handlers.push(handler);
    } else {
      this.handlers.set(type, [handler]);
    }
  }

  connect(): void {
    this.ws = new WebSocket(`ws://${location.host}`);

    this.ws.onopen = () => {
      console.log('WebSocket is open now');
      this.tries = 0;
      clearInterval(this.reconnect);
      if (this.onconnection) this.onconnection();
    };

    this.ws.onclose = () => {
      console.log('WebSocket is closed now');
      this.reconnect = window.setInterval(() => {
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
      const handlers = this.handlers.get(data.type);
      if (handlers) {
        handlers.forEach((handler) => handler(data.data));
      } else {
        console.log('Unknown type of event: ' + data.type);
        console.log(data.data);
      }
    };
  }

  say(type: string, data: unknown) {
    this.ws?.send(JSON.stringify({ type, data }));
  }
}

export const api = new ServerAPI();
api.connect();
