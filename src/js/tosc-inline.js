import { LitElement, css, html } from 'lit-element';
import { TOSC } from './tosc.js';

class TOSCinline extends LitElement {
<<<<<<< HEAD
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

    static get properties() {
        return {};
    }

    firstUpdated() {
        if (this.tosc === undefined) this.tosc = new TOSC('BBBB');
    }

    render() {
        return html`
            ${this.tosc.map(lt => html`
                <span class="letter ${lt.color}" ?extra=${lt.extra}>
                    ${lt.letter}
                </span>
            `)}
        `;
    }
=======
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

  constructor() {
    super();
    this.tosc = new TOSC('BBBB');
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
>>>>>>> 044c5df8e7aa1c3092106a860032c1056a5145d5
}

customElements.define('tosc-inline', TOSCinline);
