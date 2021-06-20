import { LitElement, property, css, html } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import * as QRCode from 'qrcode';

import * as api from '../serverAPI';
import { Room } from '../types';

import '../tosc-inline';

class TOSCPageHost extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
      }

      .title {
        background: #00000025;
        text-align: center;
        padding: 8px;
        margin-bottom: 20px;
      }

      #people {
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
        justify-content: center;
        align-items: center;
        padding: 10px;
        scroll-behavior: smooth;

        overflow-y: auto;
        height: 100%;

        padding-bottom: 160px; /* for qr code */
      }

      .person {
        display: grid;
        background-color: #eee;
        border-radius: 10px;
        padding: 10px;

        grid-template-columns: 100px auto;
        gap: 10px 15px;

        width: 400px;
      }

      .avatar {
        grid-row: 1;
        grid-column: 1;

        width: 100px;
        height: 100px;
        background-color: #bdf0ff;
        padding: 5px;
        box-sizing: border-box;
        border-radius: 50%;
        object-fit: cover;
      }

      .wrap {
        grid-row: 1;
        grid-column: 2;

        height: 100%;
        width: 100%;

        overflow: hidden;
        text-overflow: ellipsis;
      }

      .name {
        white-space: nowrap;
        width: 100%;
      }

      .pronoun {
        color: #666;
        font-size: 20px;
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        margin-top: 10px;
        display: block;
      }

      .tosc {
        grid-row: 2;
        grid-column: 1 / 3;

        width: 100%;
        justify-content: space-around;
        --font-size: 40px;
      }

      #qrcode {
        position: absolute;
        right: 20px;
        bottom: 20px;
        border-radius: 10px;
      }
    `;
  }

  // /room/:id
  get roomId() {
    const parts = location.pathname.split('/');
    return parts[parts.length - 1];
  }

  @property({ attribute: false }) roomData?: Room;

  _syncInterval = -1;

  firstUpdated() {
    const qrcode = this.renderRoot.querySelector('#qrcode');

    if (!qrcode) {
      console.warn('could not find #qrcode');
    } else {
      const link = `${window.location.href}room?id=${this.roomId}`;

      QRCode.toCanvas(qrcode, link, (error) => {
        if (error) console.error(error);
        console.log(`Link for room ${this.roomId} generated!`);
      });
    }
  }

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

    return html`
      <div class="title">Today at ${roomData.name}</div>
      <div id="people">
        ${repeat(
          Object.entries(roomData.users),
          ([key]) => key,
          ([_, person]) => html`
            <div class="person">
              <img class="avatar" src=${person.avatar ? person.avatar : 'img/noavatar.png'} />
              <div class="wrap">
                <span class="name">${person.name}</span>
                <span class="pronoun">${person.pronoun}</span>
              </div>
              <tosc-inline class="tosc" .tosc=${person.tosc}></tosc-inline>
            </div>
          `
        )}
      </div>
      <canvas id="qrcode"></canvas>
    `;
  }
}

customElements.define('tosc-page-host', TOSCPageHost);
