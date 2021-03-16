<template>
  <div class="products_wrap">
    <CatalogItem
      v-for="id in getItemsOnPage"
      :key="id"
      :id="id"
      @bringToBasket="addToCart"
    />
  </div>
</template>

<script>
import CatalogItem from "./CatalogItem.vue";

import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  components: {
    CatalogItem,
  },
  methods: {
    ...mapActions(["requestData", "addToCart"]),
  },
  computed: {
    ...mapGetters(["getItemsOnPage"]),
  },
  created() {
    this.requestData();
  },
};
</script>

<style module>
</style>