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
            state.data = payload.newData;
            state.itemsOnPage = Object.keys(payload.newData);
        },
        setBasket(state, id) {
            state.itemsInCart.push(id);
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
            fetch(`/public/database/items${page}.json`)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    commit('setData', { newData: res });
                });
        },
        addToCart(id) {
            this.commit("setBasket", id);
        }
    },
});