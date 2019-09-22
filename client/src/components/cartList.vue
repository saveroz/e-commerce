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
          <td>{{getPrice(cart.ProductId.price)}}</td>
          <td>{{cart.amount}}</td>
          <td v-text="getSubTotal(cart)"></td>
          <td>
            <v-btn @click="removeCart(cart._id)" color="#E0E0E0">remove</v-btn>
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
      <v-btn color="#E0E0E0" @click="createTransaction">Checkout</v-btn>
    </div>
  </div>
</template>

<script>
import convertToDollar from '../helpers/convertDollar'

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
    getPrice (price) {
      return convertToDollar(price)
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

      this.$swal.fire({
        title: 'Creating your transactions...',
        allowOutsideClick: () => !this.$swal.isLoading()
      })
      this.$swal.showLoading()

      this.$store.dispatch('createTransaction', payload)
    },
    removeCart (id) {
      console.log(id);
      this.$swal.fire({
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
    // this.allCarts = this.$store.state.allCarts
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
