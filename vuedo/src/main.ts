import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from "bootstrap-vue";
import Vuetify from "vuetify";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/dist/vuetify.min.css';
import ToastedPlugin, {Toasted} from "vue-toasted";
import {Options} from "vue-class-component/dist/vue-class-component";



Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(Vuetify);
Vue.use(ToastedPlugin,Options);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
