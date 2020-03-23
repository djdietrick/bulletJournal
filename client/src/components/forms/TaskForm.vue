<template>
    <form>
        <div class="form__group">
            <label for="title" class="form__label">Title</label>
            <input type="text" id='title' class='form__input'
                v-model='task.title'>
        </div>
        <div class="form__group">
            <label for="description" class="form__label">Description</label>
            <input type="text" id='description' class='form__input'
                v-model='task.description'>
        </div>
        <!--<div class="form__group">
            <label for="anchorDate" class="form__label">Date</label>
            <v-calendar is-dark color="blue" :value="event.anchorDate" v-model="event.anchorDate"/>
        </div>-->
        <div class="form__group">
            <label for="changeDate" class="paragraph">
                Change Date?
                <a-switch v-model="changeDate"/>
                <div v-if="changeDate">
                    <label for="anchorDate" class="form__label">Anchor Date</label>
                    <a-date-picker size="large" class="date-picker" v-model="task.anchorDate"/>
                </div>  
            </label>
        </div>
        <div class="form__group">
            <label for="hasDueDate" class="paragraph">
                Due Date
                <a-switch v-model="hasDueDate"/>
            </label>
            <div v-if="hasDueDate">
                <!-- <label for="dueDate" class="form__label">Due Date</label> -->
                <a-date-picker size="large" class="date-picker" v-model="task.dueDate"/>
            </div>  
        </div>
        
        <div class="form__group">
            <button
                    class="btn btn-primary"
                    @click.prevent="formatAndSubmit()">Create
            </button>
        </div>
    </form>
</template>

<script>
import Vue from 'vue';
import moment from 'moment';

export default {
    props: {
        passedBullet: {
            type: Object,
            default() {
                return {
                    title: '',
                    description: '',
                    anchorDate: moment(),
                    dueDate: null
                }
            }
        },
        submitFunction: Function
    },
    created() {
        // If we get passed a due date, check hasDueDate box
        if(this.passedBullet.dueDate !== null) {
            this.hasDueDate = true;
        }

        this.task.anchorDate = moment(this.task.anchorDate);
        if(this.passedBullet.dueDate !== null) {
            this.task.dueDate = moment(this.task.dueDate);
        }

        console.debug("Passed to task form: ", this.passedBullet);
    },
    data() {
        return {
            task: Vue.util.extend({}, this.passedBullet),
            changeDate: false,
            hasDueDate: false
        }
    },
    computed: {
        canSubmit() {
            return !this.title.isEmpty();
        }
    },
    methods: {
        onChange(date, dateString) {
            console.log(date, dateString);
        },
        formatAndSubmit() {
            let retTask = Vue.util.extend({},this.task);
            retTask.anchorDate = retTask.anchorDate.format();
            if(retTask.dueDate !== null)
                retTask.dueDate = retTask.dueDate.format();
            
            this.submitFunction(retTask);
        }
    },
    watch: {
        hasDueDate: function (val) {
            if(!val) this.task.dueDate = null;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../styles/main.scss';

</style>
