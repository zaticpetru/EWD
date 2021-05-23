import { EventBus } from '../../events/eventBus.js';
import { POPULAR_PRODUCTS_FETCHED } from '../../events/eventNames.js';
import LoadingComponent from '../shared/loadingComponent.js';


export default class PopularProductsComponent extends HTMLElement {
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
                doc._products = data.records.slice(0,5);
                doc._products_loading = false;

                EventBus.dispatchEvent(POPULAR_PRODUCTS_FETCHED);
            }
        }).catch(err => {
            console.warn('Error ocurred', err);
        });
    }

    renderProducts(productContainer) {
        var html = [ '<div class="cards">' ];

        this._products.forEach(product => {
            html.push(/*html*/`
                <card-component title="${product.name} - ${product.price}$" subtitle="Category: ${product.category_name}">
                    ${product.description}
                    <br/>
                    <button class="addToCartBtn" data-product-id=${product.id} data-product-quantity=1> Add to cart</button>
                </card-component>
            `);
        });
        html.push('</div>');
        
        productContainer.innerHTML = "";
        productContainer.insertAdjacentHTML("beforeend", html.join("\n"));
        productContainer.querySelectorAll(".addToCartBtn").forEach(button => {
            button.removeEventListener("click", this.addToCart);
            button.addEventListener("click", this.addToCart);
        });
    }

    addToCart(event) {
            event.preventDefault();
            const productId = event.target.getAttribute("data-product-id");
            const quantity = event.target.getAttribute("data-product-quantity");
            
            EventBus.dispatchEvent(ADD_TO_CART, {
                "productId" : productId,
                "quantity" : quantity
            });
    }

    render() {
        this.innerHTML = /*html*/ `
            <loading-component></loading-component>
            <div class="products">
            </div>
        `;

        
        EventBus.addEventListener(POPULAR_PRODUCTS_FETCHED, _ => {
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

window.customElements.define('popular-products-component', PopularProductsComponent);
