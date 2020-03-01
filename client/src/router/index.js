import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Year from '../views/Year.vue'
import Month from '../views/Month.vue'
import Day from '../views/Day.vue'
import Create from '../components/Create.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Year
  },
  {
    path: '/year',
    name: 'year',
    component: Year
  },
  {
    path: '/month',
    name: 'month',
    component: Month
  },
  {
    path: '/day',
    name: 'day',
    component: Day
  },
  {
    path: '/create',
    name: 'create',
    component: Create
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
