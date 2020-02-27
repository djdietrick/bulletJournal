<template>
    <div class="container">
        <h1>{{year}}</h1>  
        <div class="buttonContainer" id='leftButton' v-on:click="moveBack"></div>
        <div class="buttonContainer" id='rightButton' v-on:click="moveForward"></div>

        <div class="monthsContainer">
            <div v-for="(name, index) in displayMonths" :key="index" class="month">
                {{parseInt(index) + 1}} {{name}}
                <ul class="eventList">
                    <li v-for="event in eventsByMonth[index]" :key="event._id">{{event.title}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

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
}

h1 {
    grid-column: 1 / -1;
}

.buttonContainer {
    background-color: #5643fa;
}

#leftButton {
    grid-column: 1 / 2;
}

#rightButton {
    grid-column: 3 / 4;
}


</style>