<template>

  <div class="home">
    <productsList></productsList>
  </div>
</template>

<script>
// @ is an alias to /src
import registerForm from '../components/registerForm'
import loginForm from '../components/loginForm'
import navbar from '../components/navbar'
import productsList from '../components/productList'

export default {
  name: 'home',
  components: {
    registerForm,
    loginForm,
    productsList,
    navbar
    
  },
  data(){
    return{
      isLogin : false,
    }
  }
}
</script>
