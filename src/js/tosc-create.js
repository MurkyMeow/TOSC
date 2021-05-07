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
                grid-template-rows: 300px 15vh auto 200px;
            }

            .name {
                background: transparent;
                border: none;
                border-bottom: 5px solid silver;
                color: #222;
                display: block;

                font-size: inherit;
                width: calc(100% - 20px);
                margin: 20px 10px;

                outline: none;
            }

            .name:focus-visible {
                border-color: pink;
            }

            .pronoun {
                background: #eee;
                color: #222;
                padding: 3px;
                border-radius: 5px;
                display: inline-block;
                margin-bottom: 20px;
            }

            .hint {
                text-align: center;
                font-size: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 10px;
            }

            .controls {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                height: 100%;
                padding: 0 10px;
                box-sizing: border-box;
                place-content: center;
            }

            .scrolls,
            .extra {
                display: flex;
                width: 100%;
                justify-content: space-around;
            }

            .scrolls {
                /*background-color: rgba(0, 0, 0, 0.37);*/
                margin-bottom: 20px;
                --font-size: 50px;
            }

            tosc-scroll {
                --font-size: 80px;
            }

            tosc-button {
                margin-top: 3vh;
                width: 15vw;
                height: 3vh;
            }

            #button {
                width: 40%;
                height: 50%;
                place-self: center;
            }

        `;
    }

    static get properties() {
        return {
            hint: { type: String },
            me: { type: Object },
        };
    }

    constructor() {
        super();
        this.hint = hints.T.red[0];
    }

    render() {
        return html`
            <div class="personal">
                <input class="name" spellcheck="false"
                    value=${this.me.name}
                    @change=${this.changeName}
                >
                <tosc-drop
                    .choosen=${this.me.pronoun}
                    @change=${this.changePr}
                ></tosc-drop>
            </div>

            <div class="hint">${this.hint}</div>

            <div class="controls">
                <div class="scrolls">
                    ${this.me.tosc.map(el => html`
                        <tosc-scroll
                            .active=${el.color}
                            .extra=${el.extra}
                            .letter=${el.letter}
                            @update=${this.showHint}
                        ></tosc-scroll>
                    `)}
                </div>
                <div class="extra">
                    ${this.me.tosc.map(el => html`
                        <tosc-button
                            .letter=${el.letter}
                            .state=${el.extra}
                            @toggle=${this.toggleExtra}
                        ></tosc-button>
                    `)}
                </div>
            </div>

            <push-button id="button" @click=${this.switch}>Go back</push-button>
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

    switch() {
        const btnClkEv = new CustomEvent('button', {
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(btnClkEv);
    }
}

customElements.define('tosc-create', TOSCcreate);
