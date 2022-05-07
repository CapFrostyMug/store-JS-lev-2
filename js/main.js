class Products {

    data = [];
    products = [];
    container = null;
    totalPrice = 0;

    constructor(selector) {
        this.container = document.querySelector(selector);
        this._fetchData();
        this._render();
        this.getSum(this.data);
    };

    /*init() {
        this._fetchData();
        this._render();
    };*/

    getSum(products) {
        for (let product of products) {
            this.totalPrice += product.price;
        }
        console.log(this.totalPrice);
    };

    _fetchData() {
        this.data = [
            {title: "MSI NVIDIA GeForce 210", id: 1, price: 4190},
            {title: "Palit NVIDIA GeForce GT 710", id: 2, price: 4390},
            {title: "GIGABYTE NVIDIA GeForce GT 730", id: 3, price: 6990},
            {title: "Palit NVIDIA GeForce GT 1030", id: 4, price: 7890},
            {title: "ASUS AMD Radeon RX 6500XT", id: 5, price: 33990},
            {title: "GIGABYTE NVIDIA GeForce GTX 1660", id: 6, price: 43990},
        ]
    };

    _render() {
        for (let data of this.data) {
            const productItem = new ProductItem(data);
            this.products.push(productItem);
            this.container.insertAdjacentHTML('beforeend', productItem.render());
        }
    };
}

class ProductItem {

    title = "";
    price = 0;
    id = 0;
    img = "";

    constructor(product, img = 'https://via.placeholder.com/200x150') {
        ({title: this.title, price: this.price, id: this.id} = product);
        this.img = img;
    };

    render() {
        return `<div class="product-item">
                    <img src="${this.img}" alt="${this.title}">
                    <div class="desc">
                        <h3>${this.title}</h3>
                        <p>${this.price}</p>
                        <button class="buy-btn" data-id="${this.id}">В корзину</button>
                    </div>
                </div>`
    }
}

const list = new Products('.products');
// list.init();
