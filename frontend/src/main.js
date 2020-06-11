import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'materialize-css/dist/js/materialize.min';
import LoaderTemplate from './components/loader/LoaderTemplate.vue';

Vue.use(VueAxios, axios);

Vue.use(Vuelidate);
Vue.component('LoaderTemplate', LoaderTemplate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
