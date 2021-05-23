import { GS } from '../../state/state.js';
import { EventBus } from '../../events/eventBus.js';
import { CATEGORIES_FETCHED } from '../../events/eventNames.js';
import CardComponent from '../shared/cardComponent.js';
import ModalComponent from '../shared/modalComponent.js';

export default class CategoriesComponent extends HTMLElement {
    constructor() {
        super();
        this._categories = [];
        this._categories_loading = true;
        this.fetchCategories();
    }

    renderCategories(categoriesContainer) {
        var html = [ '<div class="cards">' ];

        this._categories.forEach(category => {
            html.push(/*html*/`
                <card-component title="${category.name}" subtitle="Nr. products: ${category.id}">
                    ${category.description}
                    <br/>
                    <button data-id=${category.id} class="showCategory">ShowCategory</button>
                </card-component>
            `);
        });
        html.push('</div>');
        
        categoriesContainer.insertAdjacentHTML("beforeend", html.join("\n"));

        this.querySelectorAll('.categories button').forEach((btn) => {
            btn.addEventListener("click", (event) => {
                const id = event.target.getAttribute("data-id");
                console.log("id", id);

                this.fetchCategoryWithProducts(id);
            })
        });
    }

    connectedCallback() {
        this.render();
    }

    fetchCategories() {
        const doc = this;

        fetch('http://localhost/EWD/api/category/read.php').then(response => {
            if(response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        }).then(data => {
            if(data.records){
                doc._categories = data.records;
                doc._categories_loading = false;

                EventBus.dispatchEvent(CATEGORIES_FETCHED);
            }
        }).catch(err => {
            console.warn('Error ocurred', err);
        });
    }

    fetchCategoryWithProducts(categoryId) {
        fetch(`http://localhost/EWD/api/product/read_by_category.php?id=${categoryId}`).then(response => {
            if(response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        }).then(data => {
            if(data.records){
                this.showModal(categoryId, data.records, data.category_name);
            }
        }).catch(err => {
            console.warn('Error ocurred', err);
        });
    }

    showModal(categoryId, products, categoryName) {
        const modalComponent = this.querySelector("modal-component");

        var htmlContent = [ '<div class="cards">' ];

        products.forEach(product => {
            htmlContent.push(/*html*/`
                <card-component title="${product.name} - ${product.price}" subtitle="Category: ${product.category_name}">
                    ${product.description}
                    <br/>
                    <button onClick="console.log(${product.id})"> Click me</button>
                </card-component>
            `);
        });
        htmlContent.push('</div>');

        const productCount = `Products in category: ${products.length}`;
        
        modalComponent.updateModal(htmlContent, categoryName, productCount);
        modalComponent.querySelector(".modal").style.display = "block";
        console.log(this);
    }

    render() {
        this.innerHTML = /*html*/ `
            <loading-component></loading-component>
            <div class="categories">
            </div>
            <modal-component modalId="categoriesModal"
                    modalHeader="ModalHeader"
                    modalFooter="ModalFooter">
                <p>some content in modal</p>
            </modal-component>
        `;

        EventBus.addEventListener(CATEGORIES_FETCHED, _ => {
            if(this._products_loading) {
                this.querySelector("loading-component").style.display = "block";
                this.querySelector(".categories").style.display = "none";
            } else {
                this.renderCategories(this.querySelector(".categories"));

                this.querySelector("loading-component").style.display = "none";
                this.querySelector(".categories").style.display = "block";
            }
        });
    }
}

window.customElements.define('categories-component', CategoriesComponent);
