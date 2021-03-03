"use strict";

import Button from "./button";

class AbstractList {
    _items = [];
}

class List extends AbstractList {

    _elemsAddCnt = 1;
    _url = `${document.location.protocol}//${document.location.host}/database/items.json`;

    constructor(CartInstance) {
        // при переопределении конструктора родителя нужно обязательно вызывать super
        // при этом если нет аргументов у родителя, то можно и без них в дочернем вызывать super
        super();

        this.addElems(this._url);
    };

    fetchGoods() {
        // fetch возвращает promise
        return fetch(this._url);
    };

    render() {
        this._items.forEach(Elem => {
            Elem.render();
        });

        const placeToRender = document.querySelector(".products_wrap");
        this._url = `${document.location.protocol}//${document.location.host}/database/items${this._elemsAddCnt}.json`;

        if (placeToRender) {
            const btn = new Button("Еще товары", () => {
                this.addElems(this._url, btn);
                this._elemsAddCnt++;
            });
            if (this._elemsAddCnt < 3) {
                btn.render(placeToRender);
            }
        }
    };

    // в этот раз не побоялся и вытащил в отдельный метод и не прогадал :)
    // но при этом остается за гранью понимания, как CartInstance работает во всех этих вложенных областях видимости
    addElems(url, btn = null) {
        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(obj => {
                const goods = obj.data.map(el => {
                    return new GoodsItem(el, CartInstance);
                });
                this._items = goods;
                return this._items;
            })
            .then(() => {
                if (null != btn) {
                    btn.destroy();
                }
            })
            .then(this.render.bind(this));
    };
}

class GoodsItem {
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

class Cart extends AbstractList {
    _names = [];
    _total_cnt = 0;
    _basket_price = 0;

    // Добавлять объект товара
    add(Obj) {
        if (0 == this._items.length) {
            Obj._cnt = 1;
            this._items.push(Obj);
            this._names.push(Obj._name);
        } else {
            if (this._names.includes(Obj._name)) {
                this._items.find(el => {
                    if (Obj._name == el._name) {
                        el._cnt++;
                        return el;
                    }
                });
            } else {
                Obj._cnt = 1;
                this._items.push(Obj);
                this._names.push(Obj._name);
            }
        }

        this._total_cnt++;
        this._basket_price += Obj._price;

        this.convertToObj();

        //console.log(this);

        this.render(Obj);
    };

    convertToObj() {
        let goods = null;

        goods = this._items.map(el => {
            return new CartItem(el);
        });

        this._items = goods;
    };

    render() {
        let place = document.querySelector(".basket_list");
        if (place) {
            place.innerHTML = "";
            place.style.display = "block";

            const total_cnt = document.createElement("div");
            total_cnt.style.clear = "both";
            total_cnt.innerHTML = `<hr>Всего товаров в корзине: <span id="total_cnt">${this._total_cnt}</span>`;
            place.insertAdjacentElement("beforeend", total_cnt);

            const basket_price = document.createElement("div");
            basket_price.innerHTML = `<hr>Общая стоимость всей корзины: <span id="basket_price">${this._basket_price}</span>`;
            place.insertAdjacentElement("beforeend", basket_price);

            this._items.map((el, index, arr) => {
                const block = el.render();
                place.insertAdjacentElement("afterbegin", block);

                const input = block.querySelector("input");

                //let that = this;

                input.addEventListener("change", (event) => {
                    // чтобы не вводили меньше единицы
                    // TODO перенести в отдельный метод и передавать в него event и elem
                    // не знаю, как третий уровень callback реализовать из-за контекста this - this.changeCount()
                    // не всё перепробовал, может быть следовало просто метод выше реализовывать
                    event.target.value = event.target.value > 0 ? event.target.value : 1;

                    if (el._cnt < event.target.value) {
                        this._total_cnt++;
                        this._basket_price += el._price;
                    } else {
                        this._total_cnt--;
                        this._basket_price -= el._price;
                    }

                    document.getElementById("total_cnt").innerText = this._total_cnt;
                    document.getElementById("basket_price").innerText = this._basket_price;

                    el._cnt = event.target.value;
                });

                // дублирую для keyup, если вручную ставим цифру
                input.addEventListener("keyup", function (event) {
                    event.target.value = event.target.value > 0 ? event.target.value : 1;

                    if (el._cnt < event.target.value) {
                        this._total_cnt++;
                        this._basket_price += el._price;
                    } else {
                        this._total_cnt--;
                        this._basket_price -= el._price;
                    }

                    document.getElementById("total_cnt").innerText = this._total_cnt;
                    document.getElementById("basket_price").innerText = this._basket_price;

                    el._cnt = event.target.value;
                });

                const del = block.querySelector("a");
                del.addEventListener("click", (event) => {

                    this._total_cnt -= el._cnt;
                    this._basket_price -= el._price * el._cnt;

                    document.getElementById("total_cnt").innerText = this._total_cnt;
                    document.getElementById("basket_price").innerText = this._basket_price;

                    arr.splice(index, 1);
                    this._names.splice(index, 1);
                    event.target.parentNode.parentNode.remove();
                });
            });
        }
    };

    changeCount(elem, event) {
        const total_cnt = document.querySelector("total_cnt");
        const basket_price = document.querySelector("basket_price");

        total_cnt.innerHTML = this._total_cnt;
        basket_price.innerHTML = this._basket_price;
    };
}

class CartItem {
    _name = "";
    _price = "";
    _img = "";
    _obj = null;
    _cnt = 1;

    constructor({ _name, _price, _img, obj, _cnt }) {
        this._name = _name;
        this._price = _price;
        this._img = _img;
        this._obj = obj;
        this._cnt = _cnt;
    };

    render() {

        const block = document.createElement("div");
        block.innerHTML = `<div style="clear:both;">
            <img style="width: 50px; float: left;" src="${this._img}" alt="${this._name}">
            <span>${this._name}</span>
            <span>${this._price}</span>
            <input type="number" value="${this._cnt}" style="width: 40px;">
            <a href="#0">Х</a>
        </div>`;

        return block;
    };

}

const CartInstance = new Cart();

new List(CartInstance);

/*
const item = new GoodsItem({ name: "Воронка желоба Евро", price: 250, img: "img/voronka-jeloba-evro.png" });
item.render();
*/