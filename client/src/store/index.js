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
    yearEvents: [],
    monthBullets: {},
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
    },
    removeBullet: (state, bullet) => {
      let yearIndex = state.yearEvents.findIndex(event => event._id == bullet._id);
      if(yearIndex !== -1) {
        state.yearEvents.splice(yearIndex, 1);
      }
      let monthIndex = state.monthBullets[bullet._type].findIndex(bul => bul._id == bullet._id);
      if(monthIndex !== -1) {
        state.monthBullets[bullet._type].splice(monthIndex, 1);
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
    async refreshBullets({dispatch}) {
      dispatch('fetchMonthBullets');
      dispatch('fetchYearEvents');
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
    async fetchYearEvents({ commit, state }) {
      const res = await a.get(`/events?year=${state.year}`);
      commit('setYearEvents', res.data);
    },
    async deleteBullet({commit, state}, id) {
      const res = await a.delete(`/${id}`);
      commit('removeBullet', res.data);
    },


    
    // CRUD functions, TODO find away to abstract into modules,
    // can'r right now because we need to edit state
    async createTask({ commit }, task) {
      try {
          const res = await a.post('/tasks', task);
          if (res.status !== 201) {
              console.log("Error!");
          }

          commit('updateBullet', res.data);
      } catch (e) {
          console.error(e);
      }
    },
    async updateTask({ commit }, task) {
      try {
          const id = task._id;
          delete task._id;

          if (task.completed) {
              task.completedDate = moment().format();
              task.status = "COMPLETED";
          } else {
              //task.completedDate = null;
              task.status = "IN_PROGRESS";
          }

          const res = await a.patch(`/tasks/${id}`, task).catch(e => console.log(e));

          commit('updateBullet', res.data);
      } catch (e) {
          console.error(e);
      }
    },
    async createEvent({ commit, state }, event) {
      try {
          const res = await a.post('/events', event);
          if (res.status !== 201) {

          }

          commit('updateBullet', res.data);
      } catch (e) {
          console.error(e);
      }
    },
    async updateEvent({ commit, state }, event) {
      try {
          const res = await a.patch(`/events/${event._id}`, event);
          if (res.status !== 200) {

          }

          commit('updateBullet', res.data);
      } catch (e) {
          console.error(e);
      }
    },
    async createNote({ commit, state }, note) {
      try {
          const res = await a.post('/notes', note);
          if (res.status !== 201) {

          }

          commit('updateBullet', res.data);
      } catch (e) {
          console.error(e);
      }
    },
    async updateNote({ commit, state }, note) {
      try {
          const res = await a.patch(`/notes/${note._id}`, note);
          if (res.status !== 200) {

          }

          commit('updateBullet', res.data);
      } catch (e) {
          console.error(e);
      }
    }
  },
  // modules: {
  //   task,
  //   event,
  //   note
  // }
})
