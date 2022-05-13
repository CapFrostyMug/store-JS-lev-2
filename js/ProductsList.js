import {List} from "./List.js";

/**
 * Класс ProductsList (Products)
 */

export class Products extends List {

    cart = null;
    filtered = [];

    constructor(cart, container = '.products', url = '/catalogData.json') {
        super(container, url);
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data));
    };

    filter(value) {
        const regexp = new RegExp(value, 'i');
        this.filtered = this.products.filter(item => regexp.test(item.product_name));
        this.products.forEach(item => {
            const block = document.querySelector(`.product-item[data-id="${item.id_product}"]`);
            if (!this.filtered.includes(item)) {
                block.classList.add('invisible');
            } else {
                block.classList.remove('invisible');
            }
        });
    };

    _init() {
        this.container.addEventListener('click', event => {
            if (event.target.classList.contains('buy-btn')) {
                const id = +event.target.dataset['id'];
                this.cart.addProduct(this.getItem(id));
            }
        });

        document.querySelector('.search-form').addEventListener('submit', item => {
            item.preventDefault();
            this.filter(document.querySelector('.search-field').value);
        });
    };

}
