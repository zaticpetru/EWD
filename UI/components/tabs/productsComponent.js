import { GS } from '../../state/state.js';
import { EventBus } from '../../events/eventBus.js';
import { PRODUCTS_FETCHED } from '../../events/eventNames.js';
import CardComponent from '../shared/cardComponent.js';

export default class ProductsComponent extends HTMLElement {
    constructor() {
        super();
        this._products = [];
        this._products_loading = true;

        this.fetchProducts();
    }

    connectedCallback() {
        this.render();
    }

    fetchProducts() {
        const doc = this;

        fetch('http://localhost/EWD/api/product/read.php').then(response => {
            if(response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        }).then(data => {
            if(data.records){
                doc._products = data.records;
                doc._products_loading = false;

                EventBus.dispatchEvent(PRODUCTS_FETCHED);
            }
        }).catch(err => {
            console.warn('Error ocurred', err);
        });
    }

    renderProducts(productContainer) {
        var html = [ '<div class="cards">' ];

        this._products.forEach(product => {
            html.push(/*html*/`
                <card-component title="${product.name} - ${product.price}" subtitle="Category: ${product.category_name}">
                    ${product.description}
                    <br/>
                    <button onClick="console.log(${product.id})"> Click me</button>
                </card-component>
            `);
        });
        html.push('</div>');
        
        productContainer.insertAdjacentHTML("beforeend", html.join("\n"));
    }

    render() {
        this.innerHTML = /*html*/ `
            <loading-component></loading-component>
            <div class="products">
            </div>
        `;

        
        EventBus.addEventListener(PRODUCTS_FETCHED, _ => {
            if(this._products_loading) {
                this.querySelector("loading-component").style.display = "block";
                this.querySelector(".products").style.display = "none";
            } else {
                this.renderProducts(this.querySelector(".products"));

                this.querySelector("loading-component").style.display = "none";
                this.querySelector(".products").style.display = "block";
            }
        });
    }
}

window.customElements.define('products-component', ProductsComponent);
