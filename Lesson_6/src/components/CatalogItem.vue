<template>
  <div class="one_product">
    <div class="one_prod_img">
      <a href="detail.html">
        <img :src="img" :alt="name" loading="lazy" />
      </a>
    </div>
    <div class="one_prod_title">
      <h3>
        <a href="detail.html">{{ name }}</a>
      </h3>
    </div>
    <div class="product_buy">
      <div class="price_wrap">
        <div class="price">
          <span class="pre_title">от</span>
          <span class="price_value">{{ price }}</span>
          <span class="price_currency">руб.</span>
        </div>
        <div class="product_buy_button">
          <!-- RENDER BUTTON BUY -->
          <button @click="addToCart" class="btn">Купить</button>
        </div>
      </div>
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
    addToCart() {
      this.$emit("bringToBasket", { id: this.id });
    },
  },
};
</script>

<style>
</style>