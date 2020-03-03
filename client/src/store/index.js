import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const a = axios.create({
  baseURL: "http://localhost:3000"
});

const now = new Date();
const nowYear = now.getFullYear();
const nowMonth = now.getMonth();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    yearEvents: [],
    monthBullets: [],
    year: nowYear,
    month: nowMonth
  },
  getters: {
    getYear: state => state.year,
    getMonth: state => state.month,
    getYearEvents: state => state.yearEvents,
    getMonthBullets: state => state.monthBullets,
    getMonthEvents: state => month => {
      return state.yearEvents.filter(event => {
        const anchorDate = new Date(event.anchorDate);
        const anchorMonth = anchorDate.getMonth();
        const anchorYear = anchorDate.getFullYear();
        const endDate = new Date(event.endDate);
        const endMonth = endDate.getMonth();
        const endYear = endDate.getFullYear();
        return ((anchorMonth == month && anchorYear == state.year)
         || (endMonth == month && endYear == state.year));
      });
    }
  },
  mutations: {
    setYear: (state, year) => (state.year = year),
    setMonth: (state, month) => (state.month = month),
    setYearEvents: (state, events) => (state.yearEvents = events),
    setMonthBullets: (state, bullets) => (state.monthBullets = bullets),
    updateBullet: (state, bullet) => {
      let yearIndex = state.yearEvents.findIndex(event => event._id == bullet._id);
      if(yearIndex !== -1) {
        state.yearEvents.splice(yearIndex, 1, bullet);
      }
      let monthIndex = state.monthBullets[bullet._type].findIndex(bul => bul._id == bullet._id);
      if(monthIndex !== -1) {
        state.monthBullets[bullet._type].splice(monthIndex, 1, bullet);
      }
    }
  },
  actions: {
    async setYear({commit}, year) {
      commit('setYear', year);
    },
    async setMonth({commit}, month) {
      commit('setMonth', month);
    },
    async fetchYearEvents({commit, state}) {
      const res = await a.get(`/events?year=${state.year}`);
      commit('setYearEvents', res.data);
    },
    async fetchMonthBullets({commit, state}) {
      let bullets = {};
      
      // Events
      const eventRes = await a.get(`/events?year=${state.year}&month=${state.month}`);
      bullets["event"] = eventRes.data;

      // Tasks
      const taskRes = await a.get(`/tasks?year=${state.year}&month=${state.month}`);
      bullets["task"] = taskRes.data;

      // Notes
      const noteRes = await a.get(`/notes?year=${state.year}&month=${state.month}`);
      bullets["note"] = noteRes.data;

      commit('setMonthBullets', bullets);
    },
    async createEvent({commit, state}, event) {
      try {
        const res = await a.post('/events', event);
        if(res.status !== 201) {
          
        }

        commit('updateBullet', res.data);
      } catch(e) {
        console.error(e);
      }
    },
    async createTask({commit, state}, task) {
      try {
        const res = await a.post('/tasks', task);
        if(res.status !== 201) {
          
        }

        commit('updateBullet', res.data);
      } catch(e) {
        console.error(e);
      }
    },
    async createNote({commit, state}, note) {
      try {
        const res = await a.post('/notes', note);
        if(res.status !== 201) {
          
        }

        commit('updateBullet', res.data);
      } catch(e) {
        console.error(e);
      }
    },
    async updateEvent({commit, state}, event) {
      try {
        const res = await a.patch(`/events/${event._id}`, event);
        if(res.status !== 200) {
          
        }

        commit('updateBullet', res.data);
      } catch(e) {
        console.error(e);
      }
    },
    async updateTask({commit, state}, task) {
      try {
        const id = task._id;
        delete task._id;

        const res = await a.patch(`/tasks/${id}`, task).catch(e => console.log(e));

        commit('updateBullet', res.data);
      } catch(e) {
        console.error(e);
      }
    },
    async updateNote({commit, state}, note) {
      try {
        const res = await a.patch(`/notes/${note._id}`, note);
        if(res.status !== 200) {
          
        }

        commit('updateBullet', res.data);
      } catch(e) {
        console.error(e);
      }
    }
  }
})
