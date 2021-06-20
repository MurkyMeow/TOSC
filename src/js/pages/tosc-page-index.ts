import { LitElement, css, html } from 'lit-element';
import { Router } from '@vaadin/router';

import * as api from '../serverAPI';
import * as storage from '../storage';

class TOSCPageIndex extends LitElement {
  static get styles() {
    return css``;
  }

  onJoinSubmit(e: Event & { currentTarget: HTMLFormElement }): void {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const roomId = String(data.get('roomId'));

    Router.go(`/room/${roomId}`);
  }

  onCreateSubmit(e: Event & { currentTarget: HTMLFormElement }): void {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const name = String(data.get('roomName'));

    api
      .createRoom({ name })
      .then((res) => {
        storage.setRoomToken(res.token);
        Router.go(`/host/${res.room.id}`);
      })
      .catch(() => {
        alert("Coulnd't create a room");
      });
  }

  render() {
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

customElements.define('tosc-page-index', TOSCPageIndex);
