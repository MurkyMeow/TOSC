import { LitElement, css, html } from 'lit-element';
import { isMobile } from './isMobile';
import { examples } from './example';
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
        };
    }

    constructor() {
        super();
        this.me = {
            name: 'Guest32432989',
            pronoun: '',
            tosc: new TOSC('BBBB'),
        };

        this.isMobile = isMobile();
        //this.showList = true;

        this.showList = false;
    }

    render() {
        if (!this.isMobile) return this.renderLandscapeLayout();
        return this.showList ? this.renderList() : this.renderCreate();
    }

    renderLandscapeLayout() {
        return html` <tosc-list-landscape .people=${examples}>Today at SOMEPLACE</tosc-list-landscape> `;
    }

    renderList() {
        return html` <tosc-list .me=${this.me} .list=${examples} @switch=${this.changeScreen}></tosc-list> `;
    }

    renderCreate() {
        return html` <tosc-create .me=${this.me} @button=${this.changeScreen} @update=${this.updateMe}></tosc-create> `;
    }

    changeScreen() {
        this.showList = !this.showList;
    }
}

customElements.define('tosc-app', TOSCapp);
