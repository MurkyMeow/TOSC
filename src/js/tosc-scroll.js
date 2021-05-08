import { LitElement, css, html } from 'lit-element';

class ToscScroll extends LitElement {
    static get styles() {
        return css`
            :host {
                --red: #b02323;
                --blue: #5523f0;
                --green: #23b033;
                --holder-bg-color: #ccc;

                --font-size: inherit;

                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: relative;
                padding: 10px 0;
            }

            :host::before {
                content: '';
                --holder-width: calc(2.35 * var(--font-size));
                --holder-height: calc(1.35 * var(--font-size));

                position: absolute;
                left: calc(50% - var(--holder-width) / 2);
                top: calc(50% - var(--holder-height) / 2);

                width: var(--holder-width);
                height: var(--holder-height);

                background-color: var(--holder-bg-color);
                border-radius: 5px;
                box-sizing: border-box;
            }

            #scroll {
                height: 100%;
                width: 100%;

                overflow-y: scroll;
                scrollbar-width: none;
                scroll-behavior: smooth;
            }

            #scroll::-webkit-scrollbar {
                display: none;
            }

            #scroll.extra .pick::before {
                content: '';
                width: calc(1.2 * var(--font-size));
                height: calc(1.2 * var(--font-size));
                border: 5px solid transparent;
                position: absolute;
                border-radius: 100%;
                top: calc(50% - 1.2 * var(--font-size) / 2);
                left: calc(50% - 1.2 * var(--font-size) / 2);
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
                height: calc((100% - var(--font-size)) / 2);
            }

            .pick {
                user-select: none;
                position: relative;
                font-size: var(--font-size);
                height: var(--font-size);

                display: flex;
                justify-content: center;
                align-items: center;
            }

            .pick#red {
                color: var(--red);
            }

            .pick#blue {
                color: var(--blue);
                margin: var(--font-size) 0;
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
        this.scrolling = this.scrolling.bind(this);
        this.active = 'blue';
        this.letter = '?';
        this.extra = false;
    }

    firstUpdated() {
        this.scroll = this.shadowRoot.querySelector('#scroll');

        this.scroll.addEventListener('scroll', this.scrolling);

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

            const onMouseMove = (moveEvent) => {
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

        this.letterSize = parseInt(getComputedStyle(this).getPropertyValue('--font-size'), 10);
        this.bottom = this.scroll.scrollHeight;

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
                return 2 * this.letterSize;
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
        const newVal = ['red', 'blue', 'green'][this.getLetterId(this.cur)];
        if (newVal === this.active) return;
        this.active = newVal;

        const updateEv = new CustomEvent('update', {
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(updateEv);
    }

    //because !
    getLetterId(pos) {
        const { letterSize } = this;
        if (pos < letterSize) return 0; // the first letter's height
        if (pos < letterSize * 3) return 1; // spacing + the second letter's height
        return 2;
    }

    updateScroll(pos) {
        this.cur = pos;
        this.scroll.scrollTo(0, this.cur); //Maybe add a cycle to smooth it?
    }

    scrolling() {
        this.cur = this.scroll.scrollTop;
        this.updateValue();
        this.stabilize();
    }

    stabilize() {
        clearTimeout(this.stabletm);
        this.stabletm = setTimeout(() => {
            const letterId = this.getLetterId(this.cur); //yep it is junky!
            const stablePos = this.letterPos(['red', 'blue', 'green'][letterId]);
            this.updateScroll(stablePos);
            this.updateValue();
        }, 600);
    }
}

customElements.define('tosc-scroll', ToscScroll);
