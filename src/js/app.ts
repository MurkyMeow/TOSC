import { LitElement, css } from 'lit-element';
import { Router } from '@vaadin/router';

import './pages/tosc-page-index';
import './pages/tosc-page-room';
import './pages/tosc-page-host';

export class TOSCapp extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        margin: 0;
        background-color: #ddd;
        color: #222;

        height: 100%;
        width: 100%;
      }
    `;
  }

  constructor() {
    super();

    // const urlParams = new URLSearchParams(window.location.search);
    // this.roomId = urlParams.get('id') || '';

    // if (this.roomId) {
    //   storage.setRoomId(this.roomId);
    // } else {
    //   this.roomId = storage.getRoomId() || '';
    //   // update url with the value from storage
    //   urlParams.set('id', this.roomId);
    //   window.location.search = urlParams.toString();
    // }
  }

  firstUpdated() {
    const router = new Router(this.renderRoot);

    router.setRoutes([
      { path: '/', component: 'tosc-page-index' },
      { path: '/room/:roomId', component: 'tosc-page-room' },
      { path: '/host/:roomId', component: 'tosc-page-host' },
    ]);
  }
}

customElements.define('tosc-app', TOSCapp);
