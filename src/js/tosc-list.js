import { LitElement, css, html } from 'lit-element';
import './tosc-inline.js';

class TOSClist extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;

        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .me,
      .others {
        width: 90%;
      }

      .person {
        margin-top: 20px;
        width: 100%;
        display: flex;
        align-items: center;
      }

      .pname {
        font-size: 30px;
      }

      .ppronun {
        font-size: 15px;
        color: #888;
        margin-left: 10px;
      }

      tosc-inline {
        --text-size: 30px;
        --border-width: 2px;
        --text-ratio: 0.9;
        width: 150px;
        margin-left: auto;
      }

      .me {
        box-sizing: border-box;
        width: 102%;
        padding: 5px 5%;
        background-color: #292b35a0;

        display: grid;
        grid-template-areas:
          'name tosc'
          'pronoun tosc';
        height: 70px;

        margin: -5px -5px 20px -5px;
        border-radius: 8px;
      }

      .me.nopro {
        grid-template-areas: 'name tosc';
      }

      .me.nopro .pname {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .me tosc-inline {
        grid-area: tosc;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .me .pname {
        grid-area: name;
      }

      .me .ppronun {
        grid-area: pronoun;
        margin: 0;
      }

      .btn {
        margin-top: auto;
        margin-bottom: 20px;
        width: 100px;
        height: 40px;

        border: none;
        border-radius: 5px;
        background-color: #555555;
        color: #eee;
        font-size: 20px;
        outline: none;
      }

      .btn:focus-visible,
      .btn:hover {
        background-color: #666555;
      }

      .btn:active {
        filter: brightness(1.2);
      }
    `;
  }

  static get properties() {
    return {
      list: { type: Array },
      me: { type: Object },
    };
  }

  render() {
    return html`
      <div class="me ${this.me.pronoun === '' ? 'nopro' : ''}">
        <span class="pname">${this.me.name}</span>
        ${this.me.pronoun === '' ? html`` : html` <span class="ppronun">(${this.me.pronoun})</span> `}
        <tosc-inline .tosc=${this.me.tosc}></tosc-inline>
      </div>
      <div class="others">
        ${this.list.map(
          (ex) => html`
            <div class="person">
              <span class="pname">${ex.name}</span>
              ${ex.pronoun === '' ? html`` : html``}
              <span class="ppronun"> ${ex.pronoun === '' ? '' : `(${ex.pronoun})`} </span>
              <tosc-inline .tosc=${ex.tosc}></tosc-inline>
            </div>
          `
        )}
      </div>

      <button class="btn" @click=${this.switch}>Edit</button>
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
