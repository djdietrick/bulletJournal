import axios from 'axios';

const a = axios.create({
    baseURL: "http://localhost:3000"
});

const state = {
    monthNotes: []
}

const getters = {
    getMonthNotes: state => state.monthNotes
}

const mutations = {
    setMonthNotes: (state, notes) => (state.monthNotes = notes),
    updateNote: (state, note) => {

    }
}

const actions = {
    async createNote({ commit, dispatch }, note) {
        try {
            const res = await a.post('/notes', note);
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
            const res = await a.patch(`/notes/${note._id}`, note);
            if (res.status !== 200) {
                
            }

            dispatch('fetchNotes');
            //commit('updateNote', res.data);
        } catch (e) {
            console.error(e);
        }
    },
    async fetchNotes({ commit, rootState }) {
        const monthRes = await a.get(`/notes?year=${rootState.year}&month=${rootState.month}`);
        commit('setMonthNotes', monthRes.data);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}