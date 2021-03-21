import { LitElement, css, html } from 'lit-element'

class ToscScroll extends LitElement {
  static get styles() {
    return css`
      :host {
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;

        --red: #B02323;
        --blue: #5523F0;
        --green: #23B033;
      }

      :host::after {
        content: '';

        position: absolute;
        left: calc(50% - 20px);
        top: calc(50% - 11px);

        width: 40px;
        height: 22px;

        border: 1px solid silver;
        border-left: none;
        border-right: none;
        box-sizing: border-box;
      }

      #scroll {
        transform: translateY(0);
        transition: .1s;
        display: flex;
        flex-direction: column;
        height: 80px;
        justify-content: space-around;
      }

      #scroll.extra .pick::before {
        content: '';
        width: 20px;
        height: 20px;
        border: 1px solid transparent;
        position: absolute;
        border-radius: 100%;
        top: calc(50% - 10px);
        left: calc(50% - 10px);
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
    //letter should be passed
    //this.active = "blue"; //blue is active by default
    //this.extra = false;

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
    this.addEventListener('mousemove', this.dragMe);
    this.addEventListener('touchmove', this.dragMe);

    this.letSize = this.scroll.offsetHeight / 3;
    this.bottom = -this.letSize;
    this.top = this.letSize;

    this.cur = this.letterPos(this.active);
    this.updateScroll(this.cur);

    this.skipper = 0;
    this.latestStable = this.cur;
  }

  render() {
    return html`
      <div id='scroll' class=${this.extra ? 'extra' : ''}>
        <div class='pick' id='red' 
          @click=${this.chooseMe}>${this.letter}</div>
        <div class='pick' id='blue' @click=${this.chooseMe}>${this.letter}</div>
        <div class='pick' id='green' @click=${this.chooseMe}>${this.letter}</div>
      </div>
  `;
  }

  dragMe(e) {
    if (e.buttons != 1) return;
    if (++this.skipper < 10)
      return;
    this.skipper = 0;

    const relativeY = e.clientY - this.offsetTop;
    let pos = -this.cur-(this.scroll.offsetHeight - relativeY - this.letSize);
    if (pos > this.top)
      pos = this.top;
    else if (pos < this.bottom)
      pos = this.bottom;

    if (pos != this.cur) {
      this.updateScroll(pos);
      clearTimeout(this.latestTo);
      this.latestTo = setTimeout(() => {
        this.latestStable = this.cur;
      }, 100);
    }
  }

  letterPos(color) {
    switch (color) {
      case "red": return this.top;
      case "blue": return 0;
      case "green": return this.bottom;
    }
  }

  chooseMe(e) {
    const who = e.currentTarget.id;
    this.updateScroll(this.letterPos(who));
    this.updateValue();
  }

  updateValue() {
    this.active = ["red", "blue", "green"][this.getLetId(this.cur, 0)];
    console.log(this.active);
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
    let newPos = this.cur + e.deltaY / 10;

    if (newPos > this.top)
      newPos = this.top;
    else if (newPos < this.bottom)
      newPos = this.bottom;

    if (newPos != this.cur) {
      this.updateScroll(newPos);

      clearTimeout(this.stabletm);
      this.stabletm = setTimeout(() => this.stabilize(newPos, e.deltaY < 0), 600);
    }
  }

  stabilize(pos, direction) {
    const letId = this.getLetId(pos, direction);
    const stablePos = (1 - letId) * this.letSize;
    this.updateScroll(stablePos);
    this.updateValue();
  }
}

customElements.define('tosc-scroll', ToscScroll);
