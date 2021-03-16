<template>
  <div class="products_wrap">
    <CatalogItem
      v-for="item in getData"
      :key="item.id"
      :id="item.id"
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
    ...mapGetters(["getData", "getFullPrice"]),
  },
  created() {
    this.requestData();
  },
};
</script>

<style module>
</style>