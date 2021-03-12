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
    _form = null;
    _reText = /\D./;
    _rePhone = /^\+\d\(\d{3}\)\d{3}-\d{4}$/;
    _reEmail = /^[^\.-][\w+\.-]+\@[A-Za-z0-9\.]+\.[A-Za-z0-9]+[^\.]$/;
    // начинать с точки или дефиса нельзя
    // [цифра, лат.буква, подчеркивание, точка, дефис] 1 или > подряд, 
    // @ 
    // [лат. буква, цифра или точка] 1 или > подряд // здесь не может быть до разделяющей точки еще точка, не учел этот момент
    // затем точка
    // [затем лат.буква, цифра] 1 или > подряд // для домена 1 ур. стоит считать количество, т.к. наверное не может быть один символ
    // точкой заканчивать нельзя

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
                console.log("Wrong", id);
                field.parentNode.querySelector("span").style.visibility = "visible";
            }
        }
        return false;
    };
}

const validForm = new FormValidate(document.querySelector("#contacts-form"));