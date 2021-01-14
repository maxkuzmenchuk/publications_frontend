import Vue from 'vue'
import App from './App.vue'

import vuetify from '@/plugins/vuetify'

import { router } from '@/util/router';
import store from './store';

import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
