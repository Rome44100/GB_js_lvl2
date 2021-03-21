"use strict";

export default class Button {
    _text = "";
    _callback = null;
    _id = null;
    _placeToRender = null;

    constructor(text, callback) {
        this._text = text;
        this._callback = callback;
        this._id = Date.now() + Math.round(Math.random() * 100000); // можно hash добавить, random и пр.
        //this.render();
    };

    onBtnClick() {
        //console.log("Was clicked!");
        const callback = this._callback;
        if (typeof callback === "function") {
            callback();
        }
    };

    getTemplate() {
        const btn = document.createElement("button");
        btn.classList.add("btn");
        btn.id = this._id;

        return btn;
    };

    render(placeToRender) {
        //const placeToRender = document.querySelector(".btns");
        if (placeToRender) {
            this._placeToRender = placeToRender;
            const btn = this.getTemplate();
            btn.innerHTML = this._text;
            placeToRender.appendChild(btn);

            btn.addEventListener("click", () => {
                this.onBtnClick();
            });
        }
    };

    destroy() {
        const el = this._placeToRender.querySelector(`[id = "${this._id}"]`);
        el.parentNode.removeChild(el);
    }
}

class AlertButton extends Button {
    constructor(text) {
        super(text);
    }

    onBtnClick() {
        alert("Was clicked!");
    }
}

const NewButton = new Button("My button");

const AlertBut = new AlertButton("My button");