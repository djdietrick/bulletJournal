import axios from 'axios';

const a = axios.create({
    baseURL: "http://localhost:3000"
});

const actions = {
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
};

export default {
    actions
}