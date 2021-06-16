import { LitElement, css, html, property } from 'lit-element';
import { TOSC, toscFromString } from './tosc';

class TOSCinline extends LitElement {
  static get styles() {
    return css`
      :host {
        --border-width: 2px;
        --font-size: inherit;
        --font-ratio: 1.2;
        --gap-width: 10px;

        --red: #b02323;
        --blue: #5523f0;
        --green: #23b033;

        display: flex;
        align-items: center;
        height: 100%;
        /*width: 100%;*/
      }

      .letter {
        --calc-size: calc(var(--font-size) * var(--font-ratio));

        font-size: var(--font-size);
        border: var(--border-width) solid transparent;
        border-radius: 50%;
        text-align: center;
        width: var(--calc-size);
        height: var(--calc-size);
        line-height: calc(var(--calc-size) + var(--border-width));
      }

      .letter:not(:last-child) {
        margin-right: var(--gap-width);
      }

      .letter.red[extra] {
        border-color: var(--red);
      }
      .letter.blue[extra] {
        border-color: var(--blue);
      }
      .letter.green[extra] {
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

  @property({ type: Object }) tosc: TOSC = toscFromString('bbbb');

  render() {
    return html`
      ${(Object.keys(this.tosc) as (keyof TOSC)[]).map(
        (lt) =>
          html`
            <span class="letter ${this.tosc[lt].color}" ?extra=${this.tosc[lt].extra}> ${lt} </span>
          `
      )}
    `;
  }
}
customElements.define('tosc-inline', TOSCinline);
