import { LitElement, css, html } from 'lit-element'
import { clamp } from './clamp.js'

class ToscScroll extends LitElement {
  static get styles() {
    return css`
      :host {
        --red: #B02323;
        --blue: #5523F0;
        --green: #23B033;

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

        /*border: 1px solid silver;
        border-left: none;
        border-right: none;
        */
        background-color: #4444446a;
        border-radius: 5px;
        box-sizing: border-box;
      }

      #scroll {
        transform: translateY(0);
        transition: 0.1s;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 66.666%;
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

      .pick {
        user-select: none;
        position: relative;
        font-size: var(--text-size);
      }

      .pick#red {
        color: var(--red);
      }

      .pick#blue {
        color: var(--blue);
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
    }
  }

  constructor() {
    super();
    this.cur = 0;
  }

  firstUpdated() {
    if (this.active === undefined)
      this.active = "blue";
    if (this.letter === undefined)
      this.letter = "?";
    if (this.extra === undefined)
      this.extra = false;

    this.scroll = this.shadowRoot.querySelector("#scroll");

    this.addEventListener('wheel', this.scrolling);

    /* enables dragabillity for scrolls */
    this.addEventListener('mousedown', (e) => {
      this.isMDown = true;
      this.startY = e.pageY - this.offsetTop - this.scroll.offsetTop;
      this.scrollUp = this.cur;
    });

    this.addEventListener('mouseup', () => {
      this.isMDown = false;
    });

    this.addEventListener('mouseleave', () => {
      this.isMDown = false;
    });

    this.addEventListener('mousemove', (e) => {
      if (!this.isMDown) return;
      e.preventDefault();

      const y = e.pageY - this.offsetTop - this.scroll.offsetTop;
      const scroll = this.startY - y;

      if (!this.block && Math.abs(scroll) < 10)
        return;

      const pos = clamp(this.scrollUp - scroll, this.bottom, this.top);
      this.updateScroll(pos);

      const letId = this.getLetId(pos);
      if (letId != this.curLetId) {
        this.curLetId = letId;
        this.updateValue();
      }

      clearTimeout(this.blockTo);
      this.blockTo = setTimeout(() => this.block = false, 300);
      this.stableLetter(pos);
    });
    /* enables dragabillity for scrolls */

    this.letSize = this.scroll.offsetHeight / 3;
    this.bottom = -this.letSize;
    this.top = this.letSize;

    this.cur = this.letterPos(this.active);
    this.updateScroll(this.cur);
  }

  render() {
    return html`
      <div id='scroll' class=${this.extra ? 'extra' : ''}>
        <div class='pick' id='red' @click=${this.chooseMe}>${this.letter}</div>
        <div class='pick' id='blue' @click=${this.chooseMe}>${this.letter}</div>
        <div class='pick' id='green' @click=${this.chooseMe}>${this.letter}</div>
      </div>
  `;
  }

  letterPos(color) {
    switch (color) {
      case "red": return this.top;
      case "blue": return 0;
      case "green": return this.bottom;
    }
  }

  chooseMe(e) {
    if (this.block) return;
    const who = e.currentTarget.id;
    this.updateScroll(this.letterPos(who));
    this.updateValue();
  }

  updateValue() {
    this.active = ["red", "blue", "green"][this.getLetId(this.cur, 0)];

    const updateEv = new CustomEvent('update', {
      detail: { extra: this.extra, color: this.active, letter: this.letter },
      bubbles: true,
      composed: true });
    this.dispatchEvent(updateEv);
  }

  //to get more intuitive stabalization - rework it to calculate
  //distance between line rather than center of the scroll element.
  getLetId(pos, direction) {
    if (pos < 0) //or do this shitty calculation
      return (pos < -this.letSize / 2) ? 2 : 1;
    else
      return (pos > this.letSize / 2) ? 0 : 1;
    //let toAbs = this.scroll.offsetHeight / 2 - pos - this.top / 2;
    //if (toAbs < 0) toAbs = 0;
    //const aprox = (toAbs) / this.letSize;
    //return (direction ? Math.ceil(aprox) : Math.floor(aprox));
  }

  updateScroll(pos) {
    this.cur = pos;
    this.scroll.style.transform = `translateY(${pos}px)`;
  }

  scrolling(e) {
    let newPos = this.cur + e.deltaY / 2;

    if (newPos > this.top)
      newPos = this.top;
    else if (newPos < this.bottom)
      newPos = this.bottom;

    if (newPos != this.cur) {
      this.updateScroll(newPos);
      this.stableLetter(newPos);
    }
  }

  stableLetter(pos) {
    clearTimeout(this.stabletm);
    this.stabletm = setTimeout(() => this.stabilize(pos, 0), 600);
  }

  stabilize(pos, direction) {
    const letId = this.getLetId(pos, direction);
    const stablePos = (1 - letId) * this.letSize;
    this.updateScroll(stablePos);
    this.updateValue();
  }
}

customElements.define('tosc-scroll', ToscScroll);
