import axios from 'axios';

const state = {
    weekEvents: [],
    monthEvents: [],
    yearEvents: [] // Stores events for the whole year with importance HIGH, to be displayed in Year view
}

const getters = {
    getYearEvents: state => state.yearEvents,
    getMonthEvents: state => state.monthEvents,
    getWeekEvents: state => state.weekEvents,
    getEventsForMonth: (state, getters, rootState) => month => {
        return state.yearEvents.filter(event => {
            const anchorDate = new Date(event.anchorDate);
            const anchorMonth = anchorDate.getMonth();
            const anchorYear = anchorDate.getFullYear();
            const endDate = new Date(event.endDate);
            const endMonth = endDate.getMonth();
            const endYear = endDate.getFullYear();
            return ((anchorMonth == month && anchorYear == rootState.year)
             || (endMonth == month && endYear == rootState.year));
          });
    }
}

const mutations = {
    setYearEvents: (state, events) => (state.yearEvents = events),
    setMonthEvents: (state, events) => (state.monthEvents = events),
    setWeekEvents: (state, events) => (state.weekEvents = events),
    updateEvent: (state, event) => {

    }
}

const actions = {
    async createEvent({ commit, dispatch }, event) {
        try {
            const res = await axios.post('/events', event);
            if (res.status !== 201) {

            }

            dispatch('fetchEvents');
            //commit('updateBullet', res.data);
        } catch (e) {
            console.error(e);
        }
    },
    async updateEvent({ commit, dispatch }, event) {
        try {
            const id = event._id;
            delete event._id;

            const res = await axios.patch(`/events/${id}`, event);
            if (res.status !== 200) {

            }

            dispatch('fetchEvents');
            //commit('updateBullet', res.data);
        } catch (e) {
            console.error(e);
        }
    },
    async fetchEvents({ commit, rootState }) {
        const yearRes = await axios.get(`/events?year=${rootState.year}`);
        commit('setYearEvents', yearRes.data);

        const monthRes = await axios.get(`/events?year=${rootState.year}&month=${rootState.month}`);
        commit('setMonthEvents', monthRes.data);

        const weekRes = await axios.get(`/events/week?date=${rootState.year}-${rootState.month + 1}-${rootState.sunday}`);
        commit('setWeekEvents', weekRes.data);
    },
};

export default {
    state, 
    getters,
    mutations,
    actions
}