<template>
    <BasePopover :title="event.title" class="event">
        <template v-slot:content>
            <div class="info">
                <Toolbar :bullet="event"/>

            </div>
        </template>
        <template v-slot:trigger class="event__text">
            <!-- <font-awesome-icon :icon="['far', 'circle']" class="paragraph event--icon"/> -->
            <font-awesome-icon icon="circle" class="paragraph event--icon"/>

            <p v-if="addDateString" id="event--date">{{ dateString }}:</p>
            <p id="event--title">{{event.title}}</p> 
            <p id="event--details">&nbsp; &nbsp; {{  displayString }}</p>
        </template>
    </BasePopover>
</template>

<script>
import BasePopover from "../popovers/BasePopover";
import Toolbar from "./Toolbar";
import moment from "moment";

export default {
    props: {
        event: Object,
        month: Number,
        addDateString: Boolean
    },
    components: {
        BasePopover,
        Toolbar
    },
    computed: {
        dateString() {
            if(!this.event.endDate) {
                return moment(this.event.anchorDate).date();
            } 
            let start, end;
            const anchorDate = moment(this.event.anchorDate);
                const endDate = moment(this.event.endDate);
                start = anchorDate.month() == this.month ? anchorDate.format("D") : anchorDate.format("MMM D");
                end = endDate.month() == this.month ? endDate.format("D") : endDate.format("MMM D");

                return start + " - " + end;
        },
        displayString() {
             let str = "";
            if(!this.event.allDay && !this.event.endDate) {
                const anchorDate = moment(this.event.anchorDate);
                str += anchorDate.format("h") + ":" + anchorDate.format("mmA") + " ";
            }
            if(this.event.location) {
                str += "@ " + this.event.location;
            }
            return str;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/main.scss";

p {
    display: inline-block;
    font-size: $default-font-size;
}

.event:hover {
    cursor: pointer;
}

.event__text {
    display: flex;
    align-items: center;
}

.event--icon {
    color: $color-primary-light;
    margin-right: 5px;
    font-size: 1rem;
}

#event--date {
    margin-right: 4px;
    color: $color-primary-light;
    font-weight: 500;
}

#event--title {
    color: $color-primary-light;
    font-weight: 400;
}

#event--details {
    margin-left: 4px;
    color: $color-primary;
    font-weight: 400;
}

</style>