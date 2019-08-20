<template>

  <div class="home">
    
    <register v-if="isLogin" ></register>
    <login v-if="!isLogin"></login>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import register from '../components/registerForm'
import login from '../components/loginForm'


export default {
  name: 'home',
  components: {
    register,
    login
    
  },
  data(){
    return{
      isLogin : false
    }
  }
}
</script>
