/**
 * Базовый Класс Item
 */

export class Item {

    product_name = "";
    price = 0;
    id_product = 0;
    img = "";
    rendered = false;

    constructor(product, img = 'https://via.placeholder.com/200x150') {
        ({product_name: this.product_name, price: this.price, id_product: this.id_product} = product);
        this.img = img;
    };

    render() {
        this.rendered = true;
        return `<div class="product-item" data-id="${this.id_product}">
                    <img src="${this.img}" alt="${this.product_name}">
                    <div class="desc">
                        <h3>${this.product_name}</h3>
                        <p>${this.price}</p>
                        <button class="buy-btn" data-id="${this.id_product}">В корзину</button>
                    </div>
                </div>`;
    };

}
