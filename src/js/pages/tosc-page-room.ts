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
      .list:not(.list-empty)::after {
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
    id: '',
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

    if (!userToken) {
      this._joinRoom()
        .then(() => {
          this._startSync();
        })
        .catch(() => {
          alert("Couldn't join that room");
        });
      return;
    }

    // token exists, try to post an update
    api
      .updateUser({ roomId, token: userToken, user: me })
      .then((res) => {
        this.me = res.user;
      })
      .catch(() => {
        // token possibly invalid, try to retreive a new one
        return this._joinRoom();
      })
      .then(() => {
        this._startSync();
      })
      .catch(() => {
        alert("Couldn't join that room");
      });
  }

  _joinRoom() {
    const { roomId, me } = this;

    return api.joinRoom({ roomId, user: me }).then((res) => {
      this.me = res.user;
      this.roomData = res.room;
      this.userToken = res.token;
      storage.setUserToken(res.token);
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
    const { me, roomData } = this;

    if (!roomData) {
      return html`<div>Loading...</div>`;
    }

    if (this.isEditing) {
      return html`
        <tosc-create .me=${me} @close=${this.toggleEdit} @update=${this.updateMe}></tosc-create>
      `;
    }

    if (!roomData.users.some((user) => user.id === me.id)) {
      alert('You have been removed from this room');
      return html``;
    }

    return html`
      <div class="list ${roomData.users.length > 1 ? '' : 'list-empty'}">
        <tosc-person class="person me" .me=${me}></tosc-person>
        ${repeat(
          roomData.users,
          (user) => user.id,
          (user) =>
            user.id === me.id
              ? html``
              : html`<tosc-person class="person" .me=${user}></tosc-person>`
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
