import { GS } from '../../state/state.js';
import { EventBus } from '../../events/eventBus.js';
// import { STATE_UPDATED } from '../events/eventNames.js';

export default class ProductsComponent extends HTMLElement {
    constructor() {
        super();
        this._products = [];
        this._products_loading = true;
        this.fetchProducts();
    }

    connectedCallback() {
        this.render();
        var doc = this;

        EventBus.addEventListener("PF", _ => {
            if(this._products_loading) {
                this.querySelector("loading-component").style.display = "block";
                this.querySelector(".products").style.display = "none";
            } else {
                this.renderProducts(doc.querySelector(".products"));

                this.querySelector("loading-component").style.display = "none";
                this.querySelector(".products").style.display = "block";
            }
        });
    }

    fetchProducts() {
        var doc = this;

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

                EventBus.dispatchEvent("PF");
            }
        }).catch(err => {
            console.warn('Error ocurred', err);
        });
    }

    renderProducts(productContainer) {
        var html = []

        this._products.forEach(product => {
            html.push(`<p>id : ${product.id}, name : ${product.name}</p>`);
        });

        productContainer.insertAdjacentHTML("beforeend", html.join("\n"));
    }

    render() {
        this.innerHTML = /*html*/ `
            <h1>Products Component</h1>
            <loading-component></loading-component>
            <div class="products">
                list of products
            </div>
        `;
    }
}

window.customElements.define('products-component', ProductsComponent);
