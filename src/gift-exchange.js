import { LitElement, html, css, nothing } from 'lit';

export class GiftExchange extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    static properties = {
        people: { type: Array },
        matches: { type: Array }
    }

    constructor() {
        super()
        this.people = []
        this.matches = []
    }

    get person1() {
        return this.renderRoot?.querySelector("#person1") ?? null
    }
    get person2() {
        return this.renderRoot?.querySelector("#person2") ?? null
    }

    add() {
        if(this.person1.value !== '' && this.person2.value !== ''){
            this.people.push(this.person1.value)
            this.people.push(this.person2.value)
            this.requestUpdate()
        } else {
            alert("Debes ingresar ambos participantes")
        }
    }

    match() {
        this.matches = []
        let pairs = new Array((this.people.length * (this.people.length - 1)) / 2), pos = 0

        for (let i = 0; i < this.people.length; i++) {
            for (let j = 0; j < this.people.length; j++) {
                if(this.people[i] !== this.people[j]){
                    pairs[pos++] = { p1: this.people[i], p2: this.people[j]}
                }
            }
        }
        while(this.matches.length !== (this.people.length /2)) {
            const m = pairs[Math.floor(Math.random() * pairs.length)]
            console.log(m);
            let f = false
            for(const e of this.matches) {
                if((m.p1 === e.p1 || m.p1 === e.p2) || (m.p2 === e.p1 || m.p2 === e.p2)) {
                    f = true
                    break;
                }
            }
            if(!f){
                this.matches.push(m);
            }
        }
        console.log(this.matches)
        this.requestUpdate();
    }

    render() {
        
        return html`
            <div>
                <h1>Intercambio de regalos</h1>
                <input type="text" id="person1" placeholder="Nombre del participante"/>
                <input type="text" id="person2" placeholder="Nombre del participante"/>
                <button @click=${this.add}>Añadir participantes</button>
                <div>
                    <h2>Participantes</h2>
                    <ol>
                        ${
                            this.people.length > 0 ?
                            this.people.map(person => html`
                                <li>${person}</li>
                            `) : html`
                                <p>No hay participantes</p>
                            `
                        }
                    </ol> 
                </div>
                <hr />
                <div>
                    <button @click=${this.match}>Emparejar</button>
                    ${
                        this.matches.length > 0 ?
                        html`
                            <h2>Las parejas son:</h2>
                            ${
                                this.matches.map(m=>html`
                                    <p>${m.p1} se empareja con ${m.p2}</p>
                                `)
                            }
                        ` : nothing
                    }
                </div>
            </div>
        `;
    }
}
customElements.define('gift-exchange', GiftExchange);
