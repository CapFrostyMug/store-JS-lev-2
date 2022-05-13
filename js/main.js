import {Products} from "./ProductsList.js";
import {Cart} from "./Cart.js";

const list = new Products(new Cart());

list.getJson(`getProducts.json`).then(data => list.handleData(data));
