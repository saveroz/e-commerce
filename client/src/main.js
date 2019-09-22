import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import vuetify from './plugins/vuetify';
// import mdbvue from 'mdbvue'
// import mdb from 'vue-cli-plugin-mdb'

Vue.use(BootstrapVue)
Vue.use(VueSweetalert2)
// Vue.use(mdb)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
