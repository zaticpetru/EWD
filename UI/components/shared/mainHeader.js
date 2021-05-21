export default class MainHeader extends HTMLElement {
    constructor(){
        super();
    }
    
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = /*html*/`
            <header>
                <h1>Just e-commerce, nothing more</h1>
                <h3>enjoy shopping undisturbed )</h3>
                <hr/>
            </header>
        `;
    }
}

window.customElements.define('main-header', MainHeader);