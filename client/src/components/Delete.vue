<template>
    <a-popover class="delete" :title="'Delete ' + title + '?'" trigger="click" 
        v-model="visible" placement="right">
        <template slot="content">
            <div>
                <button class="btn" @click="deleteBullet(id)">Delete</button>
                <button class="btn" @click="close">Cancel</button>
            </div>
        </template>
        <font-awesome-icon 
        class="delete--icon"
        icon="trash"/>
    </a-popover>
</template>

<script>
import {mapActions} from 'vuex';
export default {
    props: {
        id: {
            type: String,
            required: true
        },
        title: String
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
    }
}
</script>

<style lang="scss" scoped>
@import '../styles/main.scss';

.delete {    
    //display: none;
    visibility: hidden;
    margin-left: 1rem;
    transition: 0.1s ease-in-out;

    &:hover {
        transform: scale(1.2);
    }

    &:focus {
        transform: scale(1.2);
        //display: inline-block;
        visibility: visible;
    }

    &--icon {
        color: $color-tertiary-dark;
    }
}

</style>