<template>
    <div class="bullet__nav">
        <div class="nav">
            <router-link class="nav__link" to="/bullets/year" append active>Year</router-link>
            <router-link class="nav__link" to="/bullets/month" append>Month</router-link>
            <router-link class="nav__link" to="/bullets/day" append>Week</router-link>
        </div>
        <Create/>
        <Options/>
    </div>
</template>

<script>
import Create from '../popovers/Create.vue';
import Options from '../popovers/Options.vue';
export default {
  components: {
    Create,
    Options
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/main.scss";

</style>