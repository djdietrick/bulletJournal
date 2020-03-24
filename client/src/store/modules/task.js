import axios from 'axios';
import moment from 'moment';

const a = axios.create({
    baseURL: "http://localhost:3000"
});

const state = {
    monthTasks: []
}

const getters = {
    getMonthTasks: state => state.monthTasks
}

const mutations = {
    setMonthTasks: (state, tasks) => state.monthTasks = tasks,
    updateTask: (state, task) => {

    }
}

const actions = {
    async createTask({ commit, dispatch }, task) {
        try {
            const res = await a.post('/tasks', task);
            if (res.status !== 201) {
                console.log("Error!");
            }

            dispatch('fetchTasks');
            //commit('updateTask', res.data);
        } catch (e) {
            console.error(e);
        }
    },
    async updateTask({ commit, dispatch }, task) {
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

            dispatch('fetchTasks');
            //commit('updateTask', res.data);
        } catch (e) {
            console.error(e);
        }
    },
    async fetchTasks({ commit, rootState }) {
        const monthRes = await a.get(`/tasks?year=${rootState.year}&month=${rootState.month}`);
        commit('setMonthTasks', monthRes.data);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}