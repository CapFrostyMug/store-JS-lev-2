import {List} from "./List.js";

/**
 * Класс Cart
 */

export class Cart extends List {

    constructor(container = '.cart-block', url = '/getBasket.json') {
        super(container, url);
        this.getJson()
            .then(data => this.handleData(data.contents));
    };

    addProduct(product) {
        this.getJson(`${List.API}/addToBasket.json`)
            .then(data => {
                if (data.result) {
                    let find = this.products.find(item => item.id_product === product.id_product);
                    if (find) {
                        find.changeQuantity(1);
                        return;
                    }

                    let prod = Object.assign({quantity: 1}, product);
                    this.handleData([prod]);
                } else {
                    console.log('Error');
                }
            });
    };

    removeProduct(product) {
        this.getJson(`${List.API}/deleteFromBasket.json`)
            .then(data => {
                if (data.result) {
                    if (product.quantity > 1) {
                        product.changeQuantity(-1);
                        return;
                    }
                    this.products.splice(this.products.indexOf(product), 1);
                    product.removeMarkup();
                } else {
                    console.log('Error');
                }
            });
    };

    _init() {
        this.container.addEventListener('click', event => {
            if (event.target.classList.contains('del-btn')) {
                const id = +event.target.dataset['id'];
                this.removeProduct(this.getItem(id));
            }
        });

        document.querySelector('.btn-cart').addEventListener('click', () => {
            this.container.classList.toggle('invisible');
        });
    };

}
