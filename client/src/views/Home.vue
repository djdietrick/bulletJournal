<template>
    <div class="home">
        <h1 class="heading-primary home__header">Bullet Journal</h1>
        <h3 class="heading-tertiary home__subheader">Manage your tasks and events differently.</h3>
        <div class="home__text">
            <p class="paragraph">Task tracker and calendar system based on the pen and paper method.</p>
            <p class="paragraph">Rapidly log tasks, events, and notes as they happen and track them at daily, monthly, 
                and yearly levels.</p>
            <p class="paragraph">Learn more about the method <a href="https://bulletjournal.com/pages/learn">here</a>.</p>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import "../styles/main.scss";

.home {
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid $color-primary;
    border-radius: 1rem;
    height: 70vh;
    margin: 2% 20rem;
    padding: 5rem;

    &__text {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h3 {
        margin-bottom: 3rem;
    }
    
    a {
        color: $color-tertiary-dark;
    }
}

</style>