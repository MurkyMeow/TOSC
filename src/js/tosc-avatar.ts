import { LitElement, css, html, property } from 'lit-element';

class TOSCAvatar extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-block;
        width: 100%;
        height: 100%;
      }

      .avatar {
        object-fit: cover;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #bdf0ff;
      }
    `;
  }

  @property({ type: String }) src = '';

  render() {
    return html`<img class="avatar" src=${this.src || '/img/noavatar.png'} alt="" />`;
  }
}

customElements.define('tosc-avatar', TOSCAvatar);
