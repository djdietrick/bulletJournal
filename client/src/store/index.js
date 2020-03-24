import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import task from './modules/task';
import event from './modules/event';
import note from './modules/note';

const a = axios.create({
  baseURL: "http://localhost:3000"
});

const now = new Date();
const nowYear = now.getFullYear();
const nowMonth = now.getMonth();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    year: nowYear, // Current year the user is viewing
    month: nowMonth // Current month the user is viewing
  },
  getters: {
    getYear: state => state.year,
    getMonth: state => state.month,
  },
  mutations: {
    setYear: (state, year) => (state.year = year),
    setMonth: (state, month) => (state.month = month),
  },
  actions: {
    async setYear({commit}, year) {
      commit('setYear', year);
    },
    async setMonth({commit}, month) {
      commit('setMonth', month);
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
