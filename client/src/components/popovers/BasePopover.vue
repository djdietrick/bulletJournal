<template>
    <a-popover :title="title" :trigger="trigger" :placement="placement">
        <template slot="content">
            <slot name="content"></slot>
        </template>
        <slot name="trigger"></slot>
    </a-popover>
</template>

<script>
export default {
    props: {
        title: String,
        trigger: {
            type: String,
            default: "click"
        },
        placement: {
            type: String,
            default: "bottom"
        }

    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/main.scss";

</style>