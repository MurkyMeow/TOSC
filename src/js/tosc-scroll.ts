import { LitElement, property, css, html } from 'lit-element';
import { LetterColor, TOSC } from './tosc';

import './tosc-button';

export class ToscScroll extends LitElement {
  static get styles() {
    return css`
      :host {
        --red: #b02323;
        --blue: #5523f0;
        --green: #23b033;

        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        padding: 10px 0;

        --pick-size: 1.5em;
      }

      #scroll {
        height: calc(var(--pick-size) * 3);
        overflow-y: scroll;
        scrollbar-width: none;
      }
      #scroll::-webkit-scrollbar {
        display: none;
      }
      #scroll.extra .pick {
        border-color: var(--pick-color);
      }

      .void-pick {
        height: var(--pick-size);
      }
      .pick {
        color: var(--pick-color);
        user-select: none;
        position: relative;

        width: var(--pick-size);
        height: var(--pick-size);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        border: 3px solid transparent;
        box-sizing: border-box;
      }
      .pick#red {
        --pick-color: var(--red);
      }
      .pick#blue {
        --pick-color: var(--blue);
        margin: var(--font-size) 0;
      }
      .pick#green {
        --pick-color: var(--green);
      }

      .extra-btn {
        margin-top: 10px;
        width: 100%;
        height: 30px;
      }
    `;
  }

  @property({ type: String }) letter: keyof TOSC = 'O';
  @property({ type: String }) active: LetterColor = LetterColor.blue;
  @property({ type: Boolean }) extra = false;

  cur = 0;
  block = false;
  scrollEl: HTMLElement | null = null;

  bottom = 0;
  stabletm = -1;

  get letterSize(): number {
    const style = getComputedStyle(this);

    const fontSize = Number(style.getPropertyValue('font-size').replace('px', ''));
    const pickSize = Number(style.getPropertyValue('--pick-size').replace('em', ''));

    return fontSize * pickSize;
  }

  constructor() {
    super();
    this.scrolling = this.scrolling.bind(this);
  }

  firstUpdated() {
    this.scrollEl = this.renderRoot.querySelector('#scroll');

    if (!this.scrollEl) {
      throw new Error('could not find scroll');
    }

    this.scrollEl.addEventListener('scroll', this.scrolling);

    /* enables dragabillity for scrolls */
    this.addEventListener('mousedown', (e) => {
      const startY = e.pageY;
      const startScroll = this.cur;

      const onMouseUp = () => {
        removeListeners();
        //delya cuz click is happaning a bit later
        setTimeout(() => (this.block = false), 100);
      };

      const onMouseLeave = () => {
        removeListeners();
        this.block = false;
      };

      const onMouseMove = (moveEvent: MouseEvent) => {
        moveEvent.preventDefault();

        const scroll = moveEvent.pageY - startY;

        if (Math.abs(scroll) < 10) return;
        this.block = true;

        const pos = startScroll - scroll;
        this.updateScroll(pos);

        this.updateValue();

        this.stabilize();
      };

      this.addEventListener('mousemove', onMouseMove);
      this.addEventListener('mouseup', onMouseUp);
      this.addEventListener('mouseleave', onMouseLeave);

      const removeListeners = () => {
        this.removeEventListener('mousemove', onMouseMove);
        this.removeEventListener('mouseup', onMouseUp);
        this.removeEventListener('mouseleave', onMouseLeave);
      };
    });

    this.bottom = this.scrollEl.scrollHeight;

    this.cur = this.letterPos(this.active);
    this.updateScroll(this.cur);
    // add smooth scrolling AFTER the initial scroll position was set
    this.scrollEl.style.setProperty('scroll-behavior', 'smooth');
  }

  letterPos(color: string): number {
    switch (color) {
      case 'red':
        return 0;
      case 'blue':
        return 2 * this.letterSize;
      case 'green':
        return this.bottom;
      default:
        throw new Error(`Unknown color: ${color}`);
    }
  }

  chooseMe(who: string) {
    if (this.block) return;

    if (who === this.active) {
      this.dispatchEvent(new CustomEvent('highlight'));
    } else {
      this.updateScroll(this.letterPos(who));
    }
  }

  updateValue() {
    const newVal = [LetterColor.red, LetterColor.blue, LetterColor.green][
      this.getLetterId(this.cur)
    ];
    if (newVal === this.active) return;
    this.active = newVal;

    this.dispatchEvent(new CustomEvent('update'));
  }

  toggleExtra() {
    this.extra = !this.extra;
    this.dispatchEvent(new CustomEvent('update'));
  }

  //because !
  getLetterId(pos: number): number {
    const { letterSize } = this;
    if (pos < letterSize) return 0; // the first letter's height
    if (pos < letterSize * 3) return 1; // spacing + the second letter's height
    return 2;
  }

  updateScroll(pos: number): void {
    this.cur = pos;
    this.scrollEl?.scrollTo(0, this.cur); //Maybe add a cycle to smooth it?
  }

  scrolling(): void {
    this.cur = this.scrollEl?.scrollTop || 0;
    this.updateValue();
    this.stabilize();
  }

  stabilize(): void {
    window.clearTimeout(this.stabletm);
    this.stabletm = window.setTimeout(() => {
      const letterId = this.getLetterId(this.cur); //yep it is junky!
      const stablePos = this.letterPos(['red', 'blue', 'green'][letterId]);
      this.updateScroll(stablePos);
      this.updateValue();
    }, 600);
  }

  render() {
    return html`
      <div id="scroll" class=${this.extra ? 'extra' : ''}>
        <div class="void-pick"></div>
        ${['red', 'blue', 'green'].map(
          (color) => html`
            <div class="pick" id=${color} @click=${() => this.chooseMe(color)}>${this.letter}</div>
          `
        )}
        <div class="void-pick"></div>
      </div>
      <tosc-button class="extra-btn" .state=${this.extra} @toggle=${this.toggleExtra}></tosc-button>
    `;
  }
}

customElements.define('tosc-scroll', ToscScroll);
