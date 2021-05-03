import { LitElement, css, html } from 'lit-element';
import { hints } from './hints.js';
import './tosc-button.js';
import './tosc-scroll.js';
import './tosc-drop.js';

class TOSCcreate extends LitElement {
  static get styles() {
    return css`
      :host {
        display: grid;
        height: 100%;
        width: 100%;
        grid-template-rows: 100px 80px auto;
      }

      .name {
        background: transparent;
        border: none;
        border-bottom: 2px solid silver;
        color: #eee;
        display: block;

        font-size: 25px;
        width: calc(100% - 20px);
        margin: 20px 10px;

        outline: none;
      }

      .name:focus-visible {
        border-color: pink;
      }

      .pronoun {
        background: #aaaaaa5a;
        padding: 3px;
        border-radius: 5px;
        display: inline-block;
        margin-bottom: 20px;
      }

      .hint {
        text-align: center;
        font-size: 3vw;
        width: 100%;
        height: 80px;
      }

      .controls {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 500px;
        height: 100%;
        margin: auto;
      }

      .scrolls,
      .extra {
        display: flex;
        width: 100%;
        justify-content: space-between;
      }

      .scrolls {
        /*background-color: rgba(0, 0, 0, 0.37);*/
        border-radius: 5px;
        box-sizing: border-box;
        padding: 8px;
        margin-bottom: 20px;
      }

      tosc-scroll {
        height: 400px;
      }

      tosc-button {
        width: 100px;
        height: 50px;
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
      hint: { type: String },
      me: { type: Object },
    };
  }

  render() {
    return html`
      <div class="personal">
        <input class="name" value=${this.me.name} spellcheck="false" @change=${this.changeName} />
        <tosc-drop .choosen=${this.me.pronoun} @change=${this.changePr}></tosc-drop>
      </div>

      <div class="hint">${this.hint}</div>

      <div class="controls">
        <div class="scrolls">
          ${['T', 'O', 'S', 'C'].map(
            (el) => html`
              <tosc-scroll
                .active=${this.me.tosc[el].color}
                .extra=${this.me.tosc[el].extra}
                .letter=${el}
                @update=${this.showHint}
              ></tosc-scroll>
            `
          )}
        </div>
        <div class="extra">
          ${['T', 'O', 'S', 'C'].map(
            (el) => html`
              <tosc-button .letter=${el} .state=${this.me.tosc[el].extra} @toggle=${this.toggleExtra}></tosc-button>
            `
          )}
        </div>

        <button class="btn" @click=${this.buttonClick}>Go back</button>
      </div>
    `;
  }

  changePr(e) {
    this.me.pronoun = e.detail.pronoun;
  }

  changeName(e) {
    this.me.name = e.currentTarget.value;
  }

  updateHint(letter, color, extra) {
    this.hint = hints[letter][color][extra | 0];
  }

  showHint(e) {
    const data = e.detail;
    this.me.tosc[data.letter].color = data.color;
    this.updateHint(data.letter, data.color, data.extra);
  }

  toggleExtra(e) {
    const letter = e.detail.letter;
    const color = this.me.tosc[letter].color;
    this.me.tosc[letter].extra = e.detail.state;
    this.updateHint(letter, color, e.detail.state);
    this.requestUpdate();
  }

  buttonClick() {
    const btnClkEv = new CustomEvent('button', {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(btnClkEv);
  }
}

customElements.define('tosc-create', TOSCcreate);
