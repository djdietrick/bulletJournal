import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Year from '../views/Year.vue'
import Month from '../views/Month.vue'
import Day from '../views/Day.vue'
import Create from '../components/Create.vue'
import EventForm from '../components/forms/EventForm.vue';
import TaskForm from '../components/forms/TaskForm.vue';
import NoteForm from '../components/forms/NoteForm.vue';


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
    component: Create,
    children: [
      {
        path: 'event',
        components: {
          createView: EventForm
        }
      },
      {
        path: 'task',
        components: {
          createView: TaskForm
        }
      },
      {
        path: 'note',
        components: {
          createView: NoteForm
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
