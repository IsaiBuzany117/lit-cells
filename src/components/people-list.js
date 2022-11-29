import { LitElement, html, css } from 'lit';

export class PeopleList extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    static properties = {
        lista: { type: Array },
    }

    constructor() {
        super()
        this.lista = ['']
    }

    render() {
        return html`
            <ol>
                ${
                    this.lista.map(person => html`
                        <li>${person}</li>
                    `)
                }
            </ol>
        `;
    }
}
customElements.define('people-list', PeopleList);
