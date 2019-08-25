<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand href="#">X Watch</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link class="text-secondary" to="/">Home</router-link>
          </b-nav-item>
          <!-- <b-nav-item>
            <router-link class="text-secondary" to="/about">About Us</router-link>
          </b-nav-item> -->
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="mx-auto"></b-navbar-nav>

        <b-navbar-nav class="ml-auto mr-3">
          <b-nav-item v-if="!$store.state.isLogin" v-b-modal.modal-login>Login</b-nav-item>
          <b-nav-item-dropdown v-if="isLogin" text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item v-if="!$store.state.isLogin" @click="isRegisterModalActive = true">Register</b-nav-item>
          <b-nav-item-dropdown
            v-if="$store.state.isLogin"
            @click="isCreateModalActive = true"
            :text="UsernameLogin || 'User'"
            right
          >
           
           <b-dropdown-item @click="goToProfilePage">Profile</b-dropdown-item>
            
            <b-dropdown-item @click="userSignOut">Sign Out</b-dropdown-item>
            <b-dropdown-item @click="goToCartPage">Cart</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    

    <!-- Modal untuk register ke e-commerce  -->
    <b-modal id="modal-register" v-model="isRegisterModalActive">
      <b-form @submit.prevent="userRegister" id="registerUserForm">
        <b-form-group label="Enter username: " label-for="username">
          <b-form-input type="text" v-model="registerForm.username" placeholder="username" required></b-form-input>
        </b-form-group>
        <b-form-group label="Enter your e-mail" label-for="person">
          <b-form-input type="text" v-model="registerForm.email" placeholder="email" required></b-form-input>
        </b-form-group>
        <b-form-group label="Enter your password" label-for="password">
          <b-form-input
            type="password"
            v-model="registerForm.password"
            placeholder="password"
            required
          ></b-form-input>
        </b-form-group>
      </b-form>
      <div slot="modal-footer">
        <b-button variant="primary" type="submit" form="registerUserForm">Confirm</b-button>
      </div>
    </b-modal>

    <!-- Modal untuk login ke e-commerce -->
    <b-modal id="modal-login" v-model="isLoginModalActive">
      <b-form @submit.prevent="userLogin" id="userLoginForm">
        <b-form-group label="Enter your email" label-for="email">
          <b-form-input type="text" v-model="loginForm.email" placeholder="email" required></b-form-input>
        </b-form-group>
        <b-form-group label="password" label-for="person">
          <b-form-input
            type="password"
            v-model="loginForm.password"
            placeholder="password"
            required
          ></b-form-input>
        </b-form-group>
      </b-form>
      <div slot="modal-footer">
        <b-button variant="primary" data-dismiss="modal" type="submit" form="userLoginForm">Confirm</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import Vue from "vue";

export default {
  data() {
    return {
      username : "",
      isLogin: false,
      isRegisterModalActive: false,
      isLoginModalActive: false,
      registerForm: {
        username: "",
        email: "",
        password: ""
      },
      loginForm: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    userLogin() {
      this.$store.dispatch("userLogin", this.loginForm);
      this.isLoginModalActive = false;
      Vue.swal.showLoading();
      this.username = this.$store.state.username
    },

    userRegister() {
      this.$store.dispatch("userRegister", this.registerForm);
      this.isRegisterModalActive = false;
      Vue.swal.showLoading();
    },
    userSignOut() {
      Vue.swal.showLoading();
      localStorage.removeItem("token");
      this.$store.commit("LOGIN_STATUS", false);
      this.$router.push({ path: "/" });
      Vue.swal.close();
      Vue.swal.fire({
        type: "success",
        title: "You Have Logged Out !",
        showConfirmButton: false,
        timer: 1500
      });
    },
    goToCartPage() {
      this.$router.push({ path: "/usercarts" });
    },
    goToProfilePage(){
      this.$router.push({path:"/userProfile"})
    }
  },
  computed: {
    loginStatus() {
      let status = this.$store.state.isLogin;
      console.log(status);
      if (status) {
        this.$bvModal.hide("modal-login");
      }
    },
    UsernameLogin(){
      return this.$store.state.username
    }

  },
  created: function(){
      this.username = this.$store.state.username
  }
};
</script>

<style scoped>
</style>
