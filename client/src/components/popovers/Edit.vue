<template>
    <BasePopover class="edit" title="Edit" :placement="placement">
        <template v-slot:content>
            <div>
                <component :is="selectedComponent"
                    :submitFunction="update"
                    :passedBullet="bullet"
                    btnText="Update">
                </component>
            </div>
        </template>
        <template v-slot:trigger>
            <font-awesome-icon 
                class="edit--icon"
                icon="edit"
                size="2x"/>
        </template>
    </BasePopover>
</template>

<script>
import EventForm from "../forms/EventForm";
import TaskForm from "../forms/TaskForm";
import NoteForm from "../forms/NoteForm";
import BasePopover from "./BasePopover";
import {mapActions} from "vuex";

export default {
    props: {
        formType: String,
        bullet: Object,
        placement: {
            default: "bottom"
        }
    },
    components: {
        eventForm: EventForm,
        taskForm: TaskForm,
        noteForm: NoteForm,
        BasePopover
    },
    methods: {
        ...mapActions(["updateEvent", "updateTask", "updateNote"]),
        async update(bullet) {
            await this.submitFunction(bullet);
        }
    },
    computed: {
        submitFunction() {
            if(this.selectedComponent === "taskForm") {
                return this.updateTask;
            } else if(this.selectedComponent === "eventForm") {
                return this.updateEvent;
            } else if(this.selectedComponent === "noteForm") {
                return this.updateNote;
            }
            return (bullet) => {console.log("No component selected")};
        },
        selectedComponent() {
            if(this.formType === "event")
                return "eventForm";
            else if(this.formType === "task")
                return "taskForm";
            else if(this.formType === "note")
                return "noteForm";
            throw "Must provide edit component with a formType";
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/main.scss";

.edit {    
    transition: 0.1s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }

    &:focus {
        transform: scale(1.1);
        //display: inline-block;
        //visibility: visible;
    }

    &--icon {
        color: $color-tertiary-dark;
    }
}

</style>