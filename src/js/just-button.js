import { LitElement, css, html } from 'lit-element';

class JustButton extends LitElement {
    static get styles() {
        return css`
            :host {
                font-size: inherit;
            }

            button {
                font-size: inherit;
                outline: none;
                border: none;
                border-radius: 5px;

                background-color: #ccc;
                padding: 10px 50px;
                transition: background-color 0.2s;
                width: inherit;
            }

            button:active {
                background-color: #fff;
            }
        `;
    }

    static get properties() {
        return {};
    }

    render() {
        return html` <button><slot></slot></button> `;
    }
}

customElements.define('just-button', JustButton);
