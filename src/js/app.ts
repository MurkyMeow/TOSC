import { LitElement, css, html, property } from 'lit-element';
import * as api from './serverAPI';
import { toscFromString } from './tosc';
import * as storage from './storage';
import './tosc-list';
import './tosc-list-landscape';

export class TOSCapp extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        margin: 0;
        background-color: #ddd;
        color: #222;

        height: 100%;
        width: 100%;
      }
    `;
  }

  initialUser = storage.getUserData() || {
    name: 'Guest',
    pronoun: '',
    avatar: '',
    tosc: toscFromString('bbbb'),
  };

  @property({ attribute: false }) room = {
    id: '',
    token: '',
    isJoined: false,
  };

  @property({ attribute: false }) roomId = '';

  constructor() {
    super();

    // const urlParams = new URLSearchParams(window.location.search);
    // this.roomId = urlParams.get('id') || '';

    // if (this.roomId) {
    //   storage.setRoomId(this.roomId);
    // } else {
    //   this.roomId = storage.getRoomId() || '';
    //   // update url with the value from storage
    //   urlParams.set('id', this.roomId);
    //   window.location.search = urlParams.toString();
    // }
  }

  onJoinSubmit(e: Event & { currentTarget: HTMLFormElement }): void {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const roomId = String(data.get('roomId'));

    api
      .joinRoom({ roomId, user: this.initialUser })
      .then((res) => {
        this.room = {
          id: roomId,
          token: res.token,
          isJoined: true,
        };
      })
      .catch(() => {
        alert("Couldn't join that room");
      });
  }

  onCreateSubmit(e: Event & { currentTarget: HTMLFormElement }): void {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const roomName = String(data.get('roomName')); // FIXME unsued now

    api
      .createRoom()
      .then((res) => {
        this.roomId = res.roomId;
      })
      .catch(() => {
        alert("Coulnd't create a room");
      });
  }

  render() {
    const { roomId, room } = this;

    if (roomId) {
      return html`<tosc-list-landscape roomId=${roomId}>Today at SOMEPLACE</tosc-list-landscape>`;
    }

    if (room.isJoined) {
      return html`<tosc-list roomId=${room.id} token=${room.token}></tosc-list>`;
    }

    return html`
      <form @submit=${this.onJoinSubmit}>
        <label>
          Room id
          <input name="roomId" type="text" />
        </label>
        <button>Join room</button>
      </form>
      <form @submit=${this.onCreateSubmit}>
        <label>
          Room name
          <input name="roomName" type="text" />
        </label>
        <button>Create room</button>
      </form>
    `;
  }
}

customElements.define('tosc-app', TOSCapp);
