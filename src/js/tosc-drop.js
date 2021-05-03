import { LitElement, css, html } from 'lit-element';

class TOSCdrop extends LitElement {
  static get styles() {
    return css`
      :host {
        position: relative;
        display: block;
        width: 100%;
      }

      #drop-down {
        opacity: 0;

        position: absolute;
        top: 40px;
        left: 0;
        width: 100%;

        padding: 5px;
        border-radius: 5px;

        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        transition: opacity 0.4s;

        background-color: #444;
      }

      #drop-down.active {
        opacity: 1;
      }

      .pronoun {
        padding: 2px 5px;
        margin: 2px;
        background-color: #5b5b5b;
        border-radius: 5px;

        user-select: none;
        cursor: pointer;
      }

      .pronoun:focus-visible,
      .pronoun:hover {
        filter: brightness(1.2);
      }

      #choosen {
        background-color: #555555;
        border-radius: 5px;
        padding: 2px 10px;
        font-size: 15px;
        display: inline-block;
        margin-left: 5px;

        cursor: pointer;
        user-select: none;
      }

      #choosen:focus-visible,
      #choosen:hover {
        filter: brightness(1.2);
      }
    `;
  }

  static get properties() {
    return {
      choosen: { type: String },
      active: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.pronouns = [
      'ze/hir',
      'ze/zir',
      'she',
      'he',
      'they/them/themselves',
      'they/them/themself',
      'xey',
      'sie',
      'it',
      'ey',
      'e',
      'hu',
      'peh',
      'per',
      'thon',
    ];

    this.active = false;
  }

  firstUpdated() {
    this.dropdown = this.shadowRoot.querySelector('#drop-down');
    this.dropdown.addEventListener('mouseleave', () => {
      this.active = false;
    });
  }

  render() {
    return html`
      <div id="choosen" @click=${this.toggle}>${this.choosen === '' ? 'pronun' : this.choosen}</div>
      <div id="drop-down" class="${this.active ? 'active' : ''}">
        ${this.pronouns.map((pr) => html` <span class="pronoun" @click=${() => this.changePr(pr)}>${pr}</span> `)}
      </div>
    `;
  }

  toggle() {
    this.active = !this.active;
  }

  changePr(newPr) {
    this.choosen = newPr;

    const changeEv = new CustomEvent('change', {
      detail: { pronoun: this.choosen },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(changeEv);
  }
}

customElements.define('tosc-drop', TOSCdrop);
