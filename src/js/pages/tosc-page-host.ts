import { LitElement, property, css, html, query } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import * as QRCode from 'qrcode';

import * as storage from '../storage';
import * as api from '../serverAPI';
import { Room } from '../types';

import '../tosc-avatar';
import '../tosc-inline';

class TOSCPageHost extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height: 100%;
      }

      .title {
        font-size: 20px;
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
        position: relative;
        background-color: #eee;
        border-radius: 10px;
        padding: 10px;
        width: 400px;
      }
      .person-info {
        display: flex;
      }
      .person-remove {
        font: inherit;
        cursor: pointer;
        position: absolute;
        top: 10px;
        right: 10px;
        border: none;
      }

      .avatar {
        flex-shrink: 0;
        width: 80px;
        height: 80px;
        margin-right: 10px;
      }

      .wrap {
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
        justify-content: center;
        font-size: 35px;
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

  _roomToken = storage.getRoomToken();
  _syncInterval = -1;
  _qrcode?: HTMLCanvasElement;

  firstUpdated() {
    const qrcode = document.createElement('canvas');
    qrcode.id = 'qrcode';

    const link = `${window.location.origin}/room/${this.roomId}`;

    QRCode.toCanvas(qrcode, link, (error) => {
      if (error) console.error(error);
      console.log(`Link for room ${this.roomId} generated!`);
      this._qrcode = qrcode;
    });
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

  _removeUser(id: string) {
    const { roomId, _roomToken } = this;

    if (!_roomToken) {
      alert(`Room token not found`);
      return;
    }

    api.removeUser({ roomId, userId: id, token: _roomToken }).catch(() => {
      alert("Couldn't remove the user");
    });
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
          roomData.users,
          (user) => user.id,
          (user) => html`
            <div class="person">
              <button class="person-remove" @click=${() => this._removeUser(user.id)}>x</button>
              <div class="person-info">
                <tosc-avatar class="avatar" src=${user.avatar}></tosc-avatar>
                <div class="wrap">
                  <span class="name">${user.name}</span>
                  <span class="pronoun">${user.pronoun}</span>
                </div>
              </div>
              <tosc-inline class="tosc" .tosc=${user.tosc}></tosc-inline>
            </div>
          `
        )}
      </div>
      ${this._qrcode}
    `;
  }
}

customElements.define('tosc-page-host', TOSCPageHost);
