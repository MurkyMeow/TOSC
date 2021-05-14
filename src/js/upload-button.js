import { LitElement, css, html } from 'lit-element';

class UploadButton extends LitElement {
    static get styles() {
        return css`
            :host {
                font-size: inherit;
            }

            #button {
                font-size: inherit;
                outline: none;
                border: none;
                border-radius: 5px;

                background-color: #ccc;
                padding: 10px 50px;
                transition: background-color 0.2s;
                width: inherit;
            }

            #button:active {
                background-color: #fff;
            }
        `;
    }

    static get properties() {
        return {};
    }

    render() {
        return html`
            <input id="upload" @change=${this.newFile} type="file" hidden></input>
            <button id="button" @click=${this.click}><slot></slot></button>
        `;
    }

    firstUpdated() {
        this.upload = this.shadowRoot.querySelector('#upload');
    }

    click() {
        this.upload.click();
    }

    newFile() {
        this.dispatchEvent(
            new CustomEvent('new-file', {
                detail: this.upload.files[0],
                bubbles: true,
                composed: true,
            })
        );
    }
}

customElements.define('upload-button', UploadButton);
