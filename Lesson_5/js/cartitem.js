"use strict";

import Button from "../js/button";

export default class CartItem {
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