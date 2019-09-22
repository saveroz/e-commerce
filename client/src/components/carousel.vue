<template>
  <div>
    <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        :src="slide"
      ></v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>

export default {
  data() {
    return {
      slides: [
        "https://static.patek.com/images/articles/banner/1600/4947R_001_1.jpg",
        "https://static.patek.com/images/articles/banner/1600/5205R_001_1.jpg",
        "https://static.patek.com/images/articles/banner/1600/5396G_011_1.jpg",
        "https://static.patek.com/images/articles/banner/1600/5230G_014_1.jpg"
      ],
      model: true
    };
  }
};
</script>

<style>
</style>
