<template>
    <div class="grid-container">
        <h2 class="heading-secondary">{{monthString}} {{year}}</h2>  
        <div class="btnContainer" id='btn--left' v-on:click="moveBack">
            <font-awesome-icon class="arrow" icon="angle-left" size="6x"/>
        </div>
        <div class="btnContainer" id='btn--right' v-on:click="moveForward">
            <font-awesome-icon class="arrow" icon="angle-right" size="6x"/>
        </div>

        <div class="monthContainer">
            <div class="agenda">
                <div v-for="n in daysInMonth" :key="n" class="agenda__day">
                    <span class="paragraph agenda__day--date"
                        :class="{currentDay: isCurrentDay(n)}">{{n}}</span>
                    <span class="paragraph agenda__day--date"
                        :class="{currentDay: isCurrentDay(n)}">{{getDayOfWeekChar(n)}}</span>
                    <div class="agenda__day--text">
                        <EventInfo class="agenda__day--event" v-for="(event, index) in eventsByDay[n]" :key="index"
                            :event="event" :month="parseInt(index)"/>
                    </div>
                </div>
            </div>
            <div class="tasks">
                <ul class="tasks__list">
                    <li v-for="task in monthTasks" :key="task._id" class="task-container">  
                        <TaskInfo :task="task"/>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import moment from "moment";
import EventInfo from "../components/info/EventInfo";
import TaskInfo from "../components/info/TaskInfo";

export default {
    name: "Month",
    data() {
        return {
            currentDate: moment()   
        }
    },
    components: {
        EventInfo,
        TaskInfo
    },
    methods: {
        ...mapActions(["setYear", "setMonth", "fetchBullets"]),
        moveBack() {
            if(this.month == 0) {
                this.setMonth(11);
                this.setYear(this.year - 1);
            } else {
                this.setMonth(this.month - 1);
            }
        },
        moveForward() {
            if(this.month == 11) {
                this.setMonth(0);
                this.setYear(this.year + 1);
            } else {
                this.setMonth(this.month + 1);
            }
        },
        getEventsByDay(day) {
            return this.eventsByDay[day];
        },
        getDayOfWeekChar(dayOfMonth) {
            return moment({
                year: this.year,
                month: this.month,
                date: dayOfMonth
            }).format("dd")[0];
        },
        isCurrentDay(dayOfMonth) {
            return dayOfMonth === this.currentDate.date()
                && this.currentDate.month() === this.month
                && this.currentDate.year() === this.year
        }
    },
    computed: {
        ...mapGetters({
            year: "getYear", 
            month: "getMonth", 
            monthEvents: "getMonthEvents",
            monthTasks: "getMonthTasks"
        }),
        daysInMonth() {
            return moment([this.year, this.month]).daysInMonth();
        },
        monthString() {
            return moment([this.year, this.month]).format('MMMM');
        },
        eventsByDay() {
            let ev = {};

            try {
                if(this.monthEvents === undefined)
                    return ev;

                for(let i = 1; i <= this.daysInMonth; i++) {
                    // TODO : need to handle if event wraps around months
                    const date = moment([this.year, this.month, i]);
                    ev[i] = this.monthEvents.filter((event) => {
                        const anchorDate = moment(event.anchorDate);
                        if(event.endDate) {
                            const endDate = moment(event.endDate);
                            return (anchorDate.isBefore(date) || anchorDate.isSame(date, "day"))
                                && (endDate.isAfter(date) || endDate.isSame(date, "day"));
                            //return (anchorDate.getDate() <= i && i <= endDate.getDate());
                        } else {
                            return anchorDate.isSame(date, "day");
                        }
                    })
                }
            } catch(e) {
                console.log(e);
            }
            return ev;
        }
    },
    watch: {
        month: function() {
            this.fetchBullets();
        }
    },
    created() {
        this.fetchBullets();
    }
}
</script>

<style lang="scss" scoped>
@import '../styles/main.scss';

.grid-container {
    display: grid;
    grid-template-columns: 1fr 95% 1fr;
    grid-template-rows: 6rem 1fr;
}

h2 {
    grid-column: 1 / -1;
    text-align: center;
}

.monthContainer {
    grid-column: 2 / 3;
    grid-row: 2 / -1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    padding: 0rem 1rem;
}

.agenda {
    grid-column: 1 / 2;
    border: 2px solid $color-primary;
    border-radius: 1rem;

    display: grid;
    grid-template-rows: repeat(daysInMonth, 1fr);
    align-items: center;
    box-shadow: 0 1rem 1rem rgba($color-black, .2);
    height: 85vh;

    overflow-y: auto;

    &__day {
        width: 95%;
        left: 3rem;
        margin-left: 1.5rem;
        display: grid;
        grid-template-columns: 2.2rem 1.5rem 1fr;
        //grid-column-gap: 1rem;

        &:first-child {
            margin-top: 0.5rem;
        }

        &:last-child {
            margin-bottom: 0.5rem;
        }

        &:not(:last-child) {
            border-bottom: 1px solid $color-grey-dark-4;
        }

        &--date { 
            color: $color-tertiary-dark;
            font-weight: 600;
        }

        &--event {
            margin-left: 5px;

            &:not(:last-child) {
                margin-right: 5px;
            }
        }
    }

    .currentDay {
        color: white;
    }
}

.tasks {
    grid-column: 2 / 3;
    border: 2px solid $color-primary;
    border-radius: 1rem;
    box-shadow: 0 1rem 1rem rgba($color-black, .2);
    position: relative;

    height: 85vh;
    overflow-y: auto;

    &__list {
        position: absolute;
        left: 3rem;
        top: 1rem;

        list-style-type: none;

    }
}

.btnContainer {
    //background-color: $color-secondary-light;
    position: relative;
    align-self:center;
}

#btn--left {
    grid-column: 1 / 2;
    align-self: center;
    justify-self: center;
}

#btn--right {
    grid-column: 3 / 4;
    align-self: center;
    justify-self: center;
}

</style>