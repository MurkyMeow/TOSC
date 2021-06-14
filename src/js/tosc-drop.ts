import { LitElement, css, html, property } from 'lit-element';
import { pronouns } from './pronouns';

export interface TOSCdropChange {
  pronoun: string;
}

class TOSCdrop extends LitElement {
  static get styles() {
    return css`
      :host {
        position: relative;
        display: block;
        width: 100%;
      }

      #choosen {
        background-color: #ccc;
        border-radius: 5px;
        padding: 2px 10px;
        font-size: inherit;
        display: inline-block;
        margin-left: 5px;

        cursor: pointer;
        user-select: none;
        transition: background-color 0.2s;
      }

      :host(.active) #choosen {
        background-color: #eee;
      }

      #drop-down {
        opacity: 0;
        z-index: -999;

        position: absolute;
        top: 120%;
        left: 0;
        width: 100%;

        padding: 10px;
        border-radius: 5px;

        display: flex;
        flex-direction: column;
        height: 600px;
        overflow-y: auto;

        gap: 10px;
        box-sizing: border-box;
        transition: opacity 0.4s;
        box-shadow: 0 15px 5px 5px #00000020;

        background-color: #ddd;
      }

      :host(.active) #drop-down {
        opacity: 1;
        z-index: 2;
      }

      .pronoun {
        padding: 6px 15px;
        border-radius: 5px;
        background-color: #eee;

        user-select: none;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        min-height: 80px;
        box-sizing: border-box;
        transition: background-color 0.2s;
      }

      .pronoun:active {
        background-color: #fff;
      }
    `;
  }

  @property({ type: String }) choosen = '';
  @property({ type: Boolean }) active = false;

  firstUpdated() {
    this.addEventListener('blur', () => (this.active = false));
  }

  render() {
    return html`
      <div id="choosen" @click=${this.toggle}>
        ${this.choosen === '' ? 'pronoun' : this.choosen}
      </div>
      <div id="drop-down">
        ${pronouns.map(
          (pr) => html` <span class="pronoun" @click=${() => this.changePr(pr)}>${pr}</span> `
        )}
      </div>
    `;
  }

  show() {
    this.active = true;
    this.classList.add('active');
  }

  hide() {
    this.active = false;
    this.classList.remove('active');
  }

  toggle() {
    if (!this.active) this.show();
    else this.hide();
  }

  changePr(pronoun: string) {
    this.choosen = pronoun;
    this.hide();

    const changeEv = new CustomEvent<TOSCdropChange>('change', {
      detail: { pronoun: this.choosen },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(changeEv);
  }
}

customElements.define('tosc-drop', TOSCdrop);
