import { LitElement, css, html } from 'lit-element';
import './tosc-list.js';
import './tosc-create.js';
import { TOSC } from './tosc.js';

const examples = [
  { name: 'Example 0', pronoun: 'xey', tosc: new TOSC('RG+B+B+') },
  { name: 'Example 1', pronoun: 'sie', tosc: new TOSC('RGBB') },
  { name: 'Example 2', pronoun: 'he', tosc: new TOSC('RR+GG') },
  {
    name: 'Example 3',
    pronoun: 'they/them/themselves',
    tosc: new TOSC('G+G+GG+'),
  },
  { name: 'Example 4', pronoun: '', tosc: new TOSC('RBGR+') },
  { name: 'Example 5', pronoun: 'sie', tosc: new TOSC('G+RGG+') },
  { name: 'Example 6', pronoun: '', tosc: new TOSC('R+G+G+G+') },
  { name: 'Example 7', pronoun: 'xey', tosc: new TOSC('B+R+G+G') },
  { name: 'Example 8', pronoun: 'ze/hir', tosc: new TOSC('B+RGG') },
  { name: 'Example 9', pronoun: 'she', tosc: new TOSC('RBB+B') },
];

class TOSCapp extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        width: 500px;
        height: 800px;
        margin: auto;
      }

      .container {
        /*background-color: #444569;*/
        background-color: #1e1e2e;
        border-radius: 10px;

        width: 100%;
        height: 100%;
        padding: 5px;
      }
    `;
  }

  static get properties() {
    return {
      showList: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.me = {
      name: 'Guest32432989',
      pronoun: '',
      tosc: new TOSC('BBBB'),
    };
    this.hint = '';
    //this.showList = true;
    this.showList = false;
  }

  render() {
    return this.showList ? this.renderList() : this.renderCreate();
  }

  renderList() {
    return html`
      <div class="container">
        <tosc-list .me=${this.me} .list=${examples} @switch=${this.changeScreen}></tosc-list>
      </div>
    `;
  }

  renderCreate() {
    return html`
      <div class="container">
        <tosc-create .me=${this.me} @button=${this.changeScreen} @update=${this.updateMe}></tosc-create>
      </div>
    `;
  }

  changeScreen() {
    this.showList = !this.showList;
  }
}

customElements.define('tosc-app', TOSCapp);
