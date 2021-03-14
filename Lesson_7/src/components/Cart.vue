<template>
  <div>
    Корзина пуста {{ getData }}
    <CartItem
      v-for="item in elems"
      :key="item.id"
      :id="item.id"
      :img="item.img"
      :name="item.name"
      :price="item.price"
    />
    <!-- <div style="clear: both">
      <hr />
      Всего товаров в корзине: <span id="total_cnt">0</span>
    </div> -->
    <div>
      <hr />
      Общая стоимость всей корзины:
      <span id="basket_price">{{ getFullPrice }}</span>
    </div>
  </div>
</template>

<script>
import CartItem from "./CartItem.vue";

import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      elems: [],
      totalCnt: 0,
      totalPrice: 0,
    };
  },
  methods: {
    //...mapMutations(["setData"]),
    ...mapActions(["requestData"]),
  },
  computed: {
    ...mapGetters(["getData", "getFullPrice"]),
  },
  created() {
    this.requestData(1);
  },
  components: {
    CartItem,
  },
};
</script>

<style module>
</style>