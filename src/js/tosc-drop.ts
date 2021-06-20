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
        background: #eee;
      }

      .list {
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0 0;
        margin: 0;
      }

      :host(:not(.active)) .list {
        display: none;
      }

      .pronoun {
        margin-right: 8px;
        margin-bottom: 8px;
        padding: 5px 12px;
        border-radius: 5px;
        background: #eee;

        user-select: none;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .pronoun:active {
        background: #fff;
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
      <ul class="list" role="menu">
        ${pronouns.map(
          (pr) =>
            html`<li class="pronoun" @click=${() => this.changePr(pr)} role="menuitem">${pr}</li>`
        )}
      </ul>
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
    });
    this.dispatchEvent(changeEv);
  }
}

customElements.define('tosc-drop', TOSCdrop);
