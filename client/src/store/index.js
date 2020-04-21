import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import moment from 'moment';
import createPersistedState from 'vuex-persistedstate';

import task from './modules/task';
import event from './modules/event';
import note from './modules/note';
import auth from './modules/auth';

const now = moment();
const nowYear = now.year();
const nowMonth = now.month();
const thisSunday = now.day(0).date();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sunday: thisSunday, // Sunday of the current week, used for week view query
    year: nowYear, // Current year the user is viewing
    month: nowMonth // Current month the user is viewing
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
      const res = await axios.delete(`/${id}`);
      dispatch('fetchBullets');
    },
    resetDates({commit}) {
      const now = moment();
      commit('setYear', now.year());
      commit('setMonth', now.month());
      commit('setSunday', now.day(0).date());
    }
  },
  modules: {
    task,
    event,
    note,
    auth
  },
  plugins: [createPersistedState()]
})
