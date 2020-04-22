<template>
    <form>
        <div class="form__group">
            <label for="title" class="form__label">Title</label>
            <input type="text" id='title' class='form__input'
                v-model='event.title'>
        </div>
        <div class="form__group">
            <label for="description" class="form__label">Description</label>
            <input type="text" id='description' class='form__input'
                v-model='event.description'>
        </div>
        <div class="form__group">
            <label for="location" class="form__label">Location</label>
            <input type="text" id='location' class='form__input'
                v-model='event.location'>
        </div>
        <div class="form__group">
            <label for="allDay" class="form__label">
                All Day
                <a-switch v-model="event.allDay"/>
            </label>
            <label for="multiDay" class="form__label">
                Multi-Day
                <a-switch v-model="multiDay"/>
            </label>
            <div v-if="multiDay">
                <div v-if="!event.allDay">
                    <a-range-picker size="large" class="date-picker" v-model="dateRange" 
                        :showTime="{use12Hours: true, format: 'h:mm A'}" format="YYYY-MM-DD h:mm a"/>
                </div>
                <div v-else>
                    <a-range-picker size="large" class="date-picker" v-model="dateRange"/>
                </div>
            </div>
            <div v-else>
                <div v-if="!event.allDay">
                    <a-date-picker size="large" class="date-picker" v-model="event.anchorDate" 
                        :showTime="{use12Hours: true, format: 'h:mm A'}" format="YYYY-MM-DD h:mm a"/>
                </div>
                <div v-else>
                    <a-date-picker size="large" class="date-picker" v-model="event.anchorDate"/>
                </div>
                <!-- <a-date-picker size="large" class="date-picker" v-model="event.anchorDate" 
                :showTime="{value: !event.allDay, format: 'h:mm a'}"/> -->
            </div>  
        </div>
        <div class="form__group">
            <label for="importance" class="form__label">Importance</label>
             <select
                id="importance"
                class="form-control"
                v-model="event.importance">
            <option
                v-for="(importance, index) in importances" 
                :key="index" :selected="importance === event.importance">
                    {{ importance }}
            </option>
        </select>
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
                    anchorDate: moment(),
                    allDay: false,
                    location: '',
                    endDate: null,
                    importance: "Medium"
                }
            }
        },
        submitFunction: Function,
        btnText: String
    },
    created() {
        this.event.anchorDate = moment(this.event.anchorDate);
        this.dateRange.push(this.event.anchorDate);
        if(this.passedBullet.endDate !== null) {
            this.event.endDate = moment(this.event.anchorDate);
            this.dateRange.push(this.event.endDate);
            this.multiDay = true;
        }
    },
    data() {
        return {
            event: {
                title: this.passedBullet.title,
                description: this.passedBullet.description,
                anchorDate: this.passedBullet.anchorDate,
                allDay: this.passedBullet.allDay,
                location: this.passedBullet.location,
                endDate: this.passedBullet.endDate,
                importance: this.passedBullet.importance
            },
            importances: ['High', 'Medium', 'Low'],
            multiDay: false,
            dateRange: []
        }
    },
    watch: {
        dateRange: function(arr) {
            if(arr.length !== 2)
                return;
    
            this.event.anchorDate = arr[0];
            this.event.endDate = arr[1];
        }
    },
    methods: {
        formatAndSubmit() {
            let retEvent = Vue.util.extend({},this.event);
            retEvent.anchorDate = retEvent.anchorDate.format();
            if(retEvent.endDate !== null)
                retEvent.endDate = retEvent.endDate.format();

            if(this.passedBullet._id !== undefined)
                retEvent["_id"] = this.passedBullet._id;
            
            retEvent.importance = retEvent.importance.toUpperCase();
            this.submitFunction(retEvent);
        }
    },
    formatImportance(importance) {
        if(importance.length === 0)
            return "";
        let str = importance.toLowerCase();
        str.splice(0, 1, str[0].toUpperCase());
        return str;
    }
}
</script>

<style lang="scss" scoped>
@import '../../styles/main.scss';

</style>