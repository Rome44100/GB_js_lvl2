<template>
  <div :class="$style.basket_vue">
    Корзина пуста
    <CartItem v-for="id in getItemsInCart" :key="id" :id="id" />
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
  methods: {},
  computed: {
    ...mapGetters(["getItemsInCart", "getFullPrice"]),
  },
  components: {
    CartItem,
  },
};
</script>

<style module>
.basket_vue {
  margin: 0 0 40px;
}
</style>