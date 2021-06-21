import { LitElement, css, html, property } from 'lit-element';
import * as FilePond from 'filepond';
import 'filepond/dist/filepond.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import './tosc-avatar';
import './just-button';

export interface ToscAvatarUploadNewAvatar {
  avatar: string;
}

class TOSCAvatarUpload extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-block;
        width: 100%;
        height: 100%;
      }

      #popup {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #000000a0;
        z-index: 5;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      #popup[hidden] {
        display: none;
      }

      #container {
        background-color: #eee;
      }

      #error {
        display: block;
        position: absolute;
        background-color: #e06666;
        padding: 20px 30px;
        transition: top 0.2s;
        z-index: 10;
        width: 70vw;
        border-radius: 10px;
        left: 2vw;
        top: 10%;
        text-align: center;
      }

      #error[hidden] {
        display: block;
        top: -100%;
      }

      #controls {
        padding: 25px;
        display: flex;
        justify-content: space-between;
      }

      .button {
        flex: 1;
        margin: 0 15px;
      }

      .filepond--credits {
        display: none;
      }
    `;
  }

  @property({ type: String }) previewAvatar = '';
  @property({ type: String }) src = '';
  @property({ type: Boolean }) popup = false;
  @property({ type: String }) error = '';
  @property({ attribute: false }) pondEl = document.createElement('div');

  file: File | undefined;

  firstUpdated() {
    FilePond.registerPlugin(FilePondPluginImagePreview);
    const filePond = FilePond.create(this.pondEl, {
      name: 'file',
    });
    filePond.onaddfile = () => {
      this.file = filePond.getFile()?.file;
    };
    filePond.onremovefile = () => {
      this.file = undefined;
    };
  }

  render() {
    return html`
      <link rel="stylesheet" href="/index.css" />
      <tosc-avatar class="avatar" src=${this.src} @click=${this.showPopup}></tosc-avatar>
      <div id="popup" @click=${this.mbHidePopup} ?hidden=${!this.popup}>
        <div id="container">
          ${this.pondEl}

          <form id="controls">
            <just-button class="button" @click=${this.saveAvatar}>Save</just-button>
            <just-button class="button" @click=${this.mbHidePopup}>Close</just-button>
          </form>
        </div>
      </div>
    `;
  }

  mbHidePopup(e: Event) {
    if (e.currentTarget === e.target) this.hidePopup();
  }

  showPopup() {
    this.previewAvatar = this.src;
    this.popup = true;
  }

  hidePopup() {
    this.popup = false;
  }

  saveAvatar() {
    if (!this.file) {
      return;
    }

    this.src = this.previewAvatar;

    const formdata = new FormData();
    formdata.append('file', this.file);

    fetch('/uploadAvatar', { method: 'POST', body: formdata })
      .then((res) => res.text())
      .then((avatar) => {
        this.src = avatar;

        this.hidePopup();
        this.dispatchEvent(
          new CustomEvent<ToscAvatarUploadNewAvatar>('new-avatar', {
            detail: { avatar },
          })
        );
      })
      .catch(() => {
        this.showError("Couldn't load your image");
      });
  }

  showError(error: string) {
    this.error = error;
    setTimeout(() => (this.error = ''), 2000);
  }
}

customElements.define('tosc-avatar-upload', TOSCAvatarUpload);
