<template>

<div class="container mt-4">
    <center>
<div class="row">
<product v-for="product in allProducts" :key="product.id" v-bind:product="product"></product>
  </div> 
    </center>
  </div>
</template>

<script>
import product from './product'

export default {
  components : {
    product
  },
  mounted: function() {
    this.$store.dispatch("getAllProducts")
  },
  computed : {

    allProducts(){
      return this.$store.state.allProducts
    }
  }

}
</script>

<style scoped>

</style>
