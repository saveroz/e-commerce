<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Product name</th>
          <th scope="col">Product Price</th>
          <th scope="col">amount</th>
          <th scope="col">Subtotal</th>
          <th scope="col">Option</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cart, index) in getAllCarts" :key="index">
          <th scope="row">{{index+1}}</th>
          <td>{{cart.ProductId.name}}</td>
          <td>{{cart.ProductId.price}}</td>
          <td>{{cart.amount}}</td>
          <td v-text="getSubTotal(cart)"></td>
          <td>
            <button @click="removeCart(cart._id)" class="btn btn-secondary">remove</button>
          </td>
        </tr>
        <tr>
          <th></th>
          <td>Total Price</td>
          <td></td>
          <td></td>
          <td>{{getTotalPriceComputed}}</td>
        </tr>
      </tbody>
    </table>
    <div style="display:flex;justify-content:center">
      <button class="btn btn-secondary" @click="createTransaction">Checkout</button>
    </div>
  </div>
</template>

<script>
import convertToDollar from '../helpers/convertDollar'
import Vue from 'vue'
export default {
  name: 'cartList',
  data () {
    return {
      totalPrice: 0,
      allCarts: []
    }
  },
  methods: {
    getSubTotal (cart) {
      let number = Number(cart.amount * cart.ProductId.price)
      //   console.log(this.totalPrice);
      return convertToDollar(number)
    },
    getTotalPrice () {
      return convertToDollar(this.totalPrice)
    },
    createTransaction () {
      let totalPrice = this.totalPrice
      let CartId = []
      for (let cart of this.allCarts) {
        CartId.push(cart._id)
      }
      let payload = {
        totalPrice,
        CartId
      }

      Vue.swal.fire({
        title: 'Creating your transactions...',
        allowOutsideClick: () => !Vue.swal.isLoading()
      })
      Vue.swal.showLoading()

      this.$store.dispatch('createTransaction', payload)
    },
    removeCart (id) {
      console.log(id);
      Vue.swal
        .fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        })
        .then(result => {
          if (result.value) {
            // console.log("masuk ke delete")
            this.$store.dispatch('removeCart', id)
          }
        })
    }
  },
  computed: {
    getAllCarts () {
      return this.$store.state.allCarts
    },
    getTotalPriceComputed () {
      this.allCarts = this.$store.state.allCarts

      let allCarts = this.allCarts
      this.totalPrice = 0
      for (let cart of allCarts) {
        let price = cart.amount * cart.ProductId.price
        this.totalPrice += price
      }

      return convertToDollar(this.totalPrice)
    }
  },
  mounted () {
    this.allCarts = this.$store.state.allCarts
    //   let allCarts = this.allCarts;
    // //   let this.totalPrice = 0;
    //   for (let cart of allCarts) {
    //     let price = cart.amount * cart.ProductId.price;
    //     this.totalPrice += price;
    //   }
  },
  created () {
    //   this.allCarts = this.$store.state.allCarts;
    //   let allCarts = this.allCarts;
    // //   let this.totalPrice = 0;
    //   for (let cart of allCarts) {
    //     let price = cart.amount * cart.ProductId.price;
    //     this.totalPrice += price;
    //   }
  }
}
</script>

<style>
</style>
