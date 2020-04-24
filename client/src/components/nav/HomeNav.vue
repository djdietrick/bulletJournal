<template>
    <div class="bullet__nav">
        <div class="nav">
            <router-link class="nav__link" to="/">Home</router-link>
            <router-link class="nav__link" to="/login">Login</router-link>
            <router-link class="nav__link" to="/signup">Signup</router-link>
        </div>
    </div>
</template>

<script>
import Create from '../popovers/Create';
export default {
    components: {
        Create
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/main.scss";

</style>