"use strict";

import Button from "../js/button";

import AbstractList from "../js/abastractlist";

import GoodsItem from "../js/goodsitem";

export default class List extends AbstractList {

    _elemsAddCnt = 1;
    _url = `${document.location.protocol}//${document.location.host}/database/items.json`;
    _cartInstance = null;

    constructor(CartInstance) {
        // при переопределении конструктора родителя нужно обязательно вызывать super
        // при этом если нет аргументов у родителя, то можно и без них в дочернем вызывать super
        super();

        this._cartInstance = CartInstance;

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
                    return new GoodsItem(el, this._cartInstance);
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