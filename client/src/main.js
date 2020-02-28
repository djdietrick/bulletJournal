import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faAngleRight);
library.add(faAngleLeft);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
