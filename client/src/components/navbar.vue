<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand href="#" style="font-weight:bold;">X WATCH</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link class="text-dark" to="/">
              <v-btn>Home</v-btn>
            </router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="mx-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="search"></b-form-input>
            <!-- <b-button size="sm" class="btn btn-blue-grey" type="submit">Search</b-button> -->
          </b-nav-form>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto mr-3">
          <b-nav-item v-if="!$store.state.isLogin" v-b-modal.modal-login>Login</b-nav-item>

          <b-nav-item v-if="!$store.state.isLogin" @click="isRegisterModalActive = true">Register</b-nav-item>
          <div style="display:flex;align-items:center;">
            <b-nav-item disabled>
              <v-btn text>{{username}}</v-btn>
            </b-nav-item>
            <b-nav-item v-if="$store.state.isLogin" @click.stop="drawer = !drawer">
              <v-btn>
                <v-icon large id="navperson">person_pin</v-icon>
              </v-btn>
            </b-nav-item>
          </div>
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

    <v-navigation-drawer v-model="drawer" right absolute temporary>
      <v-list-item class="mt-5">
        <v-list-item-avatar large>
          <v-img src="http://img06.deviantart.net/1293/i/2013/169/5/a/minimalist_aang_from_avatar_the_last_airbender_by_himehimine-d69n1lr.png"></v-img>
        </v-list-item-avatar>

        <v-list-item-content class="ml-3">
          <v-list-item-title>{{username}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <div v-if="$store.state.role==='customer'">
          <v-list-item
            @click="gotoPage(item.path)"
            v-for="item in userItems"
            :key="item.title"
            link
          >
            <div style="display:flex">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </div>
          </v-list-item>
        </div>
        <div v-if="$store.state.role=='admin'">
          <v-list-item
            @click="gotoPage(item.path)"
            v-for="item in adminItems"
            :key="item.title"
            link
          >
            <div style="display:flex">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </div>
          </v-list-item>
        </div>
        <v-list-item @click="userSignOut">
          <v-list-item-icon>
            <v-icon>person_pin</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- </v-sheet> -->
  </div>
</template>

<script>
// import { mapState } from "vuex";


export default {
  data() {
    return {
      search: "",
      drawer: null,
      userItems: [
        { title: "Home", icon: "dashboard", path: "/" },
        {
          title: "Carts",
          icon: "shopping_cart",
          path: "/userProfile/usercarts"
        },
        {
          title: "Transactions",
          icon: "credit_card",
          path: "/userProfile/transactionHistory"
        }
      ],
      adminItems: [
        { title: "Admin", icon: "supervised_user_circle", path: "/admin" },
        {
          title: "Transactions",
          icon: "credit_card",
          path: "/admin/transactions"
        },
        { title: "Products", icon: "watch", path: "/admin/products" }
      ],
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
      this.$swal.showLoading();
    },

    userRegister() {
      this.$store.dispatch("userRegister", this.registerForm);
      this.isRegisterModalActive = false;
      this.$swal.showLoading();
    },
    userSignOut() {
      this.$swal.showLoading();
      localStorage.clear();
      this.$store.commit("LOGIN_STATUS", false);
      this.$store.commit("CURRENT_USER", { username: "", role: "" });
      this.$router.push({ path: "/" });
      this.username = "";
      this.$swal.close();
      this.$swal.fire({
        type: "success",
        title: "You Have Logged Out !",
        showConfirmButton: false,
        timer: 1500
      });
    },
    goToCartPage() {
      this.$router.push({ path: "/userProfile/usercarts" });
    },
    goToProfilePage() {
      this.$router.push({ path: "/userProfile" });
    },
    gotoPage(path) {
      // console.log(path)
      this.$router.push({ path });
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
    username() {
      return this.$store.state.username;
    }
  },
  watch: {
    search(value, old) {
      this.$store.commit("FILTER", value);
    }
  },
  created: function() {}
};
</script>

<style scoped src="mdbvue/build/css/mdb.css">
/* 
#navperson{
   color:#FFFFFF";
} */
</style>
