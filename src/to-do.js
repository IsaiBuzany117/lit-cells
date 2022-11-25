import '../dist/output.css'
import { LitElement, html, css, nothing } from 'lit';

export class ToDo extends LitElement {
    static styles = [
        css`
            :host {
                display: flex;
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
            button {
                background-color: #111;
                color: #fff;
                padding: 4px 10px;
                border-radius: 10px;
            }
            input {
                padding: 4px 10px;
            }
            .done {
                text-decoration-line: line-through;
                color: #888;
            }
            .container {
                width: 600px;
            }
        `,
    ];

    static properties = {
        tasks: { type: Array },
    };

    constructor() {
        super();
        this.tasks = [
            {
                done: false,
                title: "task 1",
                desc: "desc 1",
            },
            {
                done: false,
                title: "task 2",
                desc: "segunda desc ",
            },
            {
                done: false,
                title: "task 3",
                desc: "terceradesc",
            },
        ];
        this.done = [];
    }
    handleClick(task) {
        task.done = !task.done;
        this.requestUpdate();
    }

    get title() {
        return this.renderRoot?.querySelector("#title") ?? null;
    }

    get desc() {
        return this.renderRoot?.querySelector("#desc") ?? null;
    }

    addNewTask() {
        if (this.title.value !== "" && this.desc.value !== '') {
            this.tasks.push({
                done: false,
                title: this.title.value,
                desc: this.desc.value,
            });
            this.title.value = "";
            this.desc.value = "";
            this.requestUpdate();
        } else {
            alert("Agrega un titulo y una descripcion")
        }
    }

    render() {
        const pending = this.tasks.filter((task) => {
            return task.done === false;
        });
        const done = this.tasks.filter((task) => {
            return task.done === true;
        });
        return html`
            <div class="container bg-lime-400">
                <h1>ToDo</h1>
                <input type="text" id="title" placeholder="Escribe un titulo" />
                <input type="text" id="desc" placeholder="Escribe  una descripcion" />
                <button @click=${this.addNewTask}>Agregar nueva tarea</button>

                ${
                    pending.length > 0?
                    pending.map(
                    (task) => html`
                        <li class="pending" @click=${() => this.handleClick(task)}>
                            <h3>${task.title}</h3>
                            <p>${task.desc}</p>
                        </li>
                    `) : html`
                        <p>No hay tareas por hacer!</p>
                    `
                }
                <hr />
                ${done.map(
                    (task) => html`
                        <li class="done" @click=${() => this.handleClick(task)}>
                            <h3>${task.title} - HECHA!</h3>
                            <p>${task.desc}</p>
                        </li>
                    `
                )}
            </div>
        `;
    }
}
customElements.define('to-do', ToDo);
