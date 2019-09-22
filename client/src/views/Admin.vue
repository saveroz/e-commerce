<template>
  <div class="container">
    <div class="mt-4"   style="display:flex;justify-content:center">
      <v-btn color="#E0E0E0" class="mr-2" @click="gotoProduct">See Product</v-btn>
      <v-btn color="#E0E0E0" class="ml-2" @click="gotoTransaction">See Transaction</v-btn>
    </div>
    <router-view class="mt-4"></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    gotoProduct() {
      this.$router.push("/admin/products");
    },
    gotoTransaction(){
        this.$router.push("/admin/transactions")
    }
  }
};
</script>

<style>
</style>
