<template>
    <BasePopover title="How To" class="howto" placement="right">
        <template v-slot:content>
            <div class="howto__content">
                <h2 class="heading-secondary howto__section">Bullet Types</h2>

                <h3 class="heading-tertiary">Events</h3>
                <p class="paragraph howto__text">Events have 3 different levels of importance:</p>
                <ul class="howto__list">
                    <li class="paragraph"><span class="highlight">High</span> - Major events such as vacations, weddings, anniversaries, etc.</li>
                    <li class="paragraph"><span class="highlight">Medium</span> - Moderate events such as appointments, birthdays, concerts, etc.</li>
                    <li class="paragraph"><span class="highlight">Low</span> - Mundane events such as haircuts, phone calls, etc.</li>
                </ul>
                <h3 class="heading-tertiary">Tasks</h3>
                <p class="paragraph howto__text">Tasks are just anything that needs to be completed.</p>
                <p class="paragraph howto__text">They can be created with or without a due date, and will persist across months in your agenda until completed.</p>
                
                <h3 class="heading-tertiary">Notes</h3>
                <p class="paragraph howto__text">Notes are meant for small thoughts that you want to keep track of or remember for later throughout the day.</p>


                <h2 class="heading-secondary howto__section">Views</h2>

                <h3 class="heading-tertiary">Yearly</h3>
                <p class="paragraph howto__text">This tab gives you a broad view of your year and all of the major events.</p>
                <p class="paragraph howto__text">Events with a <span class="highlight">High</span> importance will appear here.</p>

                <h3 class="heading-tertiary">Monthly</h3>
                <p class="paragraph howto__text">Here is a more classic agenda view, with a monthly event list on the left side and a monthly task list on the right.</p>
                <p class="paragraph howto__text">Tasks not completed from previous months will be carried over until they are completed or marked as not applicable.</p>
                <p class="paragraph howto__text">Events with a <span class="highlight">High and Medium</span> importances will appear here.</p>

                <h3 class="heading-tertiary">Weekly</h3>
                <p class="paragraph howto__text">The last view is meant for day-to-day logging of tasks and events as they happen, big or small.</p>
                <p class="paragraph howto__text">You can also add notes to days and view them here for small thoughts throughout the day.</p>
                <p class="paragraph howto__text"><span class="highlight">All</span> events, tasks, and notes will appear here.</p>
            </div>
        </template>
        <template v-slot:trigger class="howto__trigger">
            <div class="btn">How To</div>
        </template>
    </BasePopover>
</template>

<script>
import BasePopover from "./BasePopover";
export default {
    components: {
        BasePopover
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/main.scss";

.howto {
    &__content {
        max-width: 70rem;
        max-height: 60vh;
        overflow: auto;
    }
    &__text {
        margin-left: 2rem;
    }
    &__section {
        margin-bottom: 1rem;
        border-bottom: 1px solid $color-primary;
    }
    &__list {
        margin-left: 4rem;
    }
}

.highlight {
    color: $color-tertiary;
}
</style>