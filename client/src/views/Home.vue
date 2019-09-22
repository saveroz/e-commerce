<template>

  <div class="home">
    <carousel class="container mt-4"></carousel>
    <productsList :allProducts="allProducts"></productsList>
  </div>
</template>

<script>
// @ is an alias to /src
import navbar from '../components/navbar'
import productsList from '../components/productList'
import carousel from "../components/carousel"
export default {
  name: 'home',
  components: {
    productsList,
    navbar,
    carousel

  },
  data () {
    return {
      isLogin: false
    }
  },
  computed : {
     allProducts () {
      return this.$store.state.allProducts
    }
  },
  created(){
    this.$store.dispatch('getAllProducts')
  }
}
</script>
