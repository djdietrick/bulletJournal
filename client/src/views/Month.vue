<template>
    <div class="container">
        <h1>{{monthString}} {{year}}</h1>

        <div class="buttonContainer" id='leftButton' v-on:click="moveBack"></div>
        <div class="buttonContainer" id='rightButton' v-on:click="moveForward"></div>

        <div class="monthContainer">
            <div class="agenda">
                <div v-for="n in daysInMonth" :key="n" class="agenda__day">
                    {{n}}
                </div>
            </div>
            <div class="tasks">

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
                    e[i] = this.monthEvents.filter((event) => {
                        const anchorDate = new Date(event.anchorDate);
                        const endDate = new Date(event.endDate);
                        return (anchorDate.getDate() <= i && i <= endDate.getDate());
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
.container {
    display: grid;
    grid-template-columns: 1fr 95% 1fr;
    grid-template-rows: 6rem 1fr;
}

h1 {
    grid-column: 1 / -1;
}

.monthContainer {
    grid-column: 2 / 3;
    grid-row: 2 / -1;
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.agenda {
    grid-column: 1 / 2;

    display: grid;
    grid-template-rows: repeat(daysInMonth, 1fr);
}

.tasks {
    grid-column: 2 / 3;
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