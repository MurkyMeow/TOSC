import { LitElement, css, html } from 'lit-element';
import { isMobile } from './isMobile';
import { TOSC } from './tosc';
import './tosc-list';
import './tosc-create';
import './tosc-list-landscape';

class TOSCapp extends LitElement {
    static get styles() {
        return css`
            :host {
                display: block;
                margin: auto;
                /*background-color: #444569;*/
                /*background-color: #1e1e2e;*/
                background-color: #ddd;
                color: #222;
                border-radius: 10px;
                font-family: sans;

                height: 100%;
                width: 100%;
            }

            :host > * {
                --font-size: 20pt;
                font-size: var(--font-size);
            }

            @media (hover: none) and (pointer: coarse) {
                /*mobile*/
                :host > * {
                    --font-size: 50px;
                    font-size: var(--font-size);
                }
            }
        `;
    }

    static get properties() {
        return {
            showList: { type: Boolean },
            people: { type: Array, attribute: false },
        };
    }

    constructor() {
        super();
        this.me = {
            id: Math.random(), // FIXME
            name: 'Guest32432989',
            pronoun: '',
            tosc: new TOSC('BBBB'),
        };

        this.people = [];

        this.isMobile = isMobile();
        this.showList = true;
        //this.showList = false;
    }

    connectedCallback() {
        super.connectedCallback();

        const ws = new WebSocket('/ws');

        ws.onopen = () => {
            const join = JSON.stringify({ type: 'join', payload: this.me });
            ws.send(join);
        };

        ws.onmessage = (message) => {
            const data = JSON.parse(message.data);

            if (data.type === 'update') {
                this.people = data.payload;
            } else {
                console.error('Unsupported message', data);
            }
        };
    }

    render() {
        if (!this.isMobile) return this.renderLandscapeLayout();
        return this.showList ? this.renderList() : this.renderCreate();
    }

    renderLandscapeLayout() {
        return html` <tosc-list-landscape .people=${this.people}>Today at SOMEPLACE</tosc-list-landscape> `;
    }

    renderList() {
        return html` <tosc-list .me=${this.me} .list=${this.people} @switch=${this.changeScreen}></tosc-list> `;
    }

    renderCreate() {
        return html` <tosc-create .me=${this.me} @button=${this.changeScreen} @update=${this.updateMe}></tosc-create> `;
    }

    changeScreen() {
        this.showList = !this.showList;
    }
}

customElements.define('tosc-app', TOSCapp);
