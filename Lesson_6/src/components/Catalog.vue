<template>
  <div class="products_wrap">
    <CatalogItem
      v-for="item in elems"
      :key="item.id"
      :img="item.img"
      :name="item.name"
      :price="item.price"
    />
  </div>
</template>

<script>
import CatalogItem from "./CatalogItem.vue";

export default {
  data() {
    return {
      elems: [
        {
          id: 1,
          name: "Воронка желоба Евро",
          price: 250,
          img: "img/voronka-jeloba-evro.png",
        },
        {
          id: 2,
          name: "Заглушка желоба с резиновым уплотнителем",
          price: 160,
          img: "img/voronka-jeloba-evro.png",
        },
        {
          id: 3,
          name: "Желоб водосточный Евро",
          price: 360,
          img: "img/voronka-jeloba-evro.png",
        },
        {
          id: 4,
          name: "Соединитель желоба",
          price: 760,
          img: "img/voronka-jeloba-evro.png",
        },
      ],
    };
  },
  components: {
    CatalogItem,
  },
};
</script>

<style module>
</style>