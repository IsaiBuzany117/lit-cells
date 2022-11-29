import '../dist/output.css'
import { LitElement, html, css, nothing } from 'lit';
import './components/list-component';
import './components/input-component';

export class ToDo extends LitElement {
    static styles = [
        css`
            :host {
                display: flex;
                padding: 5px;
            }
            button {
                background-color: #111;
                color: #fff;
                padding: 4px 10px;
                border-radius: 10px;
                cursor: pointer;
            }
            .container {
                width: 600px;
            }
        `,
    ];

    static properties = {
        taskArray: { type: Array },
        title: {type:String},
        desc: {type:String}
    };

    constructor() {
        super();
        this.taskArray = [
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
                done: true,
                title: "task 3",
                desc: "terceradesc",
            },
        ];
        this.title = ''
        this.desc = ''
    }

    pending() { 
        return this.taskArray.filter((task) => task.done === false); 
    }

    done() {
        return this.taskArray.filter((task) => task.done === true); 
    }

    addTask() {
        if (this.title !== "" && this.desc !== "") {
            this.taskArray = [
                ...this.taskArray,
                {
                    done: false,
                    title: this.title,
                    desc: this.desc,
                },
            ];
        } else {
            alert("Agrega un titulo y una descripcion");
        }
        this.title = ''
        this.desc = ''
        console.log(this.title)
        console.log(this.desc)
        this.requestUpdate();
    }
    completingTask(e) {
        this.requestUpdate()
    }

    render() {
        return html`
            <div class="container">
                <h1>ToDo</h1>
                <input-component placeholder="Escribe un titulo" .inValue=${this.title} @input=${(e) => { 
                    this.title = e.target.inValue
                }}></input-component>
                <input-component placeholder="Escribe  una descripcion" .inValue=${this.desc} @input=${(e) => { 
                    this.desc = e.target.inValue
                }}></input-component>
                <button @click=${this.addTask}>Agregar nueva tarea</button>
                
                ${
                    this.pending().length > 0
                        ? html`
                            <list-component
                                .tasks=${this.pending()}
                                @completing=${this.completingTask}
                            ></list-component>
                        `
                        : html`
                            <p>No hay tareas pendientes!</p>  
                        `
                }
                <hr />
                ${
                    this.done().length > 0
                        ? html`
                            <list-component
                                .tasks=${this.done()}
                                @completing=${this.completingTask}
                            ></list-component>
                        `
                        : html`
                            <p>Tienes tareas por hacer.</p>
                        `
                }
            </div>
        `;
    }
}
customElements.define('to-do', ToDo);
