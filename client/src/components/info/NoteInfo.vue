<template>
    <BasePopover :title="note.title">
        <template v-slot:content>
            <div class="info">
                <Toolbar :bullet="note"/>
            </div>
        </template>
        <template v-slot:trigger>
            <div class="note">
                <font-awesome-icon icon="pencil-alt" class="paragraph note--icon"/>
                <p class="paragraph note--text">{{note.title}}</p>
            </div>
        </template>
    </BasePopover>
</template>

<script>
import BasePopover from "../popovers/BasePopover";
import Toolbar from "./Toolbar";
import moment from "moment";
import {mapActions} from "vuex";
export default {
    props: {
        note: Object,
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
        ...mapActions(["updateNote"])
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/main.scss";

.note {

    &:hover {
        cursor: pointer;
    }

    display: grid;
    grid-template-columns: 2.5rem 1fr;
    align-items: center;

    &--icon {
        color: $color-primary-light;
        //font-size: 10rem;
        display: inline-block;
    }

    &--text {
        color: $color-primary-light;
        display: inline-block;
    }
}

</style>