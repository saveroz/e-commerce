<template>
<div class="container">
  <h2 class="text-center mt-4 mb-4">Transaction History</h2>
  <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Product</th>
      <th scope="col">Quantity</th>
      <th scope="col">Price</th>
      <th scope="col">Total Price</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(transaction,index) in userTransactions" :key="index">
      <th scope="row">{{index+1}}</th>
      <td><li v-for="(cart,index) in transaction.CartId" :key="index">{{cart.ProductId.name}}</li> </td>
      <td><li v-for="(cart,index) in transaction.CartId" :key="index">{{cart.amount}}</li></td>
      <td><li v-for="(cart,index) in transaction.CartId" :key="index">{{changeToDollar(cart.ProductId.price)}}</li></td>
      <td>{{changeToDollar(transaction.totalPrice)}}</td>
    </tr>
    
  </tbody>
</table>

</div>
  
</template>

<script>
import convertToDollar from "../helpers/convertDollar";

export default {
  name : "transactionHistoryPage",
  data(){
    return{

    }
  },
  methods : {

    changeToDollar(Number) {
      return convertToDollar(Number);
    }
  },
  computed : {

    userTransactions(){
      return this.$store.state.userTransactions
    }
    

  },
  mounted(){
    this.$store.dispatch("getAllUserTransactions")
  }

}
</script>

<style>

</style>
