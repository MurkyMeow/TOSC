import { LitElement, property, css, html } from 'lit-element';
import { api } from './serverAPI';
import * as utils from './utils';
import * as QRCode from 'qrcode';
import { Person } from './types';

class TOSCListLandscape extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
      }

      #title {
        display: block;
        width: 100%;
        background: #00000025;
        text-align: center;
        padding: 8px;
        box-sizing: border-box;

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

  @property({ type: Array }) people: Person[] = [];

  roomId = utils.genToken(12);
  myLink = `${window.location.href}room?id=${this.roomId}`;

  constructor() {
    super();
    api.onconnection = () => api.say('add_room', { room_id: this.roomId });
  }

  firstUpdated() {
    const qrcode = this.renderRoot.querySelector('#qrcode');

    if (!qrcode) {
      throw new Error('could not find qrcode');
    }

    QRCode.toCanvas(qrcode, this.myLink, (error) => {
      if (error) console.error(error);
      console.log(`Link for room ${this.roomId} generated!`);
    });
  }

  render() {
    return html`
      <slot id="title"></slot>
      <div id="people">
        ${this.people.map(
          (person) => html`
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

customElements.define('tosc-list-landscape', TOSCListLandscape);
