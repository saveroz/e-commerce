<template>
<div class="col-3 mt-4">
 <div class="card w-80 hoverable">
  <img :src="product.image" class="card-img-top" alt="...">
  <div class="card-body">
    <p style="font-size:14px;">{{product.name}} <br> {{changeToDollar(product.price)}}</p>

     <router-link :to="'/productDetail/'+product._id" :detailedProduct="product" ><v-btn color="#E0E0E0">Buy</v-btn></router-link>
  </div>
 </div>
</div>
</template>

<script>
import convertToDollar from '../helpers/convertDollar'

export default {
  name: 'product',
  props: {
    product: Object
  },
  methods: {

    changeToDollar (Number) {
      return convertToDollar(Number)
    }
  }

}
</script>

<style scoped src="mdbvue/build/css/mdb.css">

</style>
