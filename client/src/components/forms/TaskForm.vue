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
            <label for="changeDate" class="form__label">
                Change Date?
                <a-switch v-model="changeDate"/>
                <div v-if="changeDate">
                    <a-date-picker size="large" class="date-picker" v-model="task.anchorDate"/>
                </div>  
            </label>
        </div>
        <div class="form__group">
            <label for="hasDueDate" class="form__label">
                Due Date
                <a-switch v-model="hasDueDate"/>
            </label>
            <div v-if="hasDueDate">
                <a-date-picker size="large" class="date-picker" v-model="task.dueDate"/>
            </div>  
        </div>
        
        <div class="form__group">
            <button
                    class="btn btn--filled btn-primary"
                    @click.prevent="formatAndSubmit()">{{btnText}}
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
        submitFunction: Function,
        btnText: String
    },
    created() {
        this.task.anchorDate = moment(this.task.anchorDate);
        
        // If we get passed a due date, check hasDueDate box
        if(this.passedBullet.dueDate !== null) {
            this.hasDueDate = true;
            this.task.dueDate = moment(this.task.dueDate);
        }
    },
    data() {
        return {
            //task: Vue.util.extend({}, this.passedBullet),
            task: {
                title: this.passedBullet.title,
                description: this.passedBullet.description,
                anchorDate: this.passedBullet.anchorDate,
                dueDate: this.passedBullet.anchorDate
            },
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
        async formatAndSubmit() {
            console.log("this.task: ", this.task);
            let retTask = Vue.util.extend({},this.task);

            // For some reason tasks keep getting created with due dates
            if(!this.hasDueDate)
                retTask.dueDate = null;

            retTask.anchorDate = retTask.anchorDate.format();
            if(retTask.dueDate !== null)
                retTask.dueDate = retTask.dueDate.format();

            if(this.passedBullet._id !== undefined)
                retTask["_id"] = this.passedBullet._id;
            
            await this.submitFunction(retTask);
            this.resetTask();
        },
        resetTask() {
            this.task = {
                title: '',
                description: '',
                anchorDate: moment(),
                dueDate: null
            }
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
