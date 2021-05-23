export default class MainFooter extends HTMLElement {
    constructor(){
        super();
    }
    
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = /*html*/`
            <footer>
                <hr/>
                <h3>Contact-us</h3>
                <h3>+40 XXX 420 XXX</h3>
            </footer>
        `;
    }
}

window.customElements.define('main-footer', MainFooter);