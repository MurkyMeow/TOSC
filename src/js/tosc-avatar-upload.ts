import { LitElement, css, html, property } from 'lit-element';

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

      #avatar-preview {
        position: relative;
        overflow: hidden;
        display: flex;
      }

      #avatar-preview img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        max-height: 400px;
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

      #avatar-preview::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        box-shadow: 0px 0px 0px 400px #000000a0;
        width: 100%;
        height: 100%;
        border-radius: 100%;
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

      .upload {
        position: relative;
      }

      .upload-input {
        opacity: 0;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }
    `;
  }

  @property({ type: String }) previewAvatar = '';
  @property({ type: String }) src = '';
  @property({ type: Boolean }) popup = false;
  @property({ type: String }) error = '';

  file: File | undefined;
  form: HTMLFormElement | null = null;

  firstUpdated() {
    this.form = this.renderRoot.querySelector('#controls');
  }

  render() {
    return html`
      <tosc-avatar class="avatar" src=${this.src} @click=${this.showPopup}></tosc-avatar>
      <div id="popup" @click=${this.mbHidePopup} ?hidden=${!this.popup}>
        <div id="container">
          <div id="avatar-preview">
            ${this.error ? html` <div id="error">${this.error}</div> ` : html``}
            <img src=${this.previewAvatar} alt="" />
          </div>

          <form id="controls">
            <just-button class="button upload">
              <input class="upload-input" name="file" type="file" @change=${this.previewFile} />
              Upload
            </just-button>

            <just-button class="button" @click=${this.saveAvatar}>Save</just-button>
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

  tryFreeAvatar() {
    if (this.src.startsWith('blob:')) URL.revokeObjectURL(this.src);
  }

  saveAvatar() {
    if (!this.form) {
      throw new Error('could not find form');
    }

    this.tryFreeAvatar();
    this.src = this.previewAvatar;

    const formdata = new FormData(this.form);
    console.log(formdata);

    fetch('/uploadAvatar', { method: 'POST', body: formdata })
      .then((res) => res.text())
      .then((avatar) => {
        this.tryFreeAvatar();
        this.src = avatar;

        this.hidePopup();
        this.dispatchEvent(
          new CustomEvent<ToscAvatarUploadNewAvatar>('new-avatar', {
            detail: { avatar },
          })
        );
      });
  }

  previewFile(e: { target: HTMLInputElement }) {
    const [file] = e.target.files || [];
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      if (this.src !== this.previewAvatar && this.previewAvatar.startsWith('blob:'))
        URL.revokeObjectURL(this.previewAvatar);
      this.previewAvatar = URL.createObjectURL(file);
      this.file = file;
    } else {
      this.showError('Unsupported file type!');
    }
  }

  showError(error: string) {
    this.error = error;
    setTimeout(() => (this.error = ''), 2000);
  }
}

customElements.define('tosc-avatar-upload', TOSCAvatarUpload);
