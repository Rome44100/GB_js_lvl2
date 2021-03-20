<template>
  <div>
    <div style="clear: both">
      <img
        style="width: 50px; float: left"
        :src="getItemData.img"
        :alt="getItemData.name"
      />
      <span>{{ getItemData.name }}</span>
      <span>{{ getItemData.price }}</span>
      <input
        type="number"
        value="1"
        style="width: 40px"
        @keyup="changeCnt"
        @change="changeCnt"
      />
      <a href="#0" @click="destroy">Х</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    id: Number,
  },
  computed: {
    ...mapGetters(["getData"]),
    getItemData() {
      return this.getData[this.id];
    },
  },
  methods: {
    destroy() {
      // убираем элемент из корзины + меняем счетчик, если он не один в корзине
    },
    changeCnt() {
      // меняем счетчик и обновляем общую сумму в корзине
    },
  },
};
</script>

<style>
</style>