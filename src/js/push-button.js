import { LitElement, css, html } from 'lit-element';

class PushButton extends LitElement {
    static get styles() {
        return css`
            :host {
                --bg-color-active: #aaa;
                --fg-color-active: #000;
                --bg-color: #eee;
                --fg-color: #000;

                border-radius: 10px;
                background-color: var(--bg-color);
                color: var(--fg-color);
                outline: none;

                display: flex;
                justify-content: center;
                align-items: center;

                user-select: none;
            }

            :host(:focus-visible),
            :host(:hover) {
                background-color: var(--bg-color-active);
                color: var(--fg-color-active);
            }

            :host(:active) {
                filter: brightness(1.2);
            }
        `;
    }

    static get properties() {
        return {};
    }

    constructor() {
        super();
        this.tabIndex = '0';
    }

    render() {
        return html` <slot></slot> `;
    }
}

customElements.define('push-button', PushButton);
