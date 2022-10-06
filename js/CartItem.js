import {Item} from "./Item.js";

/**
 * Класс CartItem
 */

export class CartItem extends Item {

    quantity = 0;

    constructor(product, img = 'https://via.placeholder.com/50x50') {
        super(product, img);
        this.quantity = product.quantity;
    };

    changeQuantity(count) {
        this.quantity += count;
        this._updateItem();
    };

    removeMarkup() {
        document.querySelector(`.cart-item[data-id="${this.id_product}"]`).remove();
    };

    render() {
        this.rendered = true;
        return `<div class="cart-item" data-id="${this.id_product}">
                    <div class="product-bio">
                        <img src="${this.img}" alt="Some image">
                        <div class="product-desc">
                        <p class="product-title">${this.product_name}</p>
                        <p class="product-quantity">Количество: ${this.quantity}</p>
                        <p class="product-single-price">$${this.price} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">$${this.quantity * this.price}</p>
                        <button class="del-btn" data-id="${this.id_product}">&times;</button>
                    </div>
                </div>`;
    };

    _updateItem() {
        const block = document.querySelector(`.cart-item[data-id="${this.id_product}"]`);
        block.querySelector('.product-quantity').textContent = `Количество: ${this.quantity}`;
        block.querySelector('.product-price').textContent = `$${this.quantity * this.price}`;
    };

}
