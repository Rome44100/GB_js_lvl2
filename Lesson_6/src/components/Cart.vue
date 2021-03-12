<template>
  <div class="basket_list" style="right: 0px; width: 50vw; display: block">
    Корзина пуста
    <CartItem
      v-for="item in elems"
      :key="item.id"
      :id="item.id"
      :img="item.img"
      :name="item.name"
      :price="item.price"
    />
    <div style="clear: both">
      <hr />
      Всего товаров в корзине: <span id="total_cnt">0</span>
    </div>
    <div>
      <hr />
      Общая стоимость всей корзины: <span id="basket_price">0</span>
    </div>
  </div>
</template>

<script>
import CartItem from "./CartItem.vue";

export default {
  data() {
    return {
      elems: [],
      totalCnt: 0,
      totalPrice: 0,
    };
  },
  components: {
    CartItem,
  },
};
</script>

<style>
</style>