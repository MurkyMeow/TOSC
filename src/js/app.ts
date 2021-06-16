import { LitElement, css, html, property } from 'lit-element';
import { api } from './serverAPI';
import { isMobile } from './isMobile';
import { toscFromString } from './tosc';
import * as storage from './storage';
import { ADD_USER, DEL_USER, INIT, JOIN_ROOM, UPDATE_USER, CLOSE } from './events';
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

  @property({ type: Boolean }) closeTab = false;
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

    api.on(INIT, (users) => {
      console.log('init', users.length);
      this.people = users;
    });

    api.on(DEL_USER, (user_id) => {
      console.log('del user');
      const index = this.people.findIndex((user) => user.id === user_id);

      if (index !== -1) {
        this.people.splice(index, 1);
        this.renderRoot.querySelector('#list')!.requestUpdate();
      }
    });

    api.on(ADD_USER, (user) => {
      console.log('add user');
      this.people.push(user);
      //this.requestUpdate(); //it dosn't work this way :(
      this.renderRoot.querySelector('#list')!.requestUpdate();
    });

    api.on(UPDATE_USER, (user) => {
      if (user.id === this.me.id) return;

      console.log('upd user');
      const index = this.people.findIndex((old) => old.id === user.id);

      if (index !== undefined) {
        this.people[index] = user;
        this.renderRoot.querySelector('#list')!.requestUpdate();
      }
    });

    api.on(CLOSE, () => {
      this.closeTab = true;
    });

    window.onunload = () => {
      //if (this.isMobile)
      //api.say('left_room', { room_id: this.roomId, user_id: this.me.id });
      //else
      //api.say('del_room', { room_id: this.roomId });

      if (this.me?.avatar.startsWith('blob:')) URL.revokeObjectURL(this.me.avatar);
    };
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.isMobile)
      api.onconnection = () => api.say(JOIN_ROOM, { room_id: this.roomId, user: this.me });
  }

  render() {
    if (this.closeTab) return this.renderCloseTab();
    if (this.isMobile && this.roomId === null) return this.renderGetARoom();
    if (!this.isMobile) return this.renderLandscapeLayout();
    return this.showList ? this.renderList() : this.renderCreate();
  }

  renderCloseTab() {
    return html`
      <div id="joinroom">You've opened another tab, so this is not accessable anymore.</div>
    `;
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
    api.say(UPDATE_USER, { room_id: this.roomId, user: this.me });
    this.showList = !this.showList;
  }
}

customElements.define('tosc-app', TOSCapp);
