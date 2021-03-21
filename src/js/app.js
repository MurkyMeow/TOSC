import { LitElement, css, html } from 'lit-element'
import './tosc-scroll.js'
import './tosc-button.js'

const pronouns = [ 'ze/hir', 'ze/zir', 'she', 'he', 'they/them/themselves',
  'they/them/themself', 'xey', 'sie', 'it', 'ey', 'e', 'hu', 'peh', 'per', 'thon' ];

class TOSC extends LitElement {
  static get styles() {
    return css`
      .container {

        background-color: #232329;
        border-radius: 10px;

        flex-direction: column;
        width: 350px;
        height: 300px;
      }

      .name {
        background: transparent;
        border: none;
        border-bottom: 2px solid pink;
        color: #eee;
        margin-bottom: 10px;
        display: block;
      }

      .pronoun {
        background: #aaaaaa5a;
        padding: 3px;
        border-radius: 5px;
        display: inline-block;
        margin-bottom: 20px;
      }

      .hint {
        text-align: center;
        font-size: 30px;
      }

      .controls {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .scrolls, .extra {
        display: flex;
      }

      tosc-scroll {
        width: 70px;
        height: 150px;
      }

      tosc-button {
        margin: 0 10px;
        margin-top: 10px;
        width: 50px;
        height: 20px;
      }

    `;
  }

  static get properties() {
    return {
    };
  }

  constructor() {
    super();
    this.name = 'demiler';
    this.pronoun = 'he';
    this.hint = 'This is the hint';
    this.tosk = { 
      "T": ["blue", false],
      "O": ["blue", false],
      "S": ["red", true],
      "K": ["green", true],
    };
  }

  render() {
    return html`
      <div class='container'>
        <input class='name' value=${this.name}>
        <div class='pronoun'>${this.pronoun}</div>

        <div class='hint'>${this.hint}</div>

        <div class='controls'>
          <div class='scrolls'>
            ${["T", "O", "S", "K"].map(el => html`
              <tosc-scroll .active=${this.tosk[el][0]} .extra=${this.tosk[el][1]}
                .letter=${el}></tosc-scroll>
            `)}
          </div>
          <div class='extra'>
            ${["T", "O", "S", "K"].map(el => html`
              <tosc-button .letter=${el} .state=${this.tosk[el][1]}
                @toggle=${this.toggleExtra}></tosc-button>
            `)}
          </div>
        </div>
      </div>
    `;
  }

  toggleExtra(e) {
    this.tosk[e.detail.letter][1] = e.detail.state;
    console.log(this.tosk);
    this.requestUpdate();
  }
};

customElements.define('tosc-app', TOSC);
