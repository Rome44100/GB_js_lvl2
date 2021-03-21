<template>
  <div class="products_wrap">
    <CatalogItem
      v-for="id in getItemsOnPage"
      :key="id"
      :id="id"
      @bringToBasket="addToCart"
    />
    <Button @clicked="loadMoreData">Загрузить еще!</Button>
  </div>
</template>

<script>
import CatalogItem from "./CatalogItem.vue";

import { mapMutations, mapGetters, mapActions } from "vuex";

import Button from "./Button.vue";

export default {
  components: {
    CatalogItem,
    Button,
  },
  data() {
    return {
      page: 0,
    };
  },
  methods: {
    ...mapActions(["requestData", "addToCart", "requestCart"]),
    loadMoreData() {
      this.page++;
      this.requestData(this.page);
    },
    // travelToCart() {
    //   this.addToCart();
    //   this.requestCart();
    // },
  },
  computed: {
    ...mapGetters(["getItemsOnPage"]),
  },
  created() {
    this.loadMoreData();
    this.requestCart();
  },
};
</script>

<style module>
</style>