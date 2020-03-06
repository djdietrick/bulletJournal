import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight, faAngleLeft, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import VCalendar from 'v-calendar';

library.add(faAngleRight, faAngleLeft, faCheckSquare, faSquare);
//library.add(faAngleLeft);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.component('date-picker', DatePicker);
Vue.use(VCalendar);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
