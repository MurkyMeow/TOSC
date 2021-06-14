import { LitElement, css, html, property } from 'lit-element';

export interface ToscButtonToggle {
  state: boolean;
}

class PushButton extends LitElement {
  static get styles() {
    return css`
      .wrap {
        position: relative;
        width: 100%;
        height: 100%;
      }

      .cover {
        width: 100%;
        height: 100%;
        background-color: #555;
        border-radius: 5px;
        transition: 0.1s;
      }

      .cover.active {
        background-color: #76bc59;
      }

      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        opacity: 0;
      }
    `;
  }

  @property({ type: Boolean }) state = false;

  render() {
    return html`
      <div class="wrap">
        <div class="cover ${this.state ? 'active' : 'inactive'}"></div>
        <input type="checkbox" @click=${this.toggle} ?checked=${this.state} />
      </div>
    `;
  }

  toggle(e: { target: HTMLInputElement }) {
    this.state = e.target.checked;

    const togEv = new CustomEvent<ToscButtonToggle>('toggle', {
      detail: { state: this.state },
    });

    this.dispatchEvent(togEv);
  }
}

customElements.define('tosc-button', PushButton);
