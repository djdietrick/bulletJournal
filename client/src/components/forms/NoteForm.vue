<template>
    <form>
        <div class="form__group">
            <label for="title" class="form__label">Title</label>
            <input type="text" id='title' class='form__input'
                v-model='note.title'>
        </div>
        <div class="form__group">
            <label for="description" class="form__label">Description</label>
            <input type="text" id='description' class='form__input'
                v-model='note.description'>
        </div>
        <div class="form__group">
            <label for="changeDate" class="form__label">
                Change Date?
                <a-switch v-model="changeDate"/>
                <div v-if="changeDate">
                    <a-date-picker size="large" class="date-picker" v-model="note.anchorDate"/>
                </div>  
            </label>
        </div>
        <div class="form__group">
            <button
                    class="btn btn-primary"
                    @click.prevent="formatAndSubmit()">{{btnText}}
            </button>
        </div>
    </form>
</template>

<script>
import moment from 'moment';
import Vue from 'vue';

export default {
     props: {
        passedBullet: {
            type: Object,
            default() {
                return {
                    title: '',
                    description: '',
                    anchorDate: moment()
                }
            }
        },
        submitFunction: Function,
        btnText: String
    },
    created() {
        this.note.anchorDate = moment(this.note.anchorDate);
    },
    data() {
        return {
            note: {
                title: this.passedBullet.title,
                description: this.passedBullet.description,
                anchorDate: this.passedBullet.anchorDate
            },
            changeDate: false
        }
    },
    methods: {
        formatAndSubmit() {
            let retNote = Vue.util.extend({},this.note);
            retNote.anchorDate = retNote.anchorDate.format();

            if(this.passedBullet._id !== undefined)
                retNote["_id"] = this.passedBullet._id;
            
            this.submitFunction(retNote);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>