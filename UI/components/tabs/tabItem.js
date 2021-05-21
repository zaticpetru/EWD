export default class TabItem extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = /*html*/`
            ${this.innerHTML}
        `;
    }
}

window.customElements.define('tab-item', TabItem);
