<template>
  <div class="one_product">
    <div class="one_prod_img">
      <a href="detail.html">
        <img :src="getItemData.img" :alt="getItemData.name" loading="lazy" />
      </a>
    </div>
    <div class="one_prod_title">
      <h3>
        <a href="detail.html">{{ getItemData.name }}</a>
      </h3>
    </div>
    <div class="product_buy">
      <div class="price_wrap">
        <div class="price">
          <span class="pre_title">от</span>
          <span class="price_value">{{ getItemData.price }}</span>
          <span class="price_currency">руб.</span>
        </div>
        <div class="product_buy_button">
          <!-- RENDER BUTTON BUY -->
          <button @click="addToCart" class="btn" :id="getItemData.id">
            Купить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    id: String,
  },
  computed: {
    ...mapGetters(["getData"]),
    getItemData() {
      return this.getData[this.id];
    },
  },
  methods: {
    ...mapActions(["addToCart"]),
  },
};
</script>

<style>
</style>