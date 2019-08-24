<template>

  <div class="home">
    <register v-if="isLogin" ></register>


    <!-- <login v-if="!isLogin"></login> -->
    <products></products>
    
  </div>
</template>

<script>
// @ is an alias to /src
import register from '../components/registerForm'
import login from '../components/loginForm'
import products from '../components/Products'


export default {
  name: 'home',
  components: {
    register,
    login,
    products
    
  },
  data(){
    return{
      isLogin : false
    }
  }
}
</script>
