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
                <date-picker v-model="event.anchorDate"/>
            </div>
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
                    allDay: false,
                    location: '',
                    endDate: null,
                    importance: "Medium"
                }
            }
        },
        submitFunction: Function
    },
    data() {
        return {
            importances: ['High', 'Medium', 'Low']
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../styles/main.scss';

</style>