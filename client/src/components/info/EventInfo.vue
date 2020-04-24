<template>
    <BasePopover :title="event.title" class="event">
        <template v-slot:content>
            <div class="info">
                <div class="info">
                    <div v-if="event.description && event.description.length !== 0" class="info__group">
                        <span class="info__key">Description</span>
                        <span class="info__value">{{event.description}}</span>
                    </div>
                    <div class="info__group">
                        <span class="info__key">Date</span>
                        <span class="info__value">{{infoDate}}</span>
                    </div>
                    <div v-if="event.location" class="info__group">
                        <span class="info__key">Location</span>
                        <span class="info__value">{{event.location}}</span>
                    </div>
                </div>
                <Toolbar class="info__footer" :bullet="event" placement="right"/>
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
        },
        infoDate() {
            if(this.event.endDate) {
                return moment(this.event.anchorDate).format("MMM D, YYYY") + " - "
                 + moment(this.event.endDate).format("MMM D, YYYY");
            } else if(this.event.allDay) {
                return moment(this.event.anchorDate).format("h:mma MMM D, YYYY");
            } else {
                return moment(this.event.anchorDate).format("MMM D, YYYY");
            }
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
    color: $color-grey-light-1;
    margin-right: 5px;
    font-size: 0.9rem;
    transform: translateY(-2px);
}

#event--date {
    margin-right: 4px;
    color: $color-tertiary-dark;
    font-weight: 500;
}

#event--title {
    @extend .paragraph;
}

#event--details {
    @extend .paragraph;
    margin-left: 4px;
    color: $color-primary-light !important;
}

</style>