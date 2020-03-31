import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import moment from 'moment';

import task from './modules/task';
import event from './modules/event';
import note from './modules/note';

const a = axios.create({
  baseURL: "http://localhost:3000"
});

const now = moment();
const nowYear = now.year();
const nowMonth = now.month();
const thisSunday = now.day(0).date();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sunday: thisSunday, // Sunday of the current week, used for week view query
    year: nowYear, // Current year the user is viewing
    month: nowMonth, // Current month the user is viewing
  },
  getters: {
    getYear: state => state.year,
    getMonth: state => state.month,
    getSunday: state => state.sunday,
  },
  mutations: {
    setYear: (state, year) => (state.year = year),
    setMonth: (state, month) => (state.month = month),
    setSunday: (state, day) => (state.sunday = day),
  },
  actions: {
    async setYear({commit}, year) {
      commit('setYear', year);
    },
    async setMonth({commit}, month) {
      commit('setMonth', month);
    },
    async setSunday({commit}, sunday) {
      commit('setSunday', sunday);
    },
    async fetchBullets({commit, dispatch}) {
      dispatch('fetchEvents');
      dispatch('fetchTasks');
      dispatch('fetchNotes');      
    },
    async deleteBullet({commit, dispatch}, id) {
      const res = await a.delete(`/${id}`);
      dispatch('fetchBullets');
    }
  },
  modules: {
    task,
    event,
    note
  }
})
