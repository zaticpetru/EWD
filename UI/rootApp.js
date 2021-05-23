import { GS } from './state/state.js';
import { EventBus } from './events/eventBus.js';
import { ADD_TO_CART } from './events/eventNames.js';

import MainHeader from './components/shared/mainHeader.js'
import MainContent from './components/shared/mainContent.js'


class RootApp extends HTMLElement {
    constructor() {
        super();
        this.cart = {
            products : [],
            item_count : 0
        }

        EventBus.addEventListener(ADD_TO_CART, (event) => {
            const product = event.detail;

            const index = this.cart.products.findIndex(cartItem => cartItem.productId === product.productId);
            if(index != -1) {
                this.cart.products[index].quantity = parseInt(this.cart.products[index].quantity) + parseInt(product.quantity);
                alert("Quantity updated " + this.cart.products[index].quantity); 
            } else {
                this.cart.products.push({
                    productId: product.productId,
                    quantity: parseInt(product.quantity)
                });
                this.cart.item_count = this.cart.products.length;
                alert("Item added to cart");
            }
        });
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

