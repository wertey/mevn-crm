import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'materialize-css/dist/js/materialize.min';

Vue.use(VueAxios, axios);

Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
