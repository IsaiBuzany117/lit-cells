import { LitElement, html, css } from 'lit';
import './components/people-list'

export class InterRegalos extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];
    static properties = {
        a: { type: Array },
    }

    constructor() {
        super()
        // this.a = [1,2,3,4]
    }

    add() {
        this.a = [...this.a, 5]
        console.log(this.a)
        // this.requestUpdate();
    }
    otra() { 
        return ['w', '2342']
    }
    render() {
        return html`
            <p>${this.a}</p>
            
            <button @click=${this.add}>click</button>
            <people-list .lista=${this.a} ></people-list>
        `;
    }
}
customElements.define('inter-regalos', InterRegalos);
