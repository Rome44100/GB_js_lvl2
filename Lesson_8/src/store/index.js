"use strict";

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    // состояние хранилища
    state: {
        // данные о товарах
        data: {},
        // массив id, размещенных на странице
        itemsOnPage: [],
        // массив id, размещенных в корзине
        itemsInCart: []
    },
    // изменение состояния
    mutations: {
        setData(state, payload) {
            state.data = { ...state.data, ...payload.newData };
            state.itemsOnPage.push(...Object.keys(payload.newData));
        },
        setBasket(state, id) {
            //console.log(id);
            //console.log(state.itemsInCart);
            if (!state.itemsInCart.includes(id)) {
                state.itemsInCart.push(id);
            }
        }
    },
    getters: {
        getData: state => state.data,
        getItemsOnPage: state => state.itemsOnPage,
        getFullPrice: state => {
            const keys = state.itemsInCart;
            return keys.reduce((res, cur) => res + state.data[cur].price, 0);
        },
        getItemsInCart: state => state.itemsInCart,
    },
    // логика в рамках хранилища, но не могут изменять состояние
    actions: {
        requestData({ commit, state }, page = "") {
            //fetch(`/public/database/items${page}.json`)
            fetch(`/itemslist/${page}`, {
                method: "GET",
            })
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    commit('setData', { newData: res });
                });
        },
        requestCart({ commit, state }) {
            fetch('/basket', {
                method: "GET",
            })
                .then(res => {
                    //console.log("First then setBasket! res = ", res);
                    return res.json();
                })
                .then(res => {
                    //console.log("second then set basket, res = ", res);
                    //return res;
                    // if (Object.keys(res).length == 0) {
                    //     console.log("res = 0");
                    // }
                    for (let i in res) {
                        let id = res[i].id;
                        //console.log("second then for commit setBasket!");
                        commit('setBasket', id);
                    }
                });
        },
        //addToCart({ commit }, id) {
        addToCart({ commit }, data) {
            //console.log(id.target.id);
            //commit("setBasket", id.target.id);
            fetch("/basket", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    //this.requestCart();
                    //console.log(res);
                    //commit('setBasket', res.id);
                    for (let i in res) {
                        let id = res[i].id;
                        //console.log("second then for commit setBasket!");
                        commit('setBasket', id);
                    }
                });
        },
        addItem({ }, data) {
            fetch("/itemslist/", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    //console.log(res);
                });
        }
    },
    updated: function () {
        console.log("updated");
        this.requestCart();
    },
});