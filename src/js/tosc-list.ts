import { LitElement, css, html, property } from 'lit-element';
import './tosc-person2';
import './push-button';
import { Person } from './types';

class TOSClist extends LitElement {
  static get styles() {
    return css`
      :host {
        display: grid;
        grid-template-rows: fit-content(100px) auto 200px;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        gap: 20px;
      }

      #me {
        border-radius: inherit;
        background: #bdbdbd;
        height: fit-content;
        padding-top: 5px;
        padding-bottom: 5px;
        padding: 20px 30px;
      }

      #me tosc-person {
        --cover-color: #bdbdbd;
      }

      #others {
      }

      #others {
        padding: 0 30px;

        overflow-y: auto;
        width: 100%;
        box-sizing: border-box;
        position: relative;
      }

      #others tosc-person {
        --cover-color: #ddd;
      }

      #others .person:not(:last-child) {
        margin-bottom: 25px;
        padding-bottom: 25px;
        border-bottom: 2px solid #00000020;
      }

      #others::after {
        content: ' ';
        position: sticky;
        bottom: -0.5vh;
        left: 0px;
        min-height: 4vh;
        width: 100%;
        background: linear-gradient(#0000 0%, #ddd);
        display: block;
      }

      #others::-webkit-scrollbar {
        display: none;
      }

      .tosc {
        grid-column: 3;
        --font-ratio: 1.1;
      }

      #button {
        width: 40%;
        height: 50%;
        place-self: center;
      }
    `;
  }

  @property({ type: Object }) me!: Person;
  @property({ attribute: false }) people: Person[] = [];

  render() {
    return html`
      <div id="me">
        <tosc-person .me=${this.me}></tosc-person>
      </div>
      <div id="others">
        ${this.people.map((ex) => html`<tosc-person .me=${ex} class="person"></tosc-person>`)}
      </div>

      <push-button id="button" @click=${this.switch}>Edit</push-button>
    `;
  }

  switch() {
    const switchEv = new CustomEvent('switch', {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(switchEv);
  }
}

customElements.define('tosc-list', TOSClist);
