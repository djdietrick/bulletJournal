<template>
    <div class="container">
        YEAR
    </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
    name: "Year",
    methods: {
        ...mapActions(["setYear", "fetchYearEvents"])
    },
    computed: {
        ...mapGetters(["getYear", "getYearEvents"])
    }
}
</script>

<style lang="scss" scoped>

</style>