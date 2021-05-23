import { EventBus } from '../../events/eventBus.js';
import { STATE_UPDATED } from '../../events/eventNames.js';
import { GS } from '../../state/state.js';

import TabsContainer from '../tabsContainer.js';
import LoadingComponent from './loadingComponent.js';

export default class MainContent extends HTMLElement {
    constructor() {
        super();
        EventBus.addEventListener(STATE_UPDATED, event => {
            this._loading = GS.state.loading;
            
            this.render();
        });
    }

    connectedCallback() {
        this._loading = GS.state.loading;
        this.render();
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
