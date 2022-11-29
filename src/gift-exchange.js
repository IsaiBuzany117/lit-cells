import { LitElement, html, css, nothing } from 'lit';
import './components/people-list'
import { matchPeople } from './utils/matchPeople'
export class GiftExchange extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                padding: 5px;
            }
        `
    ];

    static properties = {
        people: { type: Array },
        matches: { type: Array },
        p1: { type: String },
        person2: { type: String }
    }

    constructor() {
        super()
        this.people = []
        this.matches = []
        this.p1 = ''
        this.p2 = ''
    }

    add() {
        this.people = [...this.people, this.p1, this.p2]
    }

    match() {
        this.matches = matchPeople(this.people)
    }

    result () {
        return html`
            ${this.matches.length > 0
                ? html`
                      <h2>Las parejas son:</h2>
                      ${this.matches.map(
                          (m) => html` <p>${m.p1} se empareja con ${m.p2}</p> `
                      )}
                  `
                : nothing}
        `;
    }

    render() {
        
        return html`
            <div>
                <h1>Intercambio de regalos</h1>
                <input-component
                    placeholder="Nombre del participante 1"
                    .inValue=${this.p1}
                    @input=${(e) => {
                        this.p1 = e.target.inValue;
                    }}
                ></input-component>
                <input-component
                    placeholder="Nombre del participante 2"
                    .inValue=${this.p2}
                    @input=${(e) => {
                        this.p2 = e.target.inValue;
                    }}
                ></input-component>

                <button @click=${this.add}>Añadir participantes</button>
                <div>
                    <h2>Participantes</h2>
                    <people-list .lista=${this.people}></people-list>
                </div>
                <hr />
                <div>
                    <button @click=${this.match}>Emparejar</button>
                    ${this.result()}
                </div>
            </div>
        `;
    }
}
customElements.define('gift-exchange', GiftExchange);
