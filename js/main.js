/**
 * Базовый Класс Item
 */

class Item {

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
        return `<div class="product-item">
                    <img src="${this.img}" alt="${this.product_name}">
                    <div class="desc">
                        <h3>${this.product_name}</h3>
                        <p>${this.price}</p>
                        <button class="buy-btn" data-id="${this.id_product}">В корзину</button>
                    </div>
                </div>`;
    };

}

/**
 * Класс ProductItem
 */

class ProductItem extends Item {
}

/**
 * Класс CartItem
 */

class CartItem extends Item {

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
                        <p class="product-quantity">Quantity: ${this.quantity}</p>
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
        block.querySelector('.product-quantity').textContent = `Quantity: ${this.quantity}`;
        block.querySelector('.product-price').textContent = `$${this.quantity * this.price}`;
    };

}

/**
 * Базовый Класс List
 */

class List {

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

/**
 * Класс ProductsList
 */

class Products extends List {

    cart = null;

    constructor(cart, container = '.products', url = '/catalogData.json') {
        super(container, url);
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data));
    };

    _init() {
        this.container.addEventListener('click', event => {
            if (event.target.classList.contains('buy-btn')) {
                const id = +event.target.dataset['id'];
                this.cart.addProduct(this.getItem(id));
            }
        });
    };

}

/**
 * Класс Cart
 */

class Cart extends List {

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

const cart = new Cart();
const list = new Products(cart);
