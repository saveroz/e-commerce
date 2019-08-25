import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

const users_url = 'http://localhost:3000/users/'
const products_url = 'http://localhost:3000/products/'
const cart_url = 'http://localhost:3000/carts'
const transaction_url = 'http://localhost:3000/transactions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userTransactions: [],
    isLogin: false,
    allProducts: [],
    productDetails: {},
    allCarts: [],
    username: ''
  },
  mutations: {

    LOGIN_STATUS (state, payload) {
      // console.log(payload)
      state.isLogin = payload
    },
    ALL_PRODUCTS (state, payload) {
      state.allProducts = payload
    },
    PRODUCT_DETAILS (state, payload) {
      state.productDetails = payload
    },
    ALL_CARTS (state, payload) {
      state.allCarts = payload
    },
    ALL_USER_TRANSACTIONS (state, payload) {
      state.userTransactions = payload
    },

    USERNAME_LOGIN (state, payload) {
      state.username = payload
    }

  },
  actions: {

    userLogin ({ commit }, payload) {
      let email = payload.email
      let password = payload.password

      axios({
        url: `${users_url}/login`,
        method: 'POST',
        data: { email, password }
      })
        .then(response => {
          console.log(response.data)
          let token = response.data.token
          let username = response.data.username
          localStorage.setItem('token', token)
          commit('LOGIN_STATUS', true)
          commit('USERNAME_LOGIN', username)
          Vue.swal.close()
          Vue.swal.fire({
            type: 'success',
            title: 'You Have successfully Login!',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    userRegister ({ commit }, payload) {
      console.log(payload)
      let email = payload.email
      let password = payload.password
      let username = payload.username

      axios({
        url: `${users_url}/register`,
        method: 'POST',
        data: {
          email,
          password,
          username
        }
      })
        .then(response => {
          console.log(response.data)
          Vue.swal.fire({
            type: 'success',
            title: 'You Have successfully register account!',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          // console.log(err.response.data.message)
          let message = err.response.data.message
          Vue.swal.fire({
            type: 'error',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    getAllProducts ({ commit }) {
      axios({
        url: `${products_url}`,
        method: 'GET'
      })
        .then(response => {
          console.log(response.data)
          let products = response.data
          commit('ALL_PRODUCTS', products)
        })
        .catch(err => {
          console.log(err)
          let message = err.response.data.message
          Vue.swal.fire({
            type: 'error',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    getOneProduct ({ commit }, id) {
      axios({
        url: `${products_url}/${id}`,
        method: 'GET'
      })
        .then(response => {
          console.log(response.data)
          commit('PRODUCT_DETAILS', response.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addToCart ({ commit }, payload) {
      let token = localStorage.getItem('token')
      // console.log(payload,"masuk ke addtocart di store")
      axios({
        url: `${cart_url}`,
        method: 'POST',
        data: payload,
        headers: {
          token
        }
      })
        .then(response => {
          Vue.swal.close()
          Vue.swal.fire({
            type: 'success',
            title: 'You Have successfully added product !',
            showConfirmButton: false,
            timer: 1500
          })
          // console.log(response.data,"response data")
        })
        .catch(err => {
          let message = err.response.data.message
          Vue.swal.fire({
            type: 'error',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })

          // console.log(err,"masuk ke error addtocart")
        })
    },
    getAllCarts ({ commit }) {
      let token = localStorage.getItem('token')
      axios({
        method: 'GET',
        url: `${cart_url}`,
        headers: {
          token
        }
      })
        .then(response => {
          console.log(response.data)
          let allcarts = response.data
          let cartsNotBought = []
          for (let cart of allcarts) {
            if (!cart.status) {
              cartsNotBought.push(cart)
            }
          }
          commit('ALL_CARTS', cartsNotBought)
        })
        .catch(err => {
          // console.log(err.response.data.message)
          let message = err.response.data.message
          Vue.swal.fire({
            type: 'error',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    removeCart ({ commit, dispatch }, id) {
      let token = localStorage.getItem('token')
      // console.log("di dispatch",id)
      axios({
        url: `${cart_url}/${id}`,
        method: 'DELETE',
        headers: { token }
      })
        .then(response => {
          console.log(response)
          dispatch('getAllCarts')
          Vue.swal.fire(
            'Deleted!',
            'Your Cart has been deleted.',
            'success'
          )
        })
        .catch(err => {
          // console.log(err)
          let message = err.response.data.message
          Vue.swal.fire({
            type: 'error',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    createTransaction ({ commit, dispatch }, payload) {
      let token = localStorage.getItem('token')

      axios({
        url: `${transaction_url}`,
        method: 'POST',
        data: payload,
        headers: {
          token
        }
      })
        .then(response => {
          console.log(response.data)
          Vue.swal.close()
          Vue.swal.fire({
            type: 'success',
            title: 'You Have successfully created transaction !',
            showConfirmButton: false,
            timer: 1500
          })
          dispatch('getAllCarts')
        })
        .catch(err => {
          // console.log(err.response.data.message)
          let message = err.response.data.message
          Vue.swal.fire({
            type: 'error',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    getAllUserTransactions ({ commit }) {
      let token = localStorage.getItem('token')

      axios({
        url: `${transaction_url}`,
        method: 'GET',
        headers: { token }
      })
        .then(response => {
          let allTransactions = response.data
          commit('ALL_USER_TRANSACTIONS', allTransactions)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
