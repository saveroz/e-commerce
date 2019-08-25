<template>
<div class="col-4 mt-4">
 <div class="card w-75">
  <img :src="product.image" class="card-img-top" alt="...">
  <div class="card-body">
    <p class="card-text">{{product.name}}</p>
    <p class="card-text">{{product.description}}</p>
    <p class="card-text">{{changeToDollar(product.price)}}</p>
  </div>
    <router-view/>
  <div class="card-footer">
     <router-link :to="'/productDetail/'+product._id" :detailedProduct="product" ><button class="btn btn-secondary" >Details</button></router-link>
     <!-- <router-view/> -->
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

<style>

</style>
