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
                    <span class="paragraph agenda__day--date">{{n}} </span> 
                    <span v-html="getEventString(n)" class="paragraph"/>
                </div>
            </div>
            <div class="tasks">
                <ul class="tasks__list">
                    <li v-for="task in monthTasks" :key="task._id" class="task paragraph">   
                        <div v-on:click="completeTask(task)">
                            <template v-if="task.completed">
                                <font-awesome-icon icon="check-square"/>
                            </template>
                            <template v-else>
                                <font-awesome-icon :icon="['far', 'square']"/>
                            </template>
                        </div>
                        <p class="paragraph" :class="{completed: task.completed}">{{task.title}}</p>
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
        ...mapActions(["setYear", "setMonth", "fetchMonthBullets", "updateTask"]),
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
        },
        completeTask(task) {
            const update = {
                _id: task._id,
                completed: !task.completed
            }
            this.updateTask(update);
        }
    },
    computed: {
        ...mapGetters({
            year: "getYear", 
            month: "getMonth", 
            monthBullets: "getMonthBullets"
        }),
        monthEvents() {
            return this.monthBullets.event;
        },
        monthTasks() {
            return this.monthBullets.task;
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
    grid-template-columns: 1fr 95%;
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
    border: 2px solid $color-primary;
    border-radius: 1rem;

    display: grid;
    grid-template-rows: repeat(daysInMonth, 1fr);
    align-items: center;
    box-shadow: 0 1rem 1rem rgba($color-black, .2);

    &__day {
        width: 95%;
        left: 3rem;
        margin-left: 1.5rem;
        display: grid;
        grid-template-columns: 2.5rem 1fr;
        //grid-column-gap: 1rem;

        &:first-child {
            margin-top: 0.5rem;
        }

        &:last-child {
            margin-bottom: 0.5rem;
        }

        &:not(:last-child) {
            border-bottom: 1px solid $color-grey-dark-3;
        }

        &--date { 
            color: $color-tertiary-dark;
            font-weight: 600;
        }

        &--title {
            color: $color-primary-light;
        }

        &--details {
            color: $color-primary;
        }
    }
}

.tasks {
    grid-column: 2 / 3;
    border: 2px solid $color-primary;
    border-radius: 1rem;
    box-shadow: 0 1rem 1rem rgba($color-black, .2);
    position: relative;

    &__list {
        position: absolute;
        left: 3rem;
        top: 1rem;
    }
}

.task {
    display:grid;
    grid-template-columns: 2.5rem 1fr;
    align-items: center;

    cursor: pointer;
}

.completed {
    color: $color-grey-dark-2;
    text-decoration: line-through;
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