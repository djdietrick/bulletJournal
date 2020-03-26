<template>
    <div class="toolbar">
        <Edit class="edit"
            :bullet="bullet"
            :formType="bullet._type"/>
        <Delete class="delete"
                :id="bullet._id"
                :title="bullet.title"/>
    </div>
</template>

<script>
import Edit from "../Edit";
import Delete from "../Delete";
export default {
    props: {
        bullet: Object
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