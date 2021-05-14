import { LitElement, css, html } from 'lit-element';
import { TOSC } from './tosc.js';

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

    static get properties() {
        return {
            tosc: { type: Object },
        };
    }

    firstUpdated() {
        if (this.tosc === undefined) this.tosc = new TOSC('BBBB');
    }

    render() {
        return html`
            ${this.tosc.map(
                (lt) =>
                    html`
                        <span class="letter ${lt.color}" ?extra=${lt.extra}> ${lt.letter} </span>
                    `
            )}
        `;
    }
}
customElements.define('tosc-inline', TOSCinline);
