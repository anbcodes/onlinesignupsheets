import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import Google from './utils/Google';
import redirect from './mixins/redirect';

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();

Google.init();

Vue.mixin(redirect);

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app');
