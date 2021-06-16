import { LitElement, property, css, html } from 'lit-element';
import { toscFromString } from './tosc';
import './tosc-inline';

class TOSCPerson extends LitElement {
  static get styles() {
    return css`
      :host {
        display: grid;
        grid-template-columns: 10vw 1fr auto;
        grid-gap: 20px;
        align-items: center;
        --cover-color: #ff0000;
      }

      #name {
        font-size: inherit;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        display: flex;
        height: 100%;
      }

      :host([center]) #name[center] {
        grid-row: 1/3;
        align-items: center;
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
        font-size: 3vw;
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #888;
      }

      #name,
      #pronoun {
        grid-column: 2;
      }

      #avatar {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 50%;
      }

      #tosc,
      #avatar {
        grid-row: 1 / 3;
      }

      #tosc {
        margin-left: 10px;
        grid-column: 3;
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
      <img id="avatar" src=${this.me.avatar ? this.me.avatar : '/img/noavatar.png'} />
      <span id="name" ?center=${this.me.pronoun === ''}>${this.me.name}</span>
      <span id="pronoun" ?hidden=${this.me.pronoun === ''}> (${this.me.pronoun}) </span>
      <tosc-inline id="tosc" .tosc=${this.me.tosc}></tosc-inline>
    `;
  }
}

customElements.define('tosc-person', TOSCPerson);
