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
  props : {
    allProducts : Array
  },
  components: {
    product
  },
  mounted: function () {
    
  },
  computed: {

   
  }

}
</script>

<style >

</style>
