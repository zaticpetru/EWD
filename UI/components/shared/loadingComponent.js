export default class LoadingComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = /*html*/ `
            <h1> LOADING, PLEASE WAIT! </h1>
        `;
    }
}

window.customElements.define('loading-component', LoadingComponent);
