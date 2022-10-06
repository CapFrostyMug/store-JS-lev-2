import {ProductItem} from "./ProductItem.js";
import {CartItem} from "./CartItem.js";

/**
 * Базовый Класс List
 */

export class List {

    static itemsMap = {
        Products: ProductItem,
        Cart: CartItem,
    };

    static API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

    products = [];
    container = null;
    url = '';

    constructor(selector, url) {
        this.container = document.querySelector(selector);
        this.url = url;
        this._init();
    };

    getJson(url) {
        return fetch(url ? url : `${List.API + this.url}`)
            .then(result => result.json());
    };

    handleData(data) {
        for (let item of data) {
            this.products.push(new List.itemsMap[this.constructor.name](item));
        }
        this._render();
    };

    getItem(id) {
        return this.products.find(item => item.id_product === id);
    };

    getSum(products) {
        for (let product of products) {
            this.totalPrice += product.price;
        }
        return this.totalPrice;
    };

    _init() {
    };

    _render() {
        for (let product of this.products) {
            if (product.rendered) {
                continue;
            }
            this.container.insertAdjacentHTML('beforeend', product.render());
        }
    };

}
