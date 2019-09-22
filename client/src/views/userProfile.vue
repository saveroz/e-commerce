<template>
<div class="container mt-4">
  <center>
  <!-- <h2>User Profile</h2> -->
  </center>
  <div class="row justify-content-md-center">
    <!-- <div class="mr-4">
      <button class="btn btn-secondary">See Your Profile</button>
  </div> -->
  <div class="ml-4">
    <router-link style="text-decoration: none;" to="/userProfile/transactionHistory">
    <v-btn color="#E0E0E0" class="mr-4">Transaction History</v-btn>
    </router-link>
    <router-link style="text-decoration: none;" to="/userProfile/usercarts">
    <v-btn color="#E0E0E0" class="ml-4">Carts</v-btn>
    </router-link>
  </div>
</div>
<router-view></router-view>
</div>
</template>

<script>
export default {
  name: 'userProfile',
  data () {
    return {

    }
  },
  methods: {
    // goToTransactionPage(){
    //   this.$router.push({ path: "userProfile/transactionHistory" })
    // }
  }

}
</script>

<style scoped>

</style>
