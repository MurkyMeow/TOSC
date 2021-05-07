import { LitElement, css, html } from 'lit-element';
import './tosc-person2';
import './push-button';

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

            #me,
            #others {
                padding: 0 30px;
            }

            #others {
                overflow-y: auto;
                width: 100%;
                box-sizing: border-box;
                position: relative;
            }

            #others .person:not(:last-child) {
                margin-bottom: 1.5vh;
                padding-bottom: 1.5vh;
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

            #me {
                display: grid;
                grid-template-columns: minmax(45%, 1fr) 1fr auto;
                grid-gap: 10px;
                align-items: center;
            }

            .tosc {
                grid-column: 3;
                --font-ratio: 1.1;
            }

            #me {
                border-radius: inherit;
                background: #00000025;
                height: fit-content;
                padding-top: 5px;
                padding-bottom: 5px;
            }

            #me .pronoun {
                grid-column: 1;
                color: #4c4c4c;
            }

            #me .pronoun:not([hidden]) + .tosc {
                grid-row: 1 / 3;
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
            list: { type: Array },
            me: { type: Object },
        };
    }

    render() {
        return html`
            <div id="me">
                <span class="name">${this.me.name}</span>
                <span class="pronoun" ?hidden=${this.me.pronoun === ''}> (${this.me.pronoun}) </span>
                <tosc-inline class="tosc" .tosc=${this.me.tosc}></tosc-inline>
            </div>
            <div id="others">
                ${this.list.map((ex) => html` <tosc-person .me=${ex} class="person"></tosc-person> `)}
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
