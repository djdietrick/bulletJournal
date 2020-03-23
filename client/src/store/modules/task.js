import axios from 'axios';
import moment from 'moment';

const a = axios.create({
    baseURL: "http://localhost:3000"
});

const actions = {
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
    }
};

export default {
    actions
}