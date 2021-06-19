import { LitElement, css, html, property } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import * as storage from './storage';
import * as api from './serverAPI';
import './tosc-create';
import './tosc-person2';
import './push-button';
import { Person } from './types';

class TOSClist extends LitElement {
  static get styles() {
    return css`
      :host {
        display: grid;
        grid-template-rows: fit-content(100px) auto 200px;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        gap: 20px;
      }

      #me {
        border-radius: inherit;
        background: #bdbdbd;
        height: fit-content;
        padding-top: 5px;
        padding-bottom: 5px;
        padding: 20px 30px;
      }

      #me tosc-person {
        --cover-color: #bdbdbd;
      }

      #others {
        padding: 0 30px;

        overflow-y: auto;
        width: 100%;
        box-sizing: border-box;
        position: relative;
      }

      #others tosc-person {
        --cover-color: #ddd;
      }

      #others .person:not(:last-child) {
        margin-bottom: 25px;
        padding-bottom: 25px;
        border-bottom: 2px solid #00000020;
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

  @property({ type: Object }) initialUser!: Person;
  @property({ type: String }) roomId = '';
  @property({ type: String }) token = '';

  @property({ attribute: false }) me: Person = this.initialUser;
  @property({ attribute: false }) people: Record<string, Person> = {};
  @property({ attribute: false }) isEditing = false;

  _syncInterval = -1;

  connectedCallback() {
    super.connectedCallback();
    this._startSync();
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
          this.people = res.room.users;
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
    if (this.isEditing) {
      return html`
        <tosc-create .me=${this.me} @button=${this.switch} @update=${this.updateMe}></tosc-create>
      `;
    }

    return html`
      <div id="me">
        <tosc-person .me=${this.me}></tosc-person>
      </div>
      <div id="others">
        ${repeat(
          Object.entries(this.people),
          ([id]) => id,
          ([_, ex]) => html`<tosc-person .me=${ex} class="person"></tosc-person>`
        )}
      </div>

      <push-button id="button" @click=${this.switch}>Edit</push-button>
    `;
  }

  switch() {
    this.isEditing = !this.isEditing;
  }

  updateMe(e: CustomEvent<Person>) {
    this.me = e.detail;
    storage.setUserData(this.me);

    const { roomId, token } = this;

    api.updateUser({ roomId, token, user: this.me }).then((res) => {
      this.me = res.user;
    });
  }
}

customElements.define('tosc-list', TOSClist);
