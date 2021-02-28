"use strict";
// будем показывать только если была прокрутка на одно окон вниз
window.addEventListener('scroll', function () {
    if (pageYOffset < document.documentElement.clientHeight) {
        document.querySelector("#triton_up").style.opacity = "0";
        document.querySelector("#triton_up").style.visibility = "hidden";
    } else {
        document.querySelector("#triton_up").style.opacity = ".4";
        document.querySelector("#triton_up").style.visibility = "visible";
    }
});
// сделаем плавную прокрутку
document.getElementById("triton_up").addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById("top").scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

class FormValidate {
    _checked = false;
    _form = null;
    _reText = /\D./;
    _rePhone = /^\+\d\(\d{3}\)\d{3}-\d{4}$/;
    _reEmail = /^\D.$/;

    constructor(form) {
        this._form = form;

        this.validate();
    };

    validate() {
        if (this._form) {
            this._form.addEventListener("submit", (event) => {
                if (!this.checkField("#introduce", this._reText)
                    || !this.checkField("#phone", this._rePhone)
                    || !this.checkField("#email", this._reEmail)
                ) {
                    event.preventDefault();
                }
            });
        }
    };

    checkField(id, re) {
        const field = this._form.querySelector(id);
        if (field) {
            if (re.test(field.value)) {
                return true;
            } else {
                console.log("Wrong!", id);
                field.parentNode.querySelector("span").style.visibility = "visible";
            }
        }
        return false;
    };
}

const validForm = new FormValidate(document.querySelector("#contacts-form"));