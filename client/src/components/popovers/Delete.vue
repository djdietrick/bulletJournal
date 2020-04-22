<template>
    <BasePopover class="delete" :title="'Delete ' + title + '?'" :placement="placement">
        <template v-slot:content>
            <div>
                <button class="btn" @click="deleteBullet(id)">Delete</button>
                <button class="btn" @click="close">Cancel</button>
            </div>
        </template>
        <template v-slot:trigger>
            <font-awesome-icon 
                class="delete--icon"
                icon="trash"
                size="2x"/>
        </template>
    </BasePopover>
</template>

<script>
import {mapActions} from 'vuex';
import BasePopover from './BasePopover';
export default {
    props: {
        id: {
            type: String,
            required: true
        },
        title: String,
        placement: {
            default: 'right'
        }
    },
    data() {
        return {
            visible: false
        }
    },
    methods: {
        ...mapActions(["deleteBullet"]),
        close() {
            this.visible = false;
        }
    },
    components: {
        BasePopover
    }
}
</script>

<style lang="scss" scoped>
@import '../../styles/main.scss';

.delete {    
    margin-left: 1rem;
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