<template>
  <div >
    <navbar></navbar>
    <router-view/>
     <!-- <div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
  </div>
</template>

<script>
import navbar from './components/navbar'
import login from './components/loginForm'
export default {
  name: 'app',
  components: {
    navbar,
    login
  },
  data () {
    return {

    }
  },
  methods: {

    getStatusLogin () {
      let token = localStorage.getItem('token')
      if (token) {
        this.$store.commit('LOGIN_STATUS', true)
      } else {
        this.$store.commit('LOGIN_STATUS', false)
      }
    }

  },
  created () {
    this.getStatusLogin()
  }

}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
