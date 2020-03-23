import axios from 'axios';

const a = axios.create({
    baseURL: "http://localhost:3000"
});

const actions = {
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
    }
};

export default {
    actions
}