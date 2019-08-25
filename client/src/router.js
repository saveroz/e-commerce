import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import productDetail from './views/productDetail.vue'
import UserCarts from './views/UserCarts.vue'
import userProfile from "./views/userProfile"
import transactionHistory from "./views/transactionHistory"

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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },{
      path:'/productDetail/:id',
      name : "productDetail",
      component : productDetail
     
    },
    {
      path:'/usercarts',
      name : "UserCarts",
      component : UserCarts
    },
    {
      path :"/userProfile",
      name : "userProfile",
      component : userProfile,
      children : [{
        path : "transactionHistory",
        name : "transactionHistory",
        component : transactionHistory
      }]
    }
  ]
})
