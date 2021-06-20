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
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
      }

      .me {
        position: sticky;
        top: 0;
        background: #bdbdbd;
      }

      .person {
        padding: 10px 30px;
      }
      .person:not(:last-child) {
        border-bottom: 2px solid #00000020;
      }

      .list {
        position: relative;
        flex: 1;
        overflow: auto;
      }
      .list::after {
        content: ' ';
        position: absolute;
        bottom: 0;
        left: 0;
        height: 30px;
        width: 100%;
        background: linear-gradient(#0000 0%, #ddd);
        display: block;
      }
      .list::-webkit-scrollbar {
        display: none;
      }

      .edit-btn {
        width: 100%;
        max-width: 200px;
        margin: 0 auto 30px;
      }

      @media (max-width: 768px) {
        .person {
          --tosc-person_avatar-size: 60px;
          --tosc-person_tosc-size: 20px;
          padding: 10px;
        }
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
        this._startSync();
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
          alert("Couldn't retreive room info, try refreshing the page");
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
        <tosc-create
          .me=${this.me}
          @close=${this.toggleEdit}
          @update=${this.updateMe}
        ></tosc-create>
      `;
    }

    return html`
      <div class="list">
        <tosc-person class="person me" .me=${this.me}></tosc-person>
        ${repeat(
          Object.entries(roomData.users),
          ([id]) => id,
          ([_, ex]) => html`<tosc-person class="person" .me=${ex}></tosc-person>`
        )}
      </div>
      <push-button class="edit-btn" @click=${this.toggleEdit}>Edit</push-button>
    `;
  }

  toggleEdit() {
    if (this.isEditing) {
      const { roomId, userToken } = this;

      if (userToken) {
        api.updateUser({ roomId, token: userToken, user: this.me });
      }
    }

    this.isEditing = !this.isEditing;
  }

  updateMe(e: CustomEvent<Person>) {
    this.me = e.detail;
    storage.setUserData(this.me);
  }
}

customElements.define('tosc-page-room', TOSCPageRoom);
