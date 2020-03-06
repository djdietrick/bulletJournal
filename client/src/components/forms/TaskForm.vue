<template>
    <div class="container">
        <form>
            <div class="form__group">
                <label for="title" class="form__label">Title</label>
                <input type="text" id='title' class='form__input'
                    v-model='event.title'>
            </div>
            <div class="form__group">
                <label for="description" class="form__label">Description</label>
                <input type="text" id='description' class='form__input'
                    v-model='event.description'>
            </div>
            <div class="form__group">
                <label for="anchorDate" class="form__label">Date</label>
                <v-calendar is-dark color="blue" :value="event.anchorDate" v-model="event.anchorDate"/>
                <!-- <date-picker v-model="event.anchorDate" class="form__input"/> -->
            </div>
            <div class="form__group">
                <label for="anchorDate" class="form__label">Due Date</label>
                <date-picker v-model="event.anchorDate" class="form__input"/>
            </div>
            <button
                    class="btn btn-primary"
                    @click.prevent="submitFunction">Submit!
            </button>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        event: {
            type: Object,
            default() {
                return {
                    title: '',
                    description: '',
                    anchorDate: Date.now,
                    dueDate: null
                }
            }
        },
        submitFunction: Function
    },
    computed: {
        canSubmit() {
            return !this.title.isEmpty();
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
