import axios from 'axios';

const state = {
    weekNotes: [],
    monthNotes: []
}

const getters = {
    getMonthNotes: state => state.monthNotes,
    getWeekNotes: state => state.weekNotes
}

const mutations = {
    setMonthNotes: (state, notes) => (state.monthNotes = notes),
    setWeekNotes: (state, notes) => (state.weekNotes = notes),
    updateNote: (state, note) => {

    }
}

const actions = {
    async createNote({ commit, dispatch }, note) {
        try {
            const res = await axios.post('/notes', note);
            if (res.status !== 201) {

            }

            dispatch('fetchNotes');
            //commit('updateNote', res.data);
        } catch (e) {
            console.error(e);
        }
    },


    async updateNote({ commit, dispatch }, note) {
        try {
            const res = await axios.patch(`/notes/${note._id}`, note);
            if (res.status !== 200) {
                
            }

            dispatch('fetchNotes');
            //commit('updateNote', res.data);
        } catch (e) {
            console.error(e);
        }
    },
    async fetchNotes({ commit, rootState }) {
        const monthRes = await axios.get(`/notes?year=${rootState.year}&month=${rootState.month}`);
        commit('setMonthNotes', monthRes.data);
        
        const weekRes = await axios.get(`/notes/week?date=${rootState.year}-${rootState.month + 1}-${rootState.sunday}`);
        commit('setWeekNotes', weekRes.data);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}