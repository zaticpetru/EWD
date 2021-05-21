export default class CategoriesComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = /*html*/ `
            <h1>Categories component</h1>
        `;
    }
}

window.customElements.define('categories-component', CategoriesComponent);
