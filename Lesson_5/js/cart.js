"use strict";

import AbstractList from "../js/abastractlist";

import CartItem from "../js/cartitem";

export default class Cart extends AbstractList {
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