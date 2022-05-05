const data = [
    {title: "MSI NVIDIA GeForce 210", id: 1, price: 4190},
    {title: "Palit NVIDIA GeForce GT 710", id: 2, price: 4390},
    {title: "GIGABYTE NVIDIA GeForce GT 730", id: 3, price: 6990},
    {title: "Palit NVIDIA GeForce GT 1030", id: 4, price: 7890},
    {title: "ASUS AMD Radeon RX 6500XT", id: 5, price: 33990},
    {title: "GIGABYTE NVIDIA GeForce GTX 1660", id: 6, price: 43990},
];

const renderProduct = (title, id, price) => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <p>${price}</p>
                <span hidden id="${id}"></span>
            </div>`
};

const render = (products) => {
    const productsList = products.map(item => renderProduct(item.title, item.id, item.price, item.id)).join('');
    document.querySelector('.products').insertAdjacentHTML('beforeend', productsList);
}

render(data);
