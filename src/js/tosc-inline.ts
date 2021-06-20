import { LitElement, css, html, property } from 'lit-element';
import { TOSC } from './tosc';

class TOSCinline extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        align-items: center;
      }

      .letter {
        color: var(--letter-color);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.5em;
        height: 1.5em;
        border-radius: 50%;
        border: 2px solid transparent;
        box-sizing: border-box;
      }
      .letter:not(:last-child) {
        margin-right: 5px;
      }

      .extra {
        border-color: var(--letter-color);
      }

      .red {
        --letter-color: var(--red);
      }
      .blue {
        --letter-color: var(--blue);
      }
      .green {
        --letter-color: var(--green);
      }
    `;
  }

  @property({ type: Object }) tosc!: TOSC;

  render() {
    return html`
      ${(Object.keys(this.tosc) as (keyof TOSC)[]).map(
        (lt) =>
          html`
            <div class="letter ${this.tosc[lt].color} ${this.tosc[lt].extra ? 'extra' : ''}">
              ${lt}
            </div>
          `
      )}
    `;
  }
}
customElements.define('tosc-inline', TOSCinline);
