import Vue from 'vue';
import SVGIcon from 'vue-svgicon';
import router from '@/router';
import store from '@/store';

import App from '@/App.vue';

import Btn from '@/components/btn/index.vue';
import Field from '@/components/field/index.vue';

import '@/helpers/icons';
import '@/registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(SVGIcon);

Vue.component('Field', Field);
Vue.component('Btn', Btn);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
