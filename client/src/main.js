import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

// Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleRight, faAngleLeft, faCheckSquare, faTrash, 
  faEdit, faExclamationCircle, faCircle, faPencilAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import DatePicker from 'ant-design-vue/lib/date-picker';
import Switch from 'ant-design-vue/lib/switch';
import Popover from 'ant-design-vue/lib/popover';
import AntD from 'ant-design-vue';

library.add(faAngleRight, faAngleLeft, faCheckSquare, 
  faSquare, faPlusSquare, faTrash, faEdit, faExclamationCircle,
  faCircle, faPencilAlt, faBars);
Vue.component('font-awesome-icon', FontAwesomeIcon);


Vue.use(AntD);
Vue.component(DatePicker.name, DatePicker);
Vue.component(DatePicker.RangePicker.name, DatePicker.RangePicker);
Vue.component(Switch.name, Switch);
Vue.component(Popover.name, Popover);

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL;
const state = JSON.parse(localStorage.getItem('vuex'));
if(state && state.auth.token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.auth.token;
}

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
