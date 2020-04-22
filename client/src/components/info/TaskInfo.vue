<template>
    <div class="task paragraph">
        <div v-on:click="completeTask()">
            <template v-if="task.completed">
                <font-awesome-icon icon="check-square"/>
            </template>
            <template v-else>
                <font-awesome-icon :icon="['far', 'square']"/>
            </template>
        </div>
        <BasePopover :title="task.title" :placement="placement">
            <template v-slot:content>
                <div class="info">
                    <div v-if="task.description && task.description.length !== 0" class="info__group">
                        <span class="info__key">Description</span>
                        <span class="info__value">{{task.description}}</span>
                    </div>
                    <div class="info__group">
                        <span class="info__key">Date</span>
                        <span class="info__value">{{getDisplayDate(task.anchorDate)}}</span>
                    </div>
                    <div v-if="task.dueDate" class="info__group">
                        <span class="info__key">Due Date</span>
                        <span class="info__value">{{getDisplayDate(task.dueDate)}}</span>
                    </div>
                    <div v-if="task.completedDate" class="info__group">
                        <span class="info__key">Completed Date</span>
                        <span class="info__value">{{getDisplayDate(task.completedDate)}}</span>
                    </div>
                    <Toolbar class="info__footer" :bullet="task"/>
                </div>
            </template>
            <template v-slot:trigger>
                <div class="task__text">
                    <p class="paragraph" :class="{completed: task.completed, 
                        overdue: isOverdue(task)}">{{task.title}}</p>    
                    <font-awesome-icon v-if="isOverdue(task)" class="overdue__icon" icon="exclamation-circle"/> 
                </div>
            </template>
        </BasePopover>
    </div>
</template>

<script>
import BasePopover from "../popovers/BasePopover";
import Toolbar from "./Toolbar";
import {mapActions} from "vuex";
import moment from "moment";
export default {
    props: {
        task: Object,
        placement: {
            type: String,
            default: "right"
        }
    },
    components: {
        BasePopover,
        Toolbar
    },
    methods: {
        ...mapActions(["updateTask"]),
        completeTask() {
            const update = {
                _id: this.task._id,
                completed: !this.task.completed
            }
            this.updateTask(update);
        },
        isOverdue(task) {
            if(!task.dueDate) return false;
            if(task.completed === true) return false;
            return moment(task.dueDate).unix() < moment().unix();
        },
        getDisplayDate(date) {
            return moment(date).format("MMM D, YYYY");
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/main.scss";

.task {
    display:grid;
    grid-template-columns: 2.5rem 1fr;
    align-items: center;

    cursor: pointer;

    &__text {
        display: flex;
        align-items: center;
    }
}

.completed {
    color: $color-grey-dark-2;
    text-decoration: line-through;
}

.overdue {
    color: $color-warning;

    &__icon {
        display: inline-block;
        color: $color-warning;
        margin-left: 7px;
    }
}


</style>