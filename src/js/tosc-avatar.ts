import { LitElement, css, html, property } from 'lit-element';
import './just-button';

export interface ToscAvatarNewAvatar {
  avatar: string;
}

class TOSCavatar extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-block;
        width: 100%;
        height: 100%;
      }

      #avatar-wrap {
        width: 250px;
        height: 250px;
        overflow: hidden;
        display: flex;
      }

      #avatar {
        border-radius: 50%;
        object-fit: cover;
        width: 100%;
      }

      #popup {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000000a0;
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
        width: 80%;
        border-radius: 10px;
      }

      #avatar-preview {
        position: relative;
        width: 80vw;
        height: 80vw;
        overflow: hidden;
        display: flex;
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
      }

      #avatar-preview img {
        object-fit: cover;
        width: 100%;
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
        padding: 50px 30px;
        display: flex;
        justify-content: space-between;
        gap: 100px;
      }

      .button {
        flex: 1 1 0;
        width: 100%;
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
  @property({ type: String }) avatar = '/img/noavatar.png';
  @property({ type: Boolean }) popup = false;
  @property({ type: Boolean }) errorHide = true;
  @property({ type: String }) error = '';

  file: File | undefined;
  form: HTMLFormElement | null = null;

  firstUpdated() {
    this.form = this.renderRoot.querySelector('#controls');
  }

  render() {
    return html`
      <div id="avatar-wrap" @click=${this.showPopup}>
        <img id="avatar" src=${this.avatar} />
      </div>
      <div id="popup" @click=${this.mbHidePopup} ?hidden=${!this.popup}>
        <div id="container">
          <div id="avatar-preview">
            <div id="error" ?hidden=${this.errorHide}>${this.error}</div>
            <img src=${this.previewAvatar} />
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
    this.previewAvatar = this.avatar;
    this.popup = true;
  }

  hidePopup() {
    this.popup = false;
  }

  tryFreeAvatar() {
    if (this.avatar.startsWith('blob:')) URL.revokeObjectURL(this.avatar);
  }

  saveAvatar() {
    if (!this.form) {
      throw new Error('could not find form');
    }

    this.tryFreeAvatar();
    this.avatar = this.previewAvatar;

    const formdata = new FormData(this.form);
    console.log(formdata);

    fetch('/uploadAvatar', { method: 'POST', body: formdata })
      .then((res) => res.text())
      .then((avatar) => {
        this.tryFreeAvatar();
        this.avatar = avatar;

        this.hidePopup();
        this.dispatchEvent(
          new CustomEvent<ToscAvatarNewAvatar>('new-avatar', {
            detail: { avatar },
          })
        );
      });
  }

  previewFile(e: { target: HTMLInputElement }) {
    const [file] = e.target.files || [];
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      if (this.avatar !== this.previewAvatar && this.previewAvatar.startsWith('blob:'))
        URL.revokeObjectURL(this.previewAvatar);
      this.previewAvatar = URL.createObjectURL(file);
      this.file = file;
    } else {
      this.showError('Unsupported file type!');
    }
  }

  showError(error: string) {
    this.error = error;
    this.errorHide = false;
    setTimeout(() => (this.errorHide = true), 2000);
  }
}

customElements.define('tosc-avatar', TOSCavatar);
