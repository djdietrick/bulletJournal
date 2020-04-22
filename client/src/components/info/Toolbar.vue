<template>
    <div class="toolbar">
        <Edit class="edit"
            :bullet="bullet"
            :formType="bullet._type"
            :placement="placement"/>
        <Delete class="delete"
                :id="bullet._id"
                :title="bullet.title"
                :placement="placement"/>
    </div>
</template>

<script>
import Edit from "../popovers/Edit";
import Delete from "../popovers/Delete";
export default {
    props: {
        bullet: Object,
        placement: {
            default: "bottom"
        }
    },
    components: {
        Edit,
        Delete
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/main.scss";

.toolbar {
    display: flex;
    justify-content: center;
}
</style>