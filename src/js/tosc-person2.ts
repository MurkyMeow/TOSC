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

      #name {
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        display: flex;
      }

      #name::after {
        content: ' ';
        position: sticky;
        right: -0.5vw;
        top: 0px;
        height: 100%;
        min-width: 2.5vw;
        background: linear-gradient(90deg, #00000000 0%, var(--cover-color));
        display: block;
      }

      #name::-webkit-scrollbar {
        display: none;
      }

      #pronoun {
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #888;
      }

      #avatar {
        width: 80px;
        height: 80px;
      }

      #tosc {
        margin-left: 10px;
        --font-ratio: 1.1;
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
      <tosc-avatar id="avatar" src=${this.me.avatar}></tosc-avatar>
      <div class="info">
        <span id="name">${this.me.name}</span>
        ${this.me.pronoun ? html` <span id="pronoun"> (${this.me.pronoun}) </span> ` : html``}
      </div>
      <tosc-inline id="tosc" .tosc=${this.me.tosc}></tosc-inline>
    `;
  }
}

customElements.define('tosc-person', TOSCPerson);
