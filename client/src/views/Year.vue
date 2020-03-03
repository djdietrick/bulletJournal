<template>
    <div class="container">
        <h2 class="heading-secondary">{{year}}</h2>  
        <div class="btnContainer" id='btn--left' v-on:click="moveBack">
            <font-awesome-icon icon="angle-left" size="6x"/>
        </div>
        <div class="btnContainer" id='btn--right' v-on:click="moveForward">
            <font-awesome-icon icon="angle-right" size="6x"/>
        </div>

        <div class="monthsContainer">
            <div v-for="(name, index) in displayMonths" :key="index" class="month">
                <h3 class="month__heading heading-tertiary">{{parseInt(index) + 1}} {{name}}</h3>
                <ul class="month__events">
                    <li class="paragraph" v-for="event in eventsByMonth[index]" :key="event._id">
                        <span id="event--title">{{ getDateString(event, index) }}: {{event.title}}   </span> 
                        <span id="event--details">{{getDisplayString(event)}}</span>
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
    name: "Year",
    data() {
        return {
        }
    },
    methods: {
        ...mapActions(["setYear", "setMonth", "fetchYearEvents"]),
        moveBack() {
            if(this.month < 6) {
                // Move back to back half of last year
                this.setYear(this.year - 1);
                this.setMonth(6);
            } else {
                // Move to first half of same year
                this.setMonth(0);
            }
        },
        moveForward() {
            if(this.month >= 6) {
                // Move forward to first half of next year
                this.setYear(this.year + 1);
                this.setMonth(0);
            } else {
                // Move to back half of same year
                this.setMonth(6);
            }
        },
        getDateString(event, month) {
            if(!event.endDate) {
                return new Date(event.anchorDate).getDate();
            } else {
                let start, end;
                const anchorDate = moment(event.anchorDate);
                const endDate = moment(event.endDate);
                start = anchorDate.month() == month ? anchorDate.format("D") : anchorDate.format("MMM D");
                end = endDate.month() == month ? endDate.format("D") : endDate.format("MMM D");

                return start + " - " + end;
            }
        },
        getDisplayString(event) {
            let str = "";
            if(!event.allDay && !event.endDate) {
                const anchorDate = moment(event.anchorDate);
                str += anchorDate.format("h") + ":" + anchorDate.format("mmA") + " ";
            }
            if(event.location) {
                str += "@ " + event.location;
            }
            return str;
        }
    },
    computed: {
        ...mapGetters({
            year: "getYear", 
            month: "getMonth", 
            yearEvents: "getYearEvents", 
            monthEvents: "getMonthEvents"}),
        displayMonths() {
            if(this.month < 6) {
                return {
                    0: 'January',
                    1: 'February',
                    2: 'March',
                    3: 'April',
                    4: 'May',
                    5: 'June'
                }
            } else {
                return {
                    6: 'July',
                    7: 'August',
                    8: 'September',
                    9: 'October',
                    10: 'November',
                    11: 'December'
                }
            }
        },
        eventsByMonth() {
            let e = {};

            for(let index of Object.keys(this.displayMonths)) {
                e[index] = this.monthEvents(index);
            }
            return e;
        }
    },
    watch: {
        year: function() {
            this.fetchYearEvents();
        }
    },
    created() {
        this.fetchYearEvents();
    }
}
</script>

<style lang="scss" scoped>
@import '../styles/main.scss';

.container {
    display: grid;
    grid-template-columns: 1fr 95% 1fr ;
    grid-template-rows: 6rem 1fr;
}

.monthsContainer {
    grid-column: 2/3;
    grid-row: 2 / -1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 2rem;
    padding: 0rem 1rem;
}

.month {
    border: 2px solid $color-primary;
    position: relative;
    border-radius: 1rem;
    box-shadow: 0 1rem 1rem rgba($color-black, .2);

    &__heading {
        position: absolute;
        top: 1rem;
        left: 2rem;
    }

    &__events {
        position: absolute;
        top: 4.5rem;
        left: 2rem;
        list-style-type: none;
    }
}

h2 {
    grid-column: 1 / -1;
    text-align: center;
}

#event--title {
    color: $color-primary-light;
    font-weight: 500;
}

#event--details {
    color: $color-primary;
    font-weight: 500;
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