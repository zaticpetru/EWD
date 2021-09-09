import TabItem from './tabs/tabItem.js';
import PopularProductsComponent from './tabs/popularProductsComponent.js';
import ProductsComponent from './tabs/productsComponent.js';
import CategoriesComponent from './tabs/categoriesComponent.js';
import CartComponent from './tabs/cartComponent.js';

export default class TabsContainer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        var doc = this;
        this.querySelectorAll('.tabLinks').forEach((btn) => {
            btn.addEventListener("click", (event) => {
                const id = event.target.getAttribute("data-id");

                doc.querySelectorAll('tab-item').forEach((tab) => {
                    tab.classList.remove("active");
                });
                doc.querySelectorAll('.tabLinks').forEach((tab) => {
                    tab.classList.remove("active");
                });

                doc.querySelector(`#${id}`).classList.add("active");
                event.target.classList.add("active");
            })
        });
    }

    render() {
        this.innerHTML = /*html*/ `
            <div class="tab">
                <button class="tabLinks active" data-id="PopularProducts">
                    Popular Products
                </button>
                <button class="tabLinks" data-id="AllProducts">
                    All Products
                </button>
                <button class="tabLinks" data-id="Categories">
                    Categories
                </button>
                <button class="tabLinks right" data-id="Cart">
                    Cart
                </button>
            </div>

            <tab-item class="active" id="PopularProducts">
                <popular-products-component></popular-products-component>
            </tab-item>
            <tab-item id="AllProducts">
                <products-component></products-component>
            </tab-item>
            <tab-item id="Categories">
                <categories-component></categories-component>
            </tab-item>
            <tab-item id="Cart">
                <cart-component></cart-component>
            </tab-item>

        `;
    }
}

window.customElements.define('tabs-container', TabsContainer);
