<template>
    <div class="create">
        <BasePopover title="Create" placement="leftTop">
            <template v-slot:content>
                <div class="radio--group">
                    <input class="radio--button" type="radio" id="taskForm" v-model="selectedComponent" value="taskForm">
                    <label class="radio--label" for="taskForm">Task</label>
                    <input class="radio--button" type="radio" id="eventForm" v-model="selectedComponent" value="eventForm">
                    <label class="radio--label" for="eventForm">Event</label>
                    <input class="radio--button" type="radio" id="noteForm" v-model="selectedComponent" value="noteForm">
                    <label class="radio--label" for="noteForm">Note</label>
                </div>

                <component :is="selectedComponent"
                    :submitFunction="create"
                    btnText="Create">
                </component>
            </template>
            <template v-slot:trigger>
                <font-awesome-icon 
                    class="create--icon noselect"
                    :icon="['far', 'plus-square']"/>
            </template>
        </BasePopover>
    </div>
</template>

<script>
import BasePopover from './BasePopover';
import TaskForm from '../forms/TaskForm';
import EventForm from '../forms/EventForm';
import NoteForm from '../forms/NoteForm';
import {mapActions} from 'vuex';

export default {
    data() {
        return {
            selectedComponent: null
        }
    },
    components: {
        taskForm: TaskForm,
        eventForm: EventForm,
        noteForm: NoteForm,
        BasePopover
    },
    methods: {
        ...mapActions(["createEvent", "createTask", "createNote"]),
        async create(bullet) {
            await this.submitFunction(bullet);
        }
    },
    computed: {
        submitFunction() {
            if(this.selectedComponent === "taskForm") {
                return this.createTask;
            } else if(this.selectedComponent === "eventForm") {
                return this.createEvent;
            } else if(this.selectedComponent === "noteForm") {
                return this.createNote;
            }
            return (bullet) => {console.log("No component selected")};
        }
        
    }

}
</script>

<style lang="scss" scoped>
@import '../../styles/main.scss';

.create {
  position: fixed;
  top: 3rem;
  right: 4%;

  &--icon {
    color: $color-primary;
    transform: scale(4);
  }
}

</style>

