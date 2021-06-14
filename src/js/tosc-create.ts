import { LitElement, css, html, property } from 'lit-element';
import { hints } from './hints';
import './tosc-button';
import './push-button';
import './tosc-scroll';
import './tosc-avatar';
import './tosc-drop';
import { Person } from './types';
import { ToscButtonToggle } from './tosc-button';
import { ToscAvatarNewAvatar } from './tosc-avatar';
import { TOSCdropChange } from './tosc-drop';
import { ToscScroll } from './tosc-scroll';

class TOSCcreate extends LitElement {
  static get styles() {
    return css`
      :host {
        display: grid;
        height: 100%;
        width: 100%;
        grid-template-rows: 250px 15vh auto 200px;

        padding: 0 10px;
        box-sizing: border-box;
      }

      .personal {
        margin-top: 20px;
        display: flex;
        gap: 20px;
      }

      .avatar {
        --size: 250px;
        min-width: var(--size);
        min-height: var(--size);
        width: var(--size);
        height: var(--size);
      }

      .personal-wrap {
        display: block;
        width: 100%;
        box-sizing: border-box;
      }

      .name {
        background: transparent;
        border: none;
        border-bottom: 5px solid silver;
        color: #222;
        display: block;

        font-size: inherit;
        width: 100%;
        margin: 20px 0;

        outline: none;
        box-sizing: border-box;
      }

      .name:focus-visible {
        border-color: pink;
      }

      .pronoun {
        display: inline-block;
      }

      .hint {
        text-align: center;
        font-size: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
      }

      .controls {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        place-content: center;
      }

      .scrolls,
      .extra {
        display: flex;
        width: 100%;
        justify-content: space-around;
      }

      .scrolls {
        /*background-color: rgba(0, 0, 0, 0.37);*/
        margin-bottom: 20px;
        --font-size: 50px;
      }

      tosc-scroll {
        --font-size: 80px;
      }

      tosc-button {
        margin-top: 3vh;
        width: 15vw;
        height: 3vh;
      }

      #button {
        width: 40%;
        height: 50%;
        place-self: center;
      }
    `;
  }

  @property({ type: String }) hint: string = '';
  @property({ type: Object }) me!: Person;

  render() {
    return html`
      <div class="personal">
        <tosc-avatar
          class="avatar"
          avatar=${this.me.avatar}
          @new-avatar=${this.updateAvatar}
        ></tosc-avatar>
        <div class="personal-wrap">
          <input
            class="name"
            spellcheck="false"
            value=${this.me.name}
            @change=${this.changeName}
            @keyup=${this.blurName}
          />
          <tosc-drop
            class="pronoun"
            .choosen=${this.me.pronoun}
            @change=${this.changePr}
          ></tosc-drop>
        </div>
      </div>

      <div class="hint">${this.hint}</div>

      <div class="controls">
        <div class="scrolls">
          ${this.me.tosc.map(
            (el) => html`
              <tosc-scroll
                .active=${el.color}
                .extra=${el.extra}
                .letter=${el.letter}
                @update=${this.showHint}
                @highlight=${this.showHint}
              ></tosc-scroll>
            `
          )}
        </div>
        <div class="extra">
          ${this.me.tosc.map(
            (el) => html`
              <tosc-button
                .state=${el.extra}
                @toggle=${(e: CustomEvent<ToscButtonToggle>) =>
                  this.toggleExtra(el.letter, e.detail.state)}
              ></tosc-button>
            `
          )}
        </div>
      </div>

      <push-button id="button" @click=${this.switch}>Go back</push-button>
    `;
  }

  dispatchUpdate(me: Person) {
    this.dispatchEvent(new CustomEvent('update', { detail: me }));
  }

  updateAvatar(e: CustomEvent<ToscAvatarNewAvatar>) {
    this.dispatchUpdate({ ...this.me, avatar: e.detail.avatar });
  }

  blurName(e: KeyboardEvent & { target: HTMLInputElement }): void {
    if (e.keyCode === 13) e.target.blur();
  }

  changePr(e: CustomEvent<TOSCdropChange>): void {
    this.dispatchUpdate({ ...this.me, pronoun: e.detail.pronoun });
  }

  changeName(e: { target: HTMLInputElement }): void {
    this.dispatchUpdate({ ...this.me, name: e.target.value });
  }

  updateHint(letter: string, color: string, extra: boolean): void {
    this.hint = hints[letter][color][Number(extra)];
  }

  showHint(e: { currentTarget: ToscScroll }): void {
    const { active, letter, extra } = e.currentTarget;
    this.me.tosc[letter].color = active;
    this.dispatchUpdate({ ...this.me });
    this.updateHint(letter, active, extra);
  }

  toggleExtra(letter: string, state: boolean) {
    const color = this.me.tosc[letter].color;
    this.me.tosc[letter].extra = estate;
    this.dispatchUpdate({ ...this.me });
    this.updateHint(letter, color, state);
  }

  switch() {
    this.dispatchEvent(new CustomEvent('button'));
  }
}

customElements.define('tosc-create', TOSCcreate);
