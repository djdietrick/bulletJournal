<template>
    <div class="options">
        <BasePopover placement="bottomRight">
            <template v-slot:content>
                <div class="options__list">
                    <HowTo/>
                    <div class="btn" @click.prevent='logoutUser'>Logout</div>
                </div>
            </template>
            <template v-slot:trigger>
                <font-awesome-icon 
                    class="options--icon noselect"
                    icon="bars"/>
            </template>
        </BasePopover>
    </div>
</template>

<script>
import BasePopover from './BasePopover';
import HowTo from './HowTo';
import {mapActions} from 'vuex';
export default {
    components: {
        BasePopover,
        HowTo
    },
    methods: {
        ...mapActions(['logout']),
        async logoutUser() {
            await this.logout();
            this.$router.push('/');
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../styles/main.scss';

.options {
    position: fixed;
    top: 3rem;
    left: 4%;

    &__list {
        display: flex;
        flex-direction: column;
    }

    &--icon {
        color: $color-primary;
        transform: scale(4);
    }
}

</style>