import { LitElement, css, html, property } from 'lit-element';
import * as api from './serverAPI';
import { isMobile } from './isMobile';
import { toscFromString } from './tosc';
import * as storage from './storage';
import './tosc-list';
import './tosc-create';
import './tosc-list-landscape';
import { Person } from './types';

class TOSCapp extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        margin: auto;
        /*background-color: #444569;*/
        /*background-color: #1e1e2e;*/
        background-color: #ddd;
        color: #222;
        border-radius: 10px;
        font-family: sans;

        height: 100%;
        width: 100%;
      }

      #joinroom {
        display: flex;
        flex-direction: column;
        height: 100%;

        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 50px;
      }

      :host > * {
        --font-size: 20pt;
        font-size: var(--font-size);
      }

      @media (hover: none) and (pointer: coarse) {
        /*mobile*/
        :host > * {
          --font-size: 50px;
          font-size: var(--font-size);
        }
      }
    `;
  }

  @property({ type: Boolean }) showList = true;
  @property({ attribute: false }) me: Person = storage.getUserData() || {
    name: 'Guest',
    pronoun: '',
    avatar: '',
    tosc: toscFromString('bbbb'),
  };
  @property({ attribute: false }) people: Person[] = [];

  roomId = '';
  isMobile = isMobile();

  _userToken = '';

  constructor() {
    super();

    const urlParams = new URLSearchParams(window.location.search);
    this.roomId = urlParams.get('id') || '';

    if (this.roomId) {
      storage.setRoomId(this.roomId);
    } else {
      this.roomId = storage.getRoomId() || '';
      // update url with the value from storage
      urlParams.set('id', this.roomId);
      window.location.search = urlParams.toString();
    }
    //this.roomId = "l0goKUeetsF1";

    window.onunload = () => {
      //if (this.isMobile)
      //api.say('left_room', { room_id: this.roomId, user_id: this.me.id });
      //else
      //api.say('del_room', { room_id: this.roomId });
    };
  }

  connectedCallback() {
    super.connectedCallback();

    const { me, roomId } = this;

    if (!roomId) {
      return;
    }

    api.joinRoom({ roomId, user: me }).then((res) => {
      this._userToken = res.token;

      const syncRoomInfo = () => {
        api
          .getRoomInfo({ roomId: this.roomId })
          .then((res) => {
            this.people = res.users;
          })
          .catch(cancelSync);
      };

      const cancelSync = () => {
        clearInterval(syncInterval);
      };

      let syncInterval = window.setInterval(syncRoomInfo, 1000);
    });
  }

  render() {
    if (this.isMobile && this.roomId === null) return this.renderGetARoom();
    if (!this.isMobile) return this.renderLandscapeLayout();
    return this.showList ? this.renderList() : this.renderCreate();
  }

  renderGetARoom() {
    return html`
      <div id="joinroom">
        It look's like you haven't enter any room yet. Scan qrcode on the bottom of room's screen to
        join it.
      </div>
    `;
  }

  renderLandscapeLayout() {
    return html`
      <tosc-list-landscape id="list" .people=${this.people}>Today at SOMEPLACE</tosc-list-landscape>
    `;
  }

  renderList() {
    return html`
      <tosc-list
        id="list"
        .me=${this.me}
        .people=${this.people}
        @switch=${this.changeScreen}
      ></tosc-list>
    `;
  }

  renderCreate() {
    return html` <tosc-create
      .me=${this.me}
      @button=${this.changeScreen}
      @update=${this.updateMe}
    ></tosc-create>`;
  }

  updateMe(e) {
    this.me = e.detail;
    storage.setUserData(this.me);
  }

  changeScreen() {
    const { roomId, _userToken, me } = this;

    this.showList = !this.showList;

    if (!roomId || !_userToken) return;

    api.updateUser({ roomId, token: _userToken, user: me }).then((res) => {
      this.me = res.user;
    });
  }
}

customElements.define('tosc-app', TOSCapp);
