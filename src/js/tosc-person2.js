import { LitElement, css, html } from 'lit-element';
import { TOSC } from './tosc';
import './tosc-inline';

class TOSCPerson extends LitElement {
    static get styles() {
        return css`
            :host {
                display: grid;
                grid-template-columns: 10vw 1fr auto;
                grid-gap: 20px;
                align-items: center;
            }

            #name {
                font-size: inherit;
                overflow-x: auto;
                overflow-y: hidden;
                white-space: nowrap;
                display: flex;
                height: 100%;
            }

            #name::after {
                content: ' ';
                position: sticky;
                right: -0.5vw;
                top: 0px;
                height: 100%;
                min-width: 2.5vw;
                background: linear-gradient(90deg, #dddddd50 0%, #ddd);
                display: block;
            }

            #name::-webkit-scrollbar {
                display: none;
            }

            #pronoun {
                font-size: 3vw;
                overflow-x: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                color: #888;
            }

            #name,
            #pronoun {
                grid-column: 2;
            }

            #tosc,
            #avatar {
                grid-row: 1 / 3;
            }

            #tosc {
                margin-left: 10px;
                grid-column: 3;
                --font-ratio: 1.1;
            }
        `;
    }

    static get properties() {
        return {
            me: { type: Object },
        };
    }

    constructor() {
        super();
        this.me = { name: 'Unnamed', pronoun: '', tosc: new TOSC('BBBB') };
        this.avatar =
            'https://www.flaticon.com/svg/vstatic/svg/747/747402.svg?token=exp=1620310651~hmac=a9b02cfce78c075668c201880608aadb';
    }

    render() {
        return html`
            <img id="avatar" src=${this.avatar} />
            <span id="name">${this.me.name}</span>
            <span id="pronoun" ?hidden=${this.me.pronoun === ''}> (${this.me.pronoun}) </span>
            <tosc-inline id="tosc" .tosc=${this.me.tosc}></tosc-inline>
        `;
    }
}

customElements.define('tosc-person', TOSCPerson);
