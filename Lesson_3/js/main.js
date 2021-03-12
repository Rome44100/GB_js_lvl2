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