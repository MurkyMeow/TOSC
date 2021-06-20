import { LitElement, css, html } from 'lit-element';
import { Router } from '@vaadin/router';

import * as api from '../serverAPI';
import * as storage from '../storage';

class TOSCPageIndex extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100%;
      }

      .form {
        display: block;
        max-width: 400px;
        margin: 0 auto;
      }
      .form-input {
        display: block;
        width: 100%;
      }
      .form-btn {
        display: block;
        max-width: 200px;
        margin: 10px auto 0;
      }
    `;
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
      <form class="form" @submit=${this.onCreateSubmit}>
        <label class="form-row">
          Room name:
          <input class="form-input" name="roomName" type="text" />
        </label>
        <button class="form-btn">Create room</button>
      </form>
    `;
  }
}

customElements.define('tosc-page-index', TOSCPageIndex);
