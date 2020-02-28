<template>
    <div class="container">
        <h2 class="heading-secondary">{{monthString}} {{year}}</h2>  
        <div class="btnContainer" id='btn--left' v-on:click="moveBack">
            <font-awesome-icon icon="angle-left" size="6x"/>
        </div>
        <div class="btnContainer" id='btn--right' v-on:click="moveForward">
            <font-awesome-icon icon="angle-right" size="6x"/>
        </div>

        <div class="monthContainer">
            <div class="agenda">
                <div v-for="n in daysInMonth" :key="n" class="agenda__day">
                    <p class="paragraph">
                        <span class="agenda__day--date">{{n}} </span> 
                        <span v-html="getEventString(n)"/>
                    </p>
                </div>
            </div>
            <div class="tasks">
                <ul class="tasks__list">
                    <li v-for="task in monthTasks" :key="task._id" class="task paragraph">
                        {{task.title}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import moment from "moment";

export default {
    name: "Month",
    data() {
        return {         
        }
    },
    methods: {
        ...mapActions(["setYear", "setMonth", "fetchMonthBullets"]),
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
        getEventString(day) {
            let str = "";
            if(!this.eventsByDay[day])
                return str;

            for(let i = 0; i < this.eventsByDay[day].length; i++) {
                let event = this.eventsByDay[day][i];
                str += "<span class='agenda__day--title'>" + event.title + "</span> ";
                str += "<span class='agenda__day--details'>"
                if(!event.allDay && !event.endDate) {
                    const anchorDate = moment(event.anchorDate);
                    str += anchorDate.format("h") + ":" + anchorDate.format("mmA") + " ";
                }
                if(event.location) {
                    str += "@ " + event.location;
                }
                str += "</span>";
            }

            return str;
        }
    },
    computed: {
        ...mapGetters({
            year: "getYear", 
            month: "getMonth", 
            monthBullets: "getMonthBullets"
        }),
        monthEvents() {
            return this.monthBullets.events;
        },
        monthTasks() {
            return this.monthBullets.tasks;
        },
        daysInMonth() {
            return moment([this.year, this.month]).daysInMonth();
        },
        monthString() {
            return moment([this.year, this.month]).format('MMMM');
        },
        eventsByDay() {
            let e = {};

            try {
                for(let i = 1; i <= this.daysInMonth; i++) {
                    // TODO : need to handle if event wraps around months
                    const date = moment([this.year, this.month, i]);
                    e[i] = this.monthEvents.filter((event) => {
                        const anchorDate = new Date(event.anchorDate);
                        if(event.endDate) {
                            const endDate = new Date(event.endDate);
                            return (anchorDate.getDate() <= i && i <= endDate.getDate());
                        } else {
                            return anchorDate.getDate() == i;
                        }
                    })
                }
            } catch(e) {
                console.log(e);
            }
            return e;
        }
    },
    watch: {
        month: function() {
            this.fetchMonthBullets();
        }
    },
    created() {
        this.fetchMonthBullets();
    }
}
</script>

<style lang="scss" scoped>
@import '../styles/main.scss';

.container {
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
    grid-gap: 3rem;
    padding: 0rem 1rem;
}

.agenda {
    grid-column: 1 / 2;
    border: 2px solid $color-primary-dark;
    border-radius: 1rem;

    display: grid;
    grid-template-rows: repeat(daysInMonth, 1fr);
    align-items: center;
    box-shadow: 0 1rem 1rem rgba($color-black, .2);

    &__day {
        width: 95%;
        left: 3rem;
        margin-left: 1.5rem;

        &:not(:last-child) {
            border-bottom: 1px solid $color-grey-dark-3;
        }

        &--date { 
            color: $color-tertiary-dark;
            font-weight: 600;
        }

        &--details {
            color: $color-primary-light;
        }
    }
}

.tasks {
    grid-column: 2 / 3;
    border: 2px solid $color-primary-dark;
    border-radius: 1rem;
    box-shadow: 0 1rem 1rem rgba($color-black, .2);
    position: relative;

    &__list {
        position: absolute;
        left: 3rem;
        top: 1rem;
    }
}

.btnContainer {
    //background-color: $color-secondary-light;
    position: relative;
    align-self:center;

    font-awesome-icon {
        fill: $color-secondary;
    }
}

#btn--left {
    grid-column: 1 / 2;
}

#btn--right {
    grid-column: 3 / 4;
}



</style>