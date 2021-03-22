<template>
  <div>
    <div style="clear: both">
      <img style="width: 50px; float: left" :src="img" :alt="name" />
      <span>{{ name }}</span>
      <span>{{ price }}</span>
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
export default {
  props: {
    id: Number,
    img: String,
    name: String,
    price: Number,
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