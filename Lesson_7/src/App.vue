<template>
  <div>
    <Cart />
    <Catalog />
  </div>
</template>

<script>
import Catalog from "./components/Catalog.vue";

import Cart from "./components/Cart.vue";

export default {
  components: {
    Catalog,
    Cart,
  },
};
</script>

<style module>
</style>