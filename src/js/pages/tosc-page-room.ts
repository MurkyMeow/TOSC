import { LitElement, css, html, property } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import * as storage from '../storage';
import * as api from '../serverAPI';
import { toscFromString } from '../tosc';
import '../tosc-create';
import '../tosc-person2';
import '../push-button';
import { Person, Room } from '../types';

class TOSCPageRoom extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
        min-height: 100%;
      }

      .me {
        background: #bdbdbd;
      }

      .person {
        padding: 20px 30px;
      }
      .person:not(:last-child) {
        border-bottom: 2px solid #00000020;
      }

      #others {
        position: relative;
      }

      #others::after {
        content: ' ';
        position: sticky;
        bottom: -0.5vh;
        left: 0px;
        min-height: 4vh;
        width: 100%;
        background: linear-gradient(#0000 0%, #ddd);
        display: block;
      }

      #others::-webkit-scrollbar {
        display: none;
      }

      .tosc {
        grid-column: 3;
        --font-ratio: 1.1;
      }

      #button {
        width: 40%;
        height: 50%;
        place-self: center;
      }
    `;
  }

  // /room/:id
  get roomId(): string {
    const parts = location.pathname.split('/');
    return parts[parts.length - 1];
  }

  @property({ attribute: false }) me: Person = storage.getUserData() || {
    name: 'Guest',
    pronoun: '',
    avatar: '',
    tosc: toscFromString('bbbb'),
  };

  @property({ attribute: false }) roomData?: Room;
  @property({ attribute: false }) isEditing = false;

  _syncInterval = -1;
  userToken = storage.getUserToken() || '';

  connectedCallback() {
    super.connectedCallback();

    const { roomId, userToken, me } = this;

    api
      .joinRoom({ roomId, token: userToken, user: me })
      .then((res) => {
        this.roomData = res.room;
        this.userToken = res.token;
        storage.setUserToken(res.token);
      })
      .catch(() => {
        alert("Couldn't join that room");
      });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopSync();
  }

  _startSync() {
    const syncRoomInfo = () => {
      api
        .getRoomInfo({ roomId: this.roomId })
        .then((res) => {
          this.roomData = res.room;
        })
        .catch(() => {
          this._stopSync();
        });
    };

    this._syncInterval = window.setInterval(syncRoomInfo, 1000);
  }

  _stopSync() {
    window.clearInterval(this._syncInterval);
  }

  render() {
    const { roomData } = this;

    if (!roomData) {
      return html`<div>Loading...</div>`;
    }

    if (this.isEditing) {
      return html`
        <tosc-create .me=${this.me} @button=${this.switch} @update=${this.updateMe}></tosc-create>
      `;
    }

    return html`
      <tosc-person class="person me" .me=${this.me}></tosc-person>
      <div id="others">
        ${repeat(
          Object.entries(roomData.users),
          ([id]) => id,
          ([_, ex]) => html`<tosc-person class="person" .me=${ex}></tosc-person>`
        )}
      </div>

      <push-button id="button" @click=${this.switch}>Edit</push-button>
    `;
  }

  switch() {
    this.isEditing = !this.isEditing;
  }

  updateMe(e: CustomEvent<Person>) {
    const { roomId, userToken } = this;

    this.me = e.detail;
    storage.setUserData(this.me);

    if (userToken) {
      api.updateUser({ roomId, token: userToken, user: this.me });
    }
  }
}

customElements.define('tosc-page-room', TOSCPageRoom);
