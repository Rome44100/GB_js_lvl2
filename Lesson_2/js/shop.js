"use strict";

class List {
    _items = [];

    constructor(CartInstance) {
        let goods = this.fetchGoods();

        goods = goods.map(el => {
            return new GoodsItem(el, CartInstance);
        });

        this._items = goods;

        this.render();
    }

    fetchGoods() {
        return [
            { name: "Воронка желоба Евро", price: 250, img: "img/voronka-jeloba-evro.png" },
            { name: "Заглушка желоба с резиновым уплотнителем", price: 160, img: "img/voronka-jeloba-evro.png" },
            { name: "Желоб водосточный Евро", price: 360, img: "img/voronka-jeloba-evro.png" },
            { name: "Соединитель желоба", price: 760, img: "img/voronka-jeloba-evro.png" }
        ]
    }

    render() {
        this._items.forEach(Elem => {
            Elem.render();
        });
    }
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

class Cart {
    _items = [];
    _names = [];

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

        this.convertToObj();

        this.render(Obj);
    };

    convertToObj() {
        let goods = null;
        goods = this._items.map(el => {
            //console.log(el);
            return new CartItem(el);
        });

        this._items = goods;
    }

    render() {
        let place = document.querySelector(".basket_list");
        if (place) {
            place.innerHTML = "";
            place.style.display = "block";
            this._items.forEach(el => {
                place.appendChild(el.render());
            });
        }
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