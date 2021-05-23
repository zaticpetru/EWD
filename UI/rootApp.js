import { GS } from './state/state.js';
import { EventBus } from './events/eventBus.js';
import { ADD_TO_CART } from './events/eventNames.js';

import MainHeader from './components/shared/mainHeader.js'
import MainContent from './components/shared/mainContent.js'


class RootApp extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }



    render() {
        this.innerHTML = /*html*/`
            <main-header></main-header>
            <main-content></main-content>
            <button id="changeState">Sign in</button>
        `;

        this.querySelector('#changeState').addEventListener('click', event => {
            event.preventDefault();
            var loading = GS.state.loading;
            GS.state = {...GS.state, loading: !loading};
        });
    }
}

window.customElements.define('root-app', RootApp);

