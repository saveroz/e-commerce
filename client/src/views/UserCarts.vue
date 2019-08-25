<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col col-md-8">
        <h2 class="text-center mb-4">Your Carts</h2>
        <cartList></cartList>
        <!-- <button class="btn btn-secondary" @click="goToProfilePage">Go to Transaction</button> -->
      </div>
      <div class="col col-md-4">
          <center>
        <button class="btn btn-secondary mt-4" @click="goToProfilePage">Go to Profile Page</button>
          </center>

        <!-- <router-view></router-view> -->

      </div>
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
  mounted () {
    this.$store.dispatch('getAllCarts')
  }
}
</script>

<style>
</style>
