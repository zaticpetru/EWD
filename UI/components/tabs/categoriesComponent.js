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

                this.showModal(id);
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

    showModal(categoryId) {
        const modalComponent = this.querySelector("modal-component");

        modalComponent.updateModal(`Category ID : ${categoryId}`);
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
