import { LitElement, html, css } from 'lit';
import { changeStatus } from '../utils/changeStatus'

export class ListComponent extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
            li {
                display: block;
                cursor: pointer;
            }
            li > p {
                padding-left: 2rem;
            }
            li > h3 {
                font-size: 2rem;
            }
            .pending:hover {
                color: #259;
                font-weight: 900;
            }
            .done {
                text-decoration-line: line-through;
                color: #888;
            }
        `,
    ];

    static properties = {
        tasks: { type: Array },
    };

    constructor() {
        super();
        this.tasks = [];
    }

    dispatchCompleting(task) {
        task.done = !task.done
        const op = {
            detail: task,
            bubbles: true,
            composed: true
        }

        this.dispatchEvent(new CustomEvent('completing', op))
    }

    render() {
        return html`
            <ul>
                ${this.tasks.map(
                    (task) => html`
                        <li class=${task.done ? 'done' : 'pending'} @click=${() => this.dispatchCompleting(task)}>
                            <h3>${task.title}</h3>
                            <p>${task.desc}</p>
                            <!-- <p>${task}</p> -->
                        </li>
                    `
                )}
            </ul>
        `;
    }
}
customElements.define('list-component', ListComponent);
