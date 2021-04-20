<template>
  <div>
    <Cart />
    <Catalog />
    <AddForm />
  </div>
</template>

<script>
import Catalog from "./components/Catalog.vue";
import Cart from "./components/Cart.vue";
import AddForm from "./components/AddForm.vue";

export default {
  components: {
    Catalog,
    Cart,
    AddForm,
  },
};
</script>

<style module>
</style>