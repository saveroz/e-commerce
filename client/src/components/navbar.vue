<template>
   <div >
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-navbar-brand href="#">X Watch</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        
        <b-nav-item ><router-link class="text-secondary" to="/">Home</router-link></b-nav-item>
        <b-nav-item ><router-link class="text-secondary" to="/about">About Us</router-link></b-nav-item>

      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="mx-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto mr-3">
        <b-nav-item v-if="!isLogin" v-b-modal.modal-login>Login</b-nav-item>
        <b-nav-item-dropdown v-if="isLogin" text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item v-if="!isLogin" v-b-modal.modal-register>Register</b-nav-item>
        <b-nav-item-dropdown v-if="isLogin" text="User" right>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
        
        </b-navbar-nav>
      
    </b-collapse>
  </b-navbar>

  <!-- Modal untuk register ke e-commerce  -->
   <b-modal id="modal-register">
        <b-form @submit.prevent="registerUser" id="registerUserForm">
        <b-form-group label="Enter username: " label-for="username">
            <b-form-input type="text" v-model="inputRegisterUsername" placeholder="username" required></b-form-input>
        </b-form-group>
        <b-form-group label="Enter your e-mail" label-for="person">
            <b-form-input type="text" v-model="inputRegisterEmail" placeholder="email"></b-form-input>
        </b-form-group>
        <b-form-group label="Enter your password" label-for="password">
            <b-form-input type="password" v-model="inputRegisterPassword" placeholder="password"></b-form-input>
          </b-form-group>
        </b-form>
      <div slot="modal-footer">
          <b-button variant="primary" type="submit" form="registerUserForm">Confirm</b-button>
      </div>
  </b-modal>


  <!-- Modal untuk login ke e-commerce -->
  <b-modal id="modal-login">
        <b-form @submit.prevent="Login" id="userLoginForm">
        <b-form-group label="Enter your email" label-for="email">
            <b-form-input type="text" v-model="inputLoginEmail" placeholder="email" required></b-form-input>
        </b-form-group>
        <b-form-group label="password" label-for="person">
            <b-form-input type="password" v-model="inputLoginPassword" placeholder="password" ></b-form-input>
        </b-form-group>
        </b-form>
      <div slot="modal-footer">
          <b-button variant="primary" type="submit" form="userLoginForm">Confirm</b-button>
      </div>
  </b-modal>

  
</div>
</template>

<script>
export default {

  data(){
    return{
      
    }
  }



};
</script>

<style scoped>
</style>
