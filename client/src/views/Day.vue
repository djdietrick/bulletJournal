<template>
    <div class="grid-container">
        <div class="btnContainer" id='btn--left' v-on:click="moveBack">
            <font-awesome-icon class="arrow" icon="angle-left" size="6x"/>
        </div>
        <div class="btnContainer" id='btn--right' v-on:click="moveForward">
            <font-awesome-icon class="arrow" icon="angle-right" size="6x"/>
        </div>
        <div class="day-container">

        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import EventInfo from "../components/info/EventInfo";
import TaskInfo from "../components/info/TaskInfo";
import NoteInfo from "../components/info/NoteInfo";
import moment from "moment";

export default {
    data() {
        return {
            viewIndex: 0 //Keep track of where we are in day view, control how much we get when we move
        }
    },
    methods: {
        ...mapActions(["getBulletsForDayView"]),
        moveBack() {
            this.viewIndex--;
        },
        moveForward() {
            this.viewIndex++;
        }
    },
    computed: {
        ...mapGetters({
            bullets: "getDayBullets"
        }),
        bulletsByDay() {
            try {
                let bulls = {};
                this.bullets.forEach((bullet) => {
                    let bulletDates = [];
                    bulletDates.push(moment(bullet.anchorDate).format("YYYY-MM-DD"));

                    if(bullet._type === "event" && bullet.endDate) {
                        bulletDates.push(moment(bullet.endDate).format("YYYY-MM-DD"));
                    } else if(bullet._type === "task" && bullet.dueDate) {
                        bulletDates.push(moment(bullet.dueDate).format("YYYY-MM-DD"));
                    }

                    bulletDates.forEach(date => {
                        if(!bulls[date]) {
                            bulls[date] = [];
                        }
                        bulls[date].push(bullet);
                    });
                });
                return bulls;
            } catch(e) {
                console.log(e);
                return {};
            }  
        }
    },
    components: {
        EventInfo,
        TaskInfo,
        NoteInfo
    },
    watch: {
        viewIndex: function(val) {
            this.getBulletsForDayView(val);
        }
    },
    created() {
        this.getBulletsForDayView(this.viewIndex);
    }
}
</script>

<style lang="scss" scoped>
@import "../styles/main.scss";

.grid-container {
    display: grid;
    grid-template-columns: 1fr 95% 1fr ;
    grid-template-rows: 1fr;
}

#btn--left {
    grid-column: 1 / 2;
    align-self: center;
}

#btn--right {
    grid-column: 3 / 4;
    align-self: center;
}

</style>