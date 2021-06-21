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
        cursor: pointer;
        border: none;
        border-radius: 5px;

        background-color: #ccc;
        padding: 10px 50px;
        transition: background-color 0.2s;
        width: 100%;
      }

      button:active {
        background-color: #fff;
      }
    `;
  }

  render() {
    return html`<button><slot></slot></button>`;
  }
}

customElements.define('just-button', JustButton);
