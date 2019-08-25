<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col col-md-8">
        <h2 class="text-center mb-4">Your Carts</h2>
        <cartList></cartList>
      </div>
      <div class="col col-md-4">
          <center>
        <h2>Garpit for Life</h2>

          </center>

        <!-- <router-view></router-view> -->
        
      </div>
    </div>
  </div>
</template>

<script>
import cartList from "../components/cartList";
export default {
  name: "UserCarts",
  components: {
    cartList
  },
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getAllCarts");
  }
};
</script>

<style>
</style>
