<template>
  <div class="card-body mx-auto mt-2" id="formRegister" style="width:30%">
      <h2 class="text-center">Register Now</h2>
      <br>
            <form v-on:submit.prevent="register">
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" class="form-control" v-model="username">
                </div>
                <div class="form-group">
                    <label for="email">E-mail:</label>
                    <input type="email" class="form-control" v-model="email">
                </div>
                <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input type="password" class="form-control" v-model="password">
                </div>
                <center><button class="btn btn-lg btn-secondary btn-block" type="submit">Register</button></center>
                <hr>
                <hr>
                <center><span>Already have an account?</span></center>
                <center><span>Login <a href="#" @click="changeToLoginForm()" >here</a> </span></center>
                <hr>     
            </form>
        </div>
</template>

<script>

export default {


}
</script>

<style>

</style>