<template>
  <div>
    <Header />
    <main>
      <h3>Content</h3>
    </main>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  components: {
    Header,
  },
};
</script>

<style module>
.myheader {
  color: red;
}
</style>