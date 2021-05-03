import { LitElement, css, html } from 'lit-element';
import { TOSC } from './tosc.js';

class TOSCinline extends LitElement {
  static get styles() {
    return css`
      :host {
        --text-size: 25px;
        --border-width: 1.5px;
        --text-ratio: 0.8;

        --red: #b02323;
        --blue: #5523f0;
        --green: #23b033;

        display: inline-block;
        height: 100%;
      }

      .container {
        display: flex;
        justify-content: space-between;
      }

      .letter {
        font-size: calc(var(--text-ratio) * var(--text-size));
        width: calc(var(--text-size));
        height: calc(var(--text-size));

        display: flex;
        align-items: center;
        justify-content: center;
      }

      .wrap {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .circle {
        content: '';
        width: calc(var(--text-size));
        height: calc(var(--text-size));

        position: absolute;
        top: calc(50% - (var(--border-widdth) + var(--text-size)) / 2);
        left: calc(50% - (var(--border-widdth) + var(--text-size)) / 2);

        border: var(--border-width) solid transparent;
        border-radius: 50%;
      }

      .extra.red .circle {
        border-color: var(--red);
      }
      .extra.blue .circle {
        border-color: var(--blue);
      }
      .extra.green .circle {
        border-color: var(--green);
      }

      .red {
        color: var(--red);
      }
      .blue {
        color: var(--blue);
      }
      .green {
        color: var(--green);
      }
    `;
  }

  static get properties() {
    return {};
  }

  firstUpdated() {
    if (this.tosc === undefined) this.tosc = new TOSC('BBBB');
  }

  render() {
    return html`
      <span class="container">
        ${['T', 'O', 'S', 'C'].map(
          (lt) => html`
            <span class="wrap ${this.tosc[lt].color} ${this.tosc[lt].extra ? 'extra' : ''}">
              <span class="letter">${lt}</span>
              <span class="circle"></span>
            </span>
          `
        )}
      </span>
    `;
  }
}

customElements.define('tosc-inline', TOSCinline);
