<template>
  <div class="container">
    <div class="row mt-2">
      <div class="col">
        <h2 class="text-center mb-4">Your Carts</h2>
        <cartList></cartList>
        <!-- <button class="btn btn-secondary" @click="goToProfilePage">Go to Transaction</button> -->
      </div>
      <!-- <div class="col col-md-4"> -->
        <!-- <router-view></router-view> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import cartList from '../components/cartList'
export default {
  name: 'UserCarts',
  components: {
    cartList
  },
  data () {
    return {}
  },
  methods: {
      goToProfilePage(){
          this.$router.push({ path: '/userProfile' })
      }

  },
  created() {
    this.$store.dispatch('getAllCarts')
  }
}
</script>

<style>
</style>
