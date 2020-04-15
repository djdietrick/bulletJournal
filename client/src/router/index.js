import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import Home from '../views/Home.vue';

import HomeNav from '../components/nav/HomeNav.vue';
import BulletNav from '../components/nav/BulletNav.vue';

const Year = resolve => {
  require.ensure(['../views/Year.vue'], () => {
    resolve(require('../views/Year.vue'));
  })
}
const Month = resolve => {
  require.ensure(['../views/Month.vue'], () => {
    resolve(require('../views/Month.vue'));
  })
}
const Day = resolve => {
  require.ensure(['../views/Day.vue'], () => {
    resolve(require('../views/Day.vue'));
  })
}

import store from '../store'

Vue.use(VueRouter);

const auth = (to, from, next) => {
  if (store.state.auth.token) {
    next()
  } else {
    next('/login')
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      nav: HomeNav,
      default: Home
    },
    // children: [
    //   {
    //     path: '/signup',
    //     components: {
    //       nav: HomeNav,
    //       default: Signup
    //     }
    //   },
    //   {
    //     path: '/login',
    //     components: {
    //       nav: HomeNav,
    //       default: Login
    //     }
    //   },
    // ]
  },
  {
    path: '/signup',
    components: {
      nav: HomeNav,
      default: Signup
    }
  },
  {
    path: '/login',
    components: {
      nav: HomeNav,
      default: Login
    }
  },
  {
    path: '/bullets',
    beforeEnter: auth,
    components: {
      nav: BulletNav,
      default: Home
    },
    // children: [
    //   {
    //     path: 'year',
    //     name: 'year',
    //     components: {
    //       nav: BulletNav,
    //       default: Year
    //     }
    //     //beforeEnter: auth
    //   },
    //   {
    //     path: 'month',
    //     name: 'month',
    //     components: {
    //       nav: BulletNav,
    //       default: Month
    //     }
    //     //beforeEnter: auth
    //   },
    //   {
    //     path: 'day',
    //     name: 'day',
    //     components: {
    //       nav: BulletNav,
    //       default: Day
    //     }
    //     //beforeEnter: auth
    //   }
    // ]
  },
  {
    path: '/bullets/year',
    name: 'year',
    components: {
      nav: BulletNav,
      default: Year
    },
    beforeEnter: auth
  },
  {
    path: '/bullets/month',
    name: 'month',
    components: {
      nav: BulletNav,
      default: Month
    },
    beforeEnter: auth
  },
  {
    path: '/bullets/day',
    name: 'day',
    components: {
      nav: BulletNav,
      default: Day
    },
    beforeEnter: auth
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
