<template>
    <div class="options">
        <BasePopover placement="bottomLeft">
            <template v-slot:content>
                <div class="btn" @click.prevent='logoutUser'>Logout</div>
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
import {mapActions} from 'vuex';
export default {
    components: {
        BasePopover
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

    &--icon {
    color: $color-primary-light;
    transform: scale(4);
  }
}

</style>