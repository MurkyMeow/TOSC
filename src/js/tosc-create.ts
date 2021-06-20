import { LitElement, css, html, property } from 'lit-element';
import { hints } from './hints';
import './push-button';
import './tosc-scroll';
import './tosc-avatar';
import './tosc-drop';
import { Person } from './types';
import { ToscAvatarNewAvatar } from './tosc-avatar';
import { TOSCdropChange } from './tosc-drop';
import { ToscScroll } from './tosc-scroll';
import { TOSC, LetterColor, toscMap } from './tosc';

class TOSCcreate extends LitElement {
  static get styles() {
    return css`
      :host {
        padding: 20px 10px;
      }

      .personal {
        display: flex;
      }
      .personal-fields {
        width: 100%;
      }

      .avatar {
        width: 80px;
        height: 80px;
      }

      .name {
        background: transparent;
        border: none;
        border-bottom: 5px solid silver;
        color: #222;
        display: block;

        font: inherit;
        width: 100%;
        margin: 0 0 15px;

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
        margin-bottom: 30px;
      }

      .scrolls {
        font-size: 35px;
        display: flex;
        width: 100%;
        justify-content: space-around;
        margin-bottom: 20px;
      }

      .scroll {
        margin: 0 20px;
      }

      #button {
        width: 200px;
        padding: 10px;
        margin: 0 auto;
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
          src=${this.me.avatar}
          @new-avatar=${this.updateAvatar}
        ></tosc-avatar>
        <div class="personal-fields">
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
          ${toscMap(
            this.me.tosc,
            (letter, opts) => html`
              <tosc-scroll
                class="scroll"
                .active=${opts.color}
                .extra=${opts.extra}
                .letter=${letter}
                @update=${this.showHint}
                @highlight=${this.showHint}
              ></tosc-scroll>
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

  updateHint(letter: keyof TOSC, color: LetterColor, extra: boolean): void {
    this.hint = hints[letter][color][extra ? 0 : 1];
  }

  showHint(e: { currentTarget: ToscScroll }): void {
    const { active, letter, extra } = e.currentTarget;
    this.me.tosc[letter].color = active;
    this.dispatchUpdate({ ...this.me });
    this.updateHint(letter, active, extra);
  }

  toggleExtra(letter: keyof TOSC, state: boolean) {
    const color = this.me.tosc[letter].color;
    this.me.tosc[letter].extra = state;
    this.dispatchUpdate({ ...this.me });
    this.updateHint(letter, color, state);
  }

  switch() {
    this.dispatchEvent(new CustomEvent('button'));
  }
}

customElements.define('tosc-create', TOSCcreate);
