"use strict";

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    // состояние хранилища
    state: {
        // данные о товарах
        data: {},
        itemsOnPage: {},
        itemsInCart: {}
    },
    // изменение состояния
    mutations: {
        setData(state, payload) {
            state.data = payload.newData;
            state.itemsOnPage = Object.keys(payload.newData);
        },
    },
    getters: {
        getData: state => state.data,
        getItemsOnPage: state => state.itemsOnPage,
        getFullPrice: state => {
            console.log(state);
            const keys = state.itemsOnPage;
            return keys.reduce((res, cur) => res + state.data[cur].price, 0);
        }
    },
    // логика в рамках хранилища, но не могу изменять состояние
    actions: {
        requestData({ commit, state }, page) {
            //console.log(state);
            fetch(`/public/database/items${page}.json`)
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    commit('setData', { newData: res });
                });
        }
    },
});