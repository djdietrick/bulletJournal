<template>
    <div class="grid-container">
        <h2 class="heading-secondary">Week of {{sundayMoment.format("MMMM Do, YYYY")}}</h2>  
        <div class="btnContainer" id='btn--left' v-on:click="moveBack">
            <font-awesome-icon class="arrow" icon="angle-left" size="6x"/>
        </div>
        <div class="btnContainer" id='btn--right' v-on:click="moveForward">
            <font-awesome-icon class="arrow" icon="angle-right" size="6x"/>
        </div>
        <div class="day-container">
            <div v-for="n in 7" :key="n" class="day">
                <h3 class="day__heading heading-tertiary">{{getDateString(n)}}</h3>
                <ul class="day__list">
                    <li v-for="bullet in getBulletsForDay(n)" :key="bullet._id">
                        <template v-if="bullet._type == 'event'">
                            <EventInfo :event="bullet" :month="month"/>
                        </template>
                        <template v-else-if="bullet._type == 'task'">
                            <TaskInfo :task="bullet"/>
                        </template>
                        <template v-else>
                            <NoteInfo :note="bullet"/>
                        </template>
                    </li>
                </ul>
            </div>
        </div> 
    </div>
</template>

<script>
import Vue from "vue";
import {mapActions, mapGetters} from "vuex";
import EventInfo from "../components/info/EventInfo";
import TaskInfo from "../components/info/TaskInfo";
import NoteInfo from "../components/info/NoteInfo";
import moment from "moment";

export default {
    data() {
        return {
            
        }
    },
    methods: {
        ...mapActions(["fetchBullets", "setYear", "setMonth", "setSunday"]),
        moveBack() {
            const prevSunday = this.sundayMoment;
            prevSunday.day(-7);
            this.setSunday(prevSunday.date());
            this.setMonth(prevSunday.month());
            this.setYear(prevSunday.year());
            this.fetchBullets();
        },
        moveForward() {
            const nextSunday = this.sundayMoment;
            nextSunday.day(7);
            this.setSunday(nextSunday.date());
            if(nextSunday.month() != this.month)
                this.setMonth(nextSunday.month());
            if(nextSunday.year() != this.year)            
                this.setYear(nextSunday.year());
            this.fetchBullets();
        },
        getBulletsForDay(index) {
            let bullets = [];
            const date = moment([this.year, this.month, this.sunday]).days(index - 1);

            bullets.push(...this.events.filter(event => {
                const anchorDate = moment(event.anchorDate);
                const endDate = event.endDate ? moment(event.endDate) : null;

                return date.isSame(anchorDate, "day")
                    || (endDate && (date.isBetween(anchorDate, endDate) || date.isSame(endDate, "day")));
            }));

            bullets.push(...this.tasks.filter(task => {
                const anchorDate = moment(task.anchorDate);
                const dueDate = task.dueDate ? moment(task.dueDate) : null;

                return date.isSame(anchorDate, "day")
                    || (dueDate && date.isSame(dueDate, "day"));
            }));

            bullets.push(...this.notes.filter(note => {
                const anchorDate = moment(note.anchorDate);

                return date.isSame(anchorDate, "day");
            }));

            return bullets;
        },
        getDateString(index) {
            return moment([this.year, this.month, this.sunday]).day(index - 1).format("D ddd");
        }
    },
    computed: {
        ...mapGetters({
            events: "getWeekEvents",
            tasks: "getWeekTasks",
            notes: "getWeekNotes",
            sunday: "getSunday",
            month: "getMonth", 
            year: "getYear"
        }),
        sundayMoment() {
            return moment([this.year, this.month, this.sunday]);
        }
    },
    components: {
        EventInfo,
        TaskInfo,
        NoteInfo
    },
    created() {
        this.fetchBullets();
    }
}
</script>

<style lang="scss" scoped>
@import "../styles/main.scss";

.grid-container {
    display: grid;
    grid-template-columns: 1fr 95% 1fr ;
    grid-template-rows: 6rem 1fr;
}

.day-container {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 1rem;
    height: 85vh;
}

h2 {
    grid-column: 1 / -1;
    text-align: center;
}

#btn--left {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    align-self: center;
    justify-self: center;
}

#btn--right {
    grid-row: 2 / 3;
    grid-column: 3 / 4;
    align-self: center;
    justify-self: center;
}

.day {
    border: 2px solid $color-primary;
    padding: 1rem;
    border-radius: 1rem;

    &__list {
        list-style-type: none;
    }
}

</style>