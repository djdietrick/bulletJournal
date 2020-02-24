import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const a = axios.create({
  baseURL: process.env.SERVER_URL
});

const now = new Date();
const nowYear = now.getFullYear();
const nowMonth = now.getMonth();

Vue.use(Vuex)

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
    getMonthBullets: state => state.monthBullets
  },
  mutations: {
    setYear: (state, year) => (state.year = year),
    setMonth: (state, month) => (state.month = month),
    setYearEvents: (state, events) => (state.yearEvents = events),
    setMonthBullets: (state, bullets) => (state.monthBullets = bullets)
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
      let bullets = [];
      
      // Events
      const eventRes = await a.get(`/events?year=${state.year}&month=${state.month}`);
      bullets.push(eventRes.data);

      // Tasks
      const taskRes = await a.get(`/tasks?year=${state.year}&month=${state.month}`);
      bullets.push(taskRes.data);

      // Notes
      const noteRes = await a.get(`/notes?year=${state.year}&month=${state.month}`);
      bullets.push(noteRes.data);

      commit('setMonthBullets', bullets);
    }
  }
})
