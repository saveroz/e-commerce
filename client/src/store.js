import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

const base_url = "http://localhost:3000"
const users_url = `${base_url}/users/`
const products_url = `${base_url}/products/`
const cart_url = `${base_url}/carts`
const transaction_url = `${base_url}/transactions`

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userTransactions: [],
    allTransactions : [],
    isLogin: false,
    allProducts: [],
    tempProducts : [],
    productDetails: {},
    allCarts: [],
    username : "",
    productReviews : [],
    role : ""
  },
  mutations: {

    LOGIN_STATUS (state, payload) {
      // console.log(payload)
      state.isLogin = payload
    },
    ALL_PRODUCTS (state, payload) {
      state.allProducts = payload
      state.tempProducts = payload
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
    ALL_ADMIN_TRANSACTIONS(state, payload){
      state.allTransactions = payload
    },
    CURRENT_USER(state,payload){
      state.username = payload.username
      state.role = payload.role
    },
    PRODUCT_REVIEW(state, payload){
      state.productReviews = payload
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
          let obj = {
            username : response.data.username,
            role : response.data.role
          }
          localStorage.setItem('token', token)
          localStorage.setItem("username", obj.username)
          localStorage.setItem("role", obj.role)
          commit('LOGIN_STATUS', true)
          commit('CURRENT_USER', obj)
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
          Vue.swal.close()
          let message = err.response.data.message || "please check your email / password again"
          Vue.swal.fire({
            type : "error",
            title : "failed to login",
            text : message
          })
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
          // console.log(response.data)
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
    getOneProduct ({ commit, dispatch }, id) {
      axios({
        url: `${products_url}/${id}`,
        method: 'GET'
      })
        .then(response => {
          // console.log(response.data)
          dispatch("getReview", id)
          commit('PRODUCT_DETAILS', response.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addToCart ({ commit }, payload) {
      let token = localStorage.getItem('token')
      console.log(payload,"masuk ke addtocart di store")
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
          console.log(response.data,"response data")
        })
        .catch(err => {
          console.log(err.response.data)
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
        url: `${transaction_url}/user`,
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
    },
    removeProduct({commit, dispatch}, payload){

      return new Promise((resolve, reject)=>{
        let token = localStorage.getItem("token")
        let id = payload
        axios({
          url : `${products_url}/${id}`,
          method : "DELETE",
          headers : {token}
        })
        .then(response=>{
          // console.log(response.data)
          resolve("success")
          dispatch("getAllProducts")
        })
        .catch(err=>{
          reject(err)
        })
      })
    },
    addProduct({commit, dispatch}, payload){

      return new Promise((resolve,reject)=>{
        let token = localStorage.getItem("token")
        axios({
          url : `${products_url}`,
          method : "POST",
          headers : {token},
          data : payload
        })
        .then(response=>{
          console.log("sebelum then")
          console.log(response.data)
          dispatch("getAllProducts")
          resolve("success")
        })
        .catch(err=>{
          // console.log(err.response.data)
          reject(err)
        })
      })
    },

    editProduct({commit, dispatch}, payload){

      return new Promise((resolve, reject)=>{

        let id = payload.id
        let data = payload.data
        let token = localStorage.getItem("token")
        axios({
          url : `${products_url}/${id}`,
          method : "PATCH",
          headers : {token},
          data 
        })
        .then(response=>{
          console.log(response.data)
          
          dispatch("getAllProducts")
          resolve("success")
        })
        .catch(err=>{
          reject(err)
        })
      })
    },
    getAllTransactions({commit}, payload){

      let token = localStorage.getItem("token")
      axios({
        url : `${transaction_url}`,
        method : "GET",
        headers : {token}
      })
      .then(response =>{
        let transactions = response.data
        commit("ALL_ADMIN_TRANSACTIONS", transactions)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    updateTransaction({commit, dispatch}, payload){

      let token = localStorage.getItem("token")
      let id = payload.id
      let updatedData = payload.data
      // letpayload.data
      Vue.swal.showLoading()
      axios({
        url : `${transaction_url}/${id}`,
        method : "PATCH",
        headers : {token},
        data : updatedData
      })
      .then(response=>{
        console.log(response.data)
        Vue.swal.close()
        Vue.swal.fire({
          type : "success",
          title : "update successfully"
        })
        if (updatedData.status==="received"){
          dispatch("getAllUserTransactions")
        }
        else {
          dispatch("getAllTransactions")
        }
      })
      .catch(err=>{
        console.log(err)
        Vue.swal.close()
        let message = err.response.data && err.response.data.message || "failed to update transactions"
        Vue.swal.fire({
          type : "error",
          title : "failed to update transactions",
          text : message
        })
      })
    },
    addReview({commit, dispatch}, payload){

      return new Promise((resolve, reject)=>{
        let token = localStorage.getItem("token")
        let ProductId = payload.ProductId
        axios({
          url : `${base_url}/reviews`,
          method : "POST",
          headers : {token},
          data : payload
        })
        .then(response=>{
          console.log(response.data)
          dispatch("getReview", ProductId)
          resolve("success")
        })
        .catch(err=>{
          reject(err)
        })
      })
    },
    getReview({commit, dispatch}, payload){
      let id = payload
      console.log(id)
      axios({
        url : `${base_url}/reviews/${id}`,
        method : "GET"
      })
      .then(response=>{
        commit("PRODUCT_REVIEW", response.data)
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
})
