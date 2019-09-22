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
              <v-btn
                v-if="theProduct.stock>0"
                color="#E0E0E0"
                @click.prevent="addToCart"
              >Add To Cart</v-btn>
              <button
                v-if="theProduct.stock<=0"
                class="btn btn-secondary"
                disabled="disabled"
              >Out Of Stock !</button>
            </b-form>
          </div>
        </div>
          <v-btn @click="isReviewModal=true" color="#E0E0E0">Give Review</v-btn>
      </div>
      <!-- <h3>Review</h3> -->
      <div>
      <review v-for="review in productReviews" :key="review._id" :review="review"></review>
      
      </div>
    </center>

    <!-- Modal untuk give review -->
    <b-modal id="modal-review" v-model="isReviewModal">
      <b-form @submit.prevent="addReview" id="reviewForm">
        <b-form-group label="Enter your review" label-for="review">
          <b-form-input type="text" v-model="reviewForm.content" placeholder="your review" required></b-form-input>
        </b-form-group>
        <b-form-group label="rating" label-for="person">
          <b-form-input
            type="number"
            max="5"
            min="0"
            v-model="reviewForm.rating"
            placeholder="rating"
            required
          ></b-form-input>
        </b-form-group>
      </b-form>
      <div slot="modal-footer">
        <b-button variant="primary" data-dismiss="modal" type="submit" form="reviewForm">Confirm</b-button>
      </div>
    </b-modal>

  </div>
</template>

<script>
import navbar from '../components/navbar'
import product from '../components/product'
import convertToDollar from '../helpers/convertDollar'
import review from "../components/review"

export default {
  name: 'productsPage',
  components : {
    review
  },
  data () {
    return {
      amount: 0,
      ProductId: '',
      isReviewModal : false,
      reviewForm : {
        rating : 0,
        content : ""
      }
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
        this.$swal.fire({
          title: 'Adding To Your Cart',
          allowOutsideClick: () => !this.$swal.isLoading()
        })
        this.$swal.showLoading()
        this.$store.dispatch('addToCart', cart)
      } 
      else {
        this.$swal.fire({
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
    },
    addReview(){
      let ProductId = this.$route.params.id
      let obj = {
        ProductId,
        content : this.reviewForm.content,
        rating : this.reviewForm.rating
      }
      this.$swal.showLoading()
      this.$store.dispatch("addReview", obj)
      .then((success)=>{
        this.reviewForm.content=""
        this.reviewForm.rating=0
        this.isReviewModal = false
        this.$swal.close()
        this.$swal.fire({
          type : "success",
          title : "success to post review"
        })
      })
      .catch(err=>{
        this.isReviewModal = false
        this.$swal.close()
        console.log(err)
        let message = err.response.data && err.response.data.message || "failed to post review"
        this.$swal.fire({
          type : "error",
          title : "Failed to Post Review",
          text : message
        })
      })
    }
  },
  computed: {
    theProduct () {
      this.productId = this.$store.state.productDetails._id
      return this.$store.state.productDetails
    },
    productReviews(){
      console.log(this.$store.state.productReviews)
      return this.$store.state.productReviews
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
