<template>
    <div class="grid-container">
        <div id="nav">
            <router-link to="/create/event">Event</router-link>
            <router-link to="/create/task">Task</router-link>
            <router-link to="/create/note">Note</router-link>
        </div>
        <router-view name="createView"></router-view>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '../styles/main.scss';

</style>

