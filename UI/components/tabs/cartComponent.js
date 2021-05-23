import { EventBus } from '../../events/eventBus.js';
import { ADD_TO_CART } from '../../events/eventNames.js';


export default class CartComponent extends HTMLElement {
    constructor(){
        super();
        this.cart = {
            products : [],
            item_count : 0,
            total: 0
        }
    }
    
    connectedCallback() {
        this.render();

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
                alert("Item added to cart");
            }

            var counter = 0;
            
            this.cart.products.forEach(product => counter += parseInt(product.quantity));
            this.cart.item_count = counter;

            this.render();
        });
    }

    renderOrderItems(){
        var doc = this;
        this.querySelector('.cartItems').innerHTML = "";
        this.total = 0;

        this.cart.products.forEach(product => {
            fetch(`http://localhost/EWD/api/product/read_one.php?id=${product.productId}`).then(response => {
                if(response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response);
                }
            }).then(data => {

                doc.renderProduct(data, product.quantity);

            }).catch(err => {
                    if(err.status == 404) {
                        alert("No products in this category.");
                    }
                    console.warn('Error ocurred', err);
            });
        });
    }

    renderProduct(product, quantity) {

        const html = /*html*/ `
            <h4>${product.name}</h4>
            <p>Price: ${product.price}$</p>
            <p>Quantity: ${quantity}</p>
            <h5>Total price: ${product.price * quantity}$</h5>
            <hr/>
        `;
        this.total += product.price * quantity;

        this.querySelector('.cartItems').insertAdjacentHTML("beforeend", html);
        this.querySelector('#total').innerHTML = this.total + "$";
    }

    render() {
        this.innerHTML = /*html*/`
            <h1>Cart:${this.cart.item_count}</h1>
            <h3>Total: <u id="total">${this.cart.total}$</u> </h3>
            <hr/>
            <div class="cartItems"></div>
        `;
        if(this.cart.item_count > 0){
            this.renderOrderItems();
        }
    }
}

window.customElements.define('cart-component', CartComponent);