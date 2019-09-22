<template>
  <div>
    <navbar></navbar>
    <router-view />
    <!-- <div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
  </div>
</template>

<script>
import navbar from "./components/navbar";
export default {
  name: "app",
  components: {
    navbar
  },
  data() {
    return {};
  },
  methods: {
    getStatusLogin() {
      let token = localStorage.getItem("token");

      if (token) {
        this.$store.commit("LOGIN_STATUS", true);
        let username = localStorage.getItem("username");
        let role = localStorage.getItem("role");
        this.$store.commit("CURRENT_USER", {username,role});
      } 
      else {
        this.$store.commit("LOGIN_STATUS", false);
      }
    },
    goBack(){
      let token = localStorage.getItem("token")
      if(!token){
        this.$router.push("/")
      }
    }
  },
  created() {
    this.getStatusLogin();
    // this.goBack()

  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
