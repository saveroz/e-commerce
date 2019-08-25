<template>
  <div>
    <center>
      <div class="container mt-5">
        <div class="row px-5">
          <div class="col-4">
            <img :src="theProduct.image" class="img-fluid" />
          </div>

          <div class="col-6">
            <h4>{{theProduct.name}}</h4>
            <!-- <p>{{theProduct._id}}</p> -->
            <br />
            <p class="text-justify">{{theProduct.description}}</p>
            <p>price : {{changeToDollar(theProduct.price)}}</p>
            <b-form inline class="mt-5" style="display:flex;justify-content:center">
              <b-input
                v-model="amount"
                class="mr-3"
                type="number"
                value="1"
                min="1"
                :max="theProduct.stock"
                style="width:4rem;"
              ></b-input>

              <button
                v-if="theProduct.stock>0"
                class="btn btn-secondary"
                @click.prevent="addToCart"
              >Add To Cart</button>
              <button
                v-if="theProduct.stock<=0"
                class="btn btn-secondary"
                disabled="disabled"
              >Out Of Stock !</button>
            </b-form>
          </div>
        </div>
      </div>
    </center>
  </div>
</template>

<script>
import navbar from '../components/navbar'
import product from '../components/product'
import convertToDollar from '../helpers/convertDollar'
import Vue from 'vue'

export default {
  name: 'productsPage',
  data () {
    return {
      amount: 0,
      ProductId: ''
      // product : this.theProduct.id
    }
  },
  methods: {
    addToCart () {
      let product = this.$store.state.productDetails
      // console.log(product._id)
      let loginStatus = this.$store.state.isLogin
      let cart = {
        amount: this.amount,
        ProductId: product._id
      }

      if (loginStatus) {
        Vue.swal.fire({
          title: 'Adding To Your Cart',
          allowOutsideClick: () => !Vue.swal.isLoading()
        })
        Vue.swal.showLoading()

        this.$store.dispatch('addToCart', cart)
      } else {
        Vue.swal.fire({
          type: 'error',
          title: 'You have to log in first!',
          showConfirmButton: false,
          timer: 1500
        })
        // console.log("You have to login first")
      }
    },
    changeToDollar (Number) {
      return convertToDollar(Number)
    }
  },
  computed: {
    theProduct () {
      this.productId = this.$store.state.productDetails._id
      return this.$store.state.productDetails
    }
  },
  mounted () {
    let id = this.$route.params.id
    this.$store.dispatch('getOneProduct', id)
  }
}
</script>

<style>
</style>
