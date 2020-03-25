<template>
    <BasePopover :title="event.title">
        <template v-slot:content>
            <div class="info">
                
            </div>
        </template>
        <template v-slot:trigger>
            <div>
                <p id="paragraph event--title">{{ dateString }}: {{event.title}}   </p> 
                <p id="paragraph event--details">{{ displayString }}</p>
            </div>
        </template>
    </BasePopover>
</template>

<script>
import BasePopover from "../BasePopover";
import NoteForm from "../forms/NoteForm";
import Delete from "../Delete";
export default {
    components: {
        BasePopover,
        NoteForm,
        Delete
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/main.scss";

</style>