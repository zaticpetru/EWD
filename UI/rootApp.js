import { GS } from './state/state.js';
import { EventBus } from './events/eventBus.js';
import { STATE_UPDATED } from './events/eventNames.js'

import MainHeader from './components/shared/mainHeader.js'

class RootApp extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this._local_copy = GS.state;

        EventBus.addEventListener(STATE_UPDATED, event => {
            console.log(this._local_copy);
            console.log(GS.state);
            console.log(event);
        });
    }



    render() {
        this.innerHTML = /*html*/`
            <main-header></main-header>
        `;
    }
}

window.customElements.define('root-app', RootApp);