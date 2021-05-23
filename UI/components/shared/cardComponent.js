export default class CardComponent extends HTMLElement {
    constructor() {
        super();
        this.title = this.getAttribute('title');
        this.description = this.innerHTML;
        this.subtitle = this.getAttribute('subtitle');
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = /*html*/ `
            <h3>${this.title}</h3>
            <p>${this.description}</p>
            <h5>${this.subtitle}</h5>
        `;
    }
}

window.customElements.define('card-component', CardComponent);
