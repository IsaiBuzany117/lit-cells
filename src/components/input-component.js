import { LitElement, html, css } from 'lit';

export class InputComponent extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
            input {
                padding: 4px 10px;
            }
        `,
    ];

    static properties = {
        inValue: { type: String },
        placeholder: { type: String },
    };

    constructor() {
        super();
        this.inValue = "";
        this.placeholder = "";
    }

    input({ target }) {
        this.inValue = target.value;
    }

    render() {
        return html`
            <input
                type="text"
                placeholder=${this.placeholder}
                value=${this.inValue}
                @input=${this.input}
            />
        `;
    }
}
customElements.define('input-component', InputComponent);
