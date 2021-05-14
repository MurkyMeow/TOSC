import { LitElement, css, html } from 'lit-element';
import { api } from './serverAPI';
import { isMobile } from './isMobile';
import * as utils from './utils.js';
import { TOSC } from './tosc';
import { examples } from './example';
import './tosc-list';
import './tosc-create';
import './tosc-list-landscape';

class TOSCapp extends LitElement {
    static get styles() {
        return css`
            :host {
                display: block;
                margin: auto;
                /*background-color: #444569;*/
                /*background-color: #1e1e2e;*/
                background-color: #ddd;
                color: #222;
                border-radius: 10px;
                font-family: sans;

                height: 100%;
                width: 100%;
            }

            #joinroom {
                display: flex;
                flex-direction: column;
                height: 100%;

                align-items: center;
                justify-content: center;
                text-align: center;
                padding: 50px;
            }

            :host > * {
                --font-size: 20pt;
                font-size: var(--font-size);
            }

            @media (hover: none) and (pointer: coarse) {
                /*mobile*/
                :host > * {
                    --font-size: 50px;
                    font-size: var(--font-size);
                }
            }
        `;
    }

    static get properties() {
        return {
            showList: { type: Boolean },
            people: { type: Array, attribute: false },
        };
    }

    constructor() {
        super();

        this.me = JSON.parse(localStorage.getItem('me'));
        if (this.me === null) {
            this.me = {
                name: 'Guest',
                pronoun: '',
                tosc: new TOSC('BBBB'),
                id: utils.genToken(12),
            };
        }

        this.people = [...examples];

        //this.roomId = new URLSearchParams(window.location.search).get('id');
        this.roomId = "l0goKUeetsF1";

        this.isMobile = isMobile();
        this.showList = true;
        //this.showList = false;

        api.on('init', users => {
            console.log('init', users.length);
            users.forEach(user => user.tosc = new TOSC(user.tosc));
            this.people = users
        });

        api.on('upd_avatar', data => {
            if (data.revokeAvatar)
                URL.revokeAvatar(this.me.avatar);
            this.me.avatar = data.avatar;
            this.requestUpdate();
        });

        api.on('del_user', user_id => {
            console.log('del user');
            const index = this.people.findIndex(user => user.id === user_id);

            if (index !== -1) {
                this.people.splice(index, 1);
                this.shadowRoot.querySelector("#list").requestUpdate();
            }
        });

        api.on('add_user', user => {
            console.log('add user');
            user.tosc = new TOSC(user.tosc);
            this.people.push(user);
            //this.requestUpdate(); //it dosn't work this way :(
            this.shadowRoot.querySelector("#list").requestUpdate();
        });

        api.on('upd_user', user => {
            if (user.id === this.me.id) return;
            console.log('upd user');
            user.tosc = new TOSC(user.tosc);
            const index = this.people.findIndex(old => old.id === user.id);

            if (index !== undefined) {
                this.people[index] = user;
                this.shadowRoot.querySelector("#list").requestUpdate();
            }
        });

        window.onunload = () => {
            //if (this.isMobile)
                //api.say('left_room', { room_id: this.roomId, user_id: this.me.id });
            //else
                //api.say('del_room', { room_id: this.roomId });
        };
    }

    connectedCallback() {
        super.connectedCallback();
        this.ws = api;

        if (this.isMobile)
            api.onconnection = () => api.say('join_room', { room_id: this.roomId, user: this.me });
    }

    render() {
        if (this.isMobile && this.roomId === null) return this.renderGetARoom();
        if (!this.isMobile) return this.renderLandscapeLayout();
        return this.showList ? this.renderList() : this.renderCreate();
    }

    renderGetARoom() {
        return html`
            <div id="joinroom">
                It look's like you haven't enter any room yet.
                Scan qrcode on the bottom of room's screen to join it.
            </div>
        `;
    }

    renderLandscapeLayout() {
        return html` <tosc-list-landscape id='list' .people=${this.people}>Today at SOMEPLACE</tosc-list-landscape> `;
    }

    renderList() {
        return html` <tosc-list id='list' .me=${this.me} .people=${this.people} @switch=${this.changeScreen}></tosc-list> `;
    }

    renderCreate() {
        return html`
            <tosc-create
                .me=${this.me}
                .roomId=${this.roomId}
                @button=${this.changeScreen}
                @update=${this.updateMe}
            ></tosc-create>`;
    }

    changeScreen() {
        this.showList = !this.showList;
    }
}

customElements.define('tosc-app', TOSCapp);
