import { LitElement, property, css, html } from 'lit-element';
import { toscFromString } from './tosc';
import './tosc-inline';
import { Person } from './types';

class TOSCPerson extends LitElement {
  static get styles() {
    return css`
      :host {
        display: grid;
        grid-template-columns: minmax(45%, 1fr) 1fr auto;
        grid-gap: 10px;
        align-items: center;
      }

      #pronoun {
        font-size: 3vw;
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #888;
      }

      #name {
        font-size: inherit;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        display: flex;
        height: 100%;
      }

      #name::after {
        content: ' ';
        position: sticky;
        right: -0.5vw;
        top: 0px;
        height: 100%;
        min-width: 2.5vw;
        background: linear-gradient(90deg, #dddddd50 0%, #ddd);
        display: block;
      }

      #name::-webkit-scrollbar {
        display: none;
      }

      #tosc {
        grid-column: 3;
        --font-ratio: 1.1;
      }
    `;
  }

  @property({ type: Object }) me: Person = {
    name: 'Unnamed',
    avatar: '',
    pronoun: '',
    tosc: toscFromString('bbbb'),
  };

  render() {
    return html`
      <span id="name">${this.me.name}</span>
      <span id="pronoun" ?hidden=${this.me.pronoun === ''}> (${this.me.pronoun}) </span>
      <tosc-inline id="tosc" .tosc=${this.me.tosc}></tosc-inline>
    `;
  }
}

customElements.define('tosc-person', TOSCPerson);
