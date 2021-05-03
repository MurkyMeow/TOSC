import { LitElement, css, html } from 'lit-element';
import { clamp } from './clamp.js';

class ToscScroll extends LitElement {
  static get styles() {
    return css`
      :host {
        --red: #b02323;
        --blue: #5523f0;
        --green: #23b033;

        --text-size: 35px;

        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
      }

      :host::before {
        content: '';

        position: absolute;
        left: calc(50% - 40px);
        top: calc(50% - 1.35 * var(--text-size) / 2);

        width: 80px;
        height: calc(1.35 * var(--text-size));

        background-color: #4444446a;
        border-radius: 5px;
        box-sizing: border-box;
      }

      #scroll {
        transform: translateY(0);
        transition: 0.1s;
        height: 100%;
        width: 100%;

        overflow-y: scroll;
        scrollbar-width: none;
      }

      #scroll::-webkit-scrollbar {
        display: none;
      }

      #scroll.extra .pick::before {
        content: '';
        width: calc(1.2 * var(--text-size));
        height: calc(1.2 * var(--text-size));
        border: 2px solid transparent;
        position: absolute;
        border-radius: 100%;
        top: calc(50% - 1.2 * var(--text-size) / 2);
        left: calc(50% - 1.2 * var(--text-size) / 2);
        box-sizing: border-box;
      }

      #scroll.extra .pick#red::before {
        border-color: var(--red);
      }

      #scroll.extra .pick#blue::before {
        border-color: var(--blue);
      }

      #scroll.extra .pick#green::before {
        border-color: var(--green);
      }

      .pick.void {
        height: calc((400px - var(--text-size)) / 2);
      }

      .pick {
        user-select: none;
        position: relative;
        font-size: var(--text-size);
        height: var(--text-size);

        display: flex;
        justify-content: center;
        align-items: center;
      }

      .pick#red {
        color: var(--red);
      }

      .pick#blue {
        color: var(--blue);
        margin: var(--text-size) 0;
      }

      .pick#green {
        color: var(--green);
      }
    `;
  }

  static get properties() {
    return {
      letter: { type: String },
      active: { type: String },
      extra: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.cur = 0;
  }

  firstUpdated() {
    if (this.active === undefined) this.active = 'blue';
    if (this.letter === undefined) this.letter = '?';
    if (this.extra === undefined) this.extra = false;

    this.scroll = this.shadowRoot.querySelector('#scroll');

    this.addEventListener('touchmove', this.scrolling);

    this.addEventListener('wheel', this.scrolling);

    /* enables dragabillity for scrolls */
    this.addEventListener('mousedown', (e) => {
      this.isMDown = true;
      this.startY = e.pageY - this.offsetTop - this.scroll.offsetTop;
      this.scrollUp = this.cur;
    });

    this.addEventListener('mouseup', () => {
      this.isMDown = false;
      //delya cuz click is happaning a bit later
      setTimeout(() => (this.block = false), 100);
    });

    this.addEventListener('mouseleave', () => {
      this.isMDown = false;
      this.block = false;
    });

    this.addEventListener('mousemove', (e) => {
      if (!this.isMDown) return;
      e.preventDefault();

      const y = e.pageY - this.offsetTop - this.scroll.offsetTop;
      const scroll = y - this.startY;

      if (Math.abs(scroll) < 10) return;
      this.block = true;

      const pos = clamp(this.scrollUp - scroll, this.top, this.bottom);
      this.updateScroll(pos);

      const letId = this.getLetId(pos);
      if (letId !== this.curLetId) {
        this.curLetId = letId;
        this.updateValue();
      }

      this.stableLetter(pos);
    });

    /* enables dragabillity for scrolls */

    this.letSize = parseInt(getComputedStyle(this).getPropertyValue('--text-size'), 10);
    //5 cuz 3 from each letter and extra 2 from margin. And 3 cuz ther is 3 letters
    this.blockSize = this.letSize * (5 / 3);
    this.bottom = this.scroll.offsetHeight / 2;
    this.top = 0;

    this.cur = this.letterPos(this.active);
    this.updateScroll(this.cur);
  }

  render() {
    return html`
      <div id="scroll" class=${this.extra ? 'extra' : ''}>
        <div class="pick void"></div>
        <div class="pick" id="red" @click=${this.chooseMe}>${this.letter}</div>
        <div class="pick" id="blue" @click=${this.chooseMe}>${this.letter}</div>
        <div class="pick" id="green" @click=${this.chooseMe}>${this.letter}</div>
        <div class="pick void"></div>
      </div>
    `;
  }

  letterPos(color) {
    switch (color) {
      case 'red':
        return 0;
      case 'blue':
        return 2 * this.letSize;
      case 'green':
        return this.bottom;
      default:
        throw new Error(`Unknown color: ${color}`);
    }
  }

  chooseMe(e) {
    if (this.block) return;
    const who = e.currentTarget.id;
    this.updateScroll(this.letterPos(who));
    this.updateValue();
  }

  updateValue() {
    const newVal = ['red', 'blue', 'green'][this.getLetId(this.cur, 0)];
    if (newVal === this.active) return;
    this.active = newVal;

    const updateEv = new CustomEvent('update', {
      detail: { extra: this.extra, color: this.active, letter: this.letter },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(updateEv);
  }

  //because !
  getLetId(pos) {
    const blockSize = (this.letSize * 5) / 3;
    if (pos < blockSize) return 0;
    else if (pos < 2 * blockSize) return 1;
    return 2;
  }

  updateScroll(pos) {
    this.cur = pos;
    this.scroll.scrollTo(0, this.cur); //Maybe add a cycle to smooth it?
  }

  scrolling() {
    this.cur = this.scroll.scrollTop;
    this.updateValue();
    this.stableLetter(this.cur);
  }

  stableLetter(pos) {
    clearTimeout(this.stabletm);
    this.stabletm = setTimeout(() => this.stabilize(pos, 0), 600);
  }

  stabilize(pos, direction) {
    const letId = this.getLetId(pos, direction); //yep it is junky!
    const stablePos = this.letterPos(['red', 'blue', 'green'][letId]);
    this.updateScroll(stablePos);
    this.updateValue();
  }
}

customElements.define('tosc-scroll', ToscScroll);
