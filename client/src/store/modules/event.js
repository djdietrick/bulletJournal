import axios from 'axios';

const a = axios.create({
    baseURL: "http://localhost:3000"
});

const state = {
    monthEvents: [],
    yearEvents: [] // Stores events for the whole year with importance HIGH, to be displayed in Year view
}

const getters = {
    getYearEvents: state => state.yearEvents,
    getMonthEvents: state => state.monthEvents,
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
    updateEvent: (state, event) => {

    }
}

const actions = {
    async createEvent({ commit, dispatch }, event) {
        try {
            const res = await a.post('/events', event);
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
            const res = await a.patch(`/events/${event._id}`, event);
            if (res.status !== 200) {

            }

            dispatch('fetchEvents');
            //commit('updateBullet', res.data);
        } catch (e) {
            console.error(e);
        }
    },
    async fetchEvents({ commit, rootState }) {
        const yearRes = await a.get(`/events?year=${rootState.year}`);
        commit('setYearEvents', yearRes.data);

        const monthRes = await a.get(`/events?year=${rootState.year}&month=${rootState.month}`);
        commit('setMonthEvents', monthRes.data);
    },
};

export default {
    state, 
    getters,
    mutations,
    actions
}