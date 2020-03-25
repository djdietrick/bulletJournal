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
        <BasePopover :title="task.title">
            <template v-slot:content>
                <div class="info">
                    <Toolbar :bullet="task"/>
                </div>
            </template>
            <template v-slot:trigger>    
                <p class="paragraph" :class="{completed: task.completed}">{{task.title}}</p>        
            </template>
        </BasePopover>
    </div>
</template>

<script>
import BasePopover from "../BasePopover";
import Toolbar from "./Toolbar";
import {mapActions} from "vuex";
export default {
    props: {
        task: Object
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
}

.completed {
    color: $color-grey-dark-2;
    text-decoration: line-through;
}


</style>