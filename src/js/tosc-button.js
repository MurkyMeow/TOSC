import { LitElement, css, html } from 'lit-element';

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

  static get properties() {
    return {
      state: { type: Boolean },
    };
  }

  firstUpdated() {
    if (this.state === undefined) this.state = false;
  }

  render() {
    return html`
      <div class="wrap">
        <div class="cover ${this.state ? 'active' : 'inactive'}"></div>
        <input type="checkbox" @click=${this.toggle} ?checked=${this.state} />
      </div>
    `;
  }

  toggle(e) {
    this.state = e.target.checked;

    const togEv = new CustomEvent('toggle', {
      detail: { state: this.state, letter: this.letter },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(togEv);
  }
}

customElements.define('tosc-button', PushButton);
