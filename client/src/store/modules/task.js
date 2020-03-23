const actions = {
    async createTask({ commit }, task) {
        try {
            const res = await a.post('/tasks', task);
            if (res.status !== 201) {

            }

            commit('updateBullet', res.data);
        } catch (e) {
            console.error(e);
        }
    },

};