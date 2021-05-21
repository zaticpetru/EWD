import { EventBus } from '../../events/eventBus.js';
import { STATE_UPDATED } from '../../events/eventNames.js';
import { GS } from '../../state/state.js';

import TabsContainer from '../tabsContainer.js';
import LoadingComponent from './loadingComponent.js';

export default class MainContent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this._loading = GS.state.loading;

        this.render();
        console.log(GS.state);
        console.log(this._loading);

        EventBus.addEventListener(STATE_UPDATED, event => {
            // this.querySelector("h1").innerHTML += "test";
            console.log(event);
            this._loading = GS.state.loading;
            
            this.render();
        });
    }

    render() {
        this.innerHTML = /*html*/ `
            <main>
                ${this._loading ?
                    /*html*/`<loading-component></loading-component>` :
                    /*html*/`<tabs-container></tabs-container>`
                }
            </main>
        `;
    }
}

window.customElements.define('main-content', MainContent);
