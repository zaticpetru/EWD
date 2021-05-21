export default class PopularProductsComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = /*html*/ `
            <h1>Popular Products Component</h1>
        `;
    }
}

window.customElements.define('popular-products-component', PopularProductsComponent);
