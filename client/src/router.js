import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import productDetail from './views/productDetail.vue'
import UserCarts from './views/UserCarts.vue'
import userProfile from './views/userProfile'
import transactionHistory from './views/transactionHistory'
import admin from "./views/Admin"
import adminProduct from "./views/adminProduct"
import adminTransactions from "./views/adminTransactions"
import store from "./store.js"

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/productDetail/:id',
      name: 'productDetail',
      component: productDetail

    },

    {
      path: '/userProfile',
      name: 'userProfile',
      component: userProfile,
      beforeEnter: (to, from, next) => {
        let role = localStorage.getItem("role")
        if (role == "customer") {
          next()
        }
        else {
          next(from.path)
        }
      },
      children: [{
        path: 'transactionHistory',
        name: 'transactionHistory',
        component: transactionHistory
      },
      {
        path: 'usercarts',
        name: 'UserCarts',
        component: UserCarts
      }]
    },
    {
      path: "/admin",
      name: "admin",
      component: admin,
      beforeEnter: (to, from, next) => {
        let role = localStorage.getItem("role")
        if (role == "admin") {
          next()
        }
        else {
          next(from.path)
        }
      },
      children: [{
        path: "products",
        name: "adminProducts",
        component: adminProduct
      }, {
        path: "transactions",
        name: "adminTransactions",
        component: adminTransactions
      }]
    }

  ]
})
