import { LitElement, css, html } from 'lit-element';

class TOSCListLandscape extends LitElement {
    static get styles() {
        return css`
            :host {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;
            }

            #title {
                display: block;
                width: 100%;
                background: #00000025;
                text-align: center;
                padding: 8px;
                box-sizing: border-box;

                margin-bottom: 20px;
            }

            #people {
                display: flex;
                flex-wrap: wrap;
                gap: 30px;
                justify-content: center;
                align-items: center;
                padding: 10px;

                overflow-y: auto;
                height: 100%;
            }

            .person {
                display: grid;
                background-color: #eee;
                border-radius: 10px;
                padding: 10px;

                grid-template-columns: 100px auto;
                gap: 10px 15px;

                width: 400px;
            }

            .avatar {
                grid-row: 1;
                grid-column: 1;

                width: 100px;
                height: 100px;
                background-color: #bdf0ff;
                padding: 5px;
                box-sizing: border-box;
                border-radius: 50%;
            }

            .wrap {
                grid-row: 1;
                grid-column: 2;

                height: 100%;
                width: 100%;

                overflow: hidden;
                text-overflow: ellipsis;
            }

            .name {
                white-space: nowrap;
                width: 100%;
            }

            .pronoun {
                color: #666;
                font-size: 20px;
                overflow-x: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;

                margin-top: 10px;
                display: block;
            }

            .tosc {
                grid-row: 2;
                grid-column: 1 / 3;

                width: 100%;
                justify-content: space-around;
                --font-size: 40px;
            }
        `;
    }

    static get properties() {
        return {
            people: { type: Array },
        }
    }

    constructor() {
        super();
        this.people = [];
        this.avatar = "https://www.flaticon.com/svg/vstatic/svg/747/747402.svg?token=exp=1620310651~hmac=a9b02cfce78c075668c201880608aadb"
    }

    render() {
        return html`
            <slot id="title"></slot>
            <div id="people">
                ${this.people.map(person => html`
                    <div class='person'>
                        <img class='avatar' src=${this.avatar}>
                        <div class='wrap'>
                            <span class='name'>${person.name}</span>
                            <span class='pronoun'>${person.pronoun}</span>
                        </div>
                        <tosc-inline class='tosc' .tosc=${person.tosc}></tosc-inline>
                    </div>
                `)}
            </div>
        `;
    }
};

customElements.define('tosc-list-landscape', TOSCListLandscape);
