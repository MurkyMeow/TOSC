import { LitElement, property, css, html } from 'lit-element';
import { toscFromString } from './tosc';
import './tosc-inline';
import './tosc-avatar';

class TOSCPerson extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
      }

      .info {
        flex: 1;
      }

      .name {
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        display: flex;
      }

      .name::after {
        content: ' ';
        position: sticky;
        right: -0.5vw;
        top: 0px;
        height: 100%;
        min-width: 2.5vw;
        background: linear-gradient(90deg, #00000000 0%, var(--cover-color));
        display: block;
      }

      .name::-webkit-scrollbar {
        display: none;
      }

      .pronoun {
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #888;
      }

      .avatar {
        width: 80px;
        height: 80px;
        margin-right: 15px;
      }

      .tosc {
        font-size: 20px;
        align-self: center;
        margin-left: 10px;
      }
    `;
  }

  @property({ type: Object }) me = {
    name: 'Unnamed',
    avatar: '',
    pronoun: '',
    tosc: toscFromString('bbbb'),
  };

  render() {
    return html`
      <tosc-avatar class="avatar" src=${this.me.avatar}></tosc-avatar>
      <div class="info">
        <div class="name">${this.me.name}</div>
        ${this.me.pronoun ? html` <div class="pronoun">${`(${this.me.pronoun})`}</div> ` : html``}
      </div>
      <tosc-inline class="tosc" .tosc=${this.me.tosc}></tosc-inline>
    `;
  }
}

customElements.define('tosc-person', TOSCPerson);
