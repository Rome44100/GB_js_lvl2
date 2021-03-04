"use strict";

import Button from "../js/button";

export default class GoodsItem {
    _name = "";
    _price = "";
    _img = "";
    _cartInstance = null;

    constructor({ name, price, img }, CartInstance) {
        this._name = name;
        this._price = price;
        this._img = img;
        this._cartInstance = CartInstance;
    };

    addToCart() {
        this._cartInstance.add(this);
    };

    render() {
        const placeToRender = document.querySelector(".products_wrap");
        if (placeToRender) {
            const block = document.createElement("div");
            block.classList.add("one_product");

            block.innerHTML = `<div class="one_prod_img">
                    <a href="detail.html">
                        <img src="${this._img}" alt="${this._name}" loading="lazy">
                    </a>
                </div>
                <div class="one_prod_title">
                    <h3>
                        <a href="detail.html">${this._name}</a>
                    </h3>
                </div>
                <div class="product_buy">
                    <div class="price_wrap">
                        <div class="price">
                            <span class="pre_title">от</span>
                            <span class="price_value">${this._price}</span>
                            <span class="price_currency">руб.</span>
                        </div>
                        <div class="product_buy_button">
                            <!-- RENDER BUTTON BUY -->
                        </div>
                    </div>
                </div>`;

            placeToRender.appendChild(block);

            this.addButton(block);
        }
    };

    addButton(block) {
        const button_wrap = block.querySelector(".product_buy_button");

        if (button_wrap) {
            const btn = new Button("Купить", this.addToCart.bind(this));
            btn.render(button_wrap);
        }
    };
}