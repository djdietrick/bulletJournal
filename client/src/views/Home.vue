<template>
    <div class="home">
        <h1 class="heading-primary">Bullet Journal</h1>
        <h3 class="heading-tertiary">Manage your tasks and events differently.</h3>
        <p class="paragraph">Task tracker and calendar system based on the pen and paper method.</p>
        <p class="paragraph">Rapidly log tasks, events, and notes as they happen and track them at daily, monthly, 
            and yearly levels.</p>
        <p class="paragraph">Learn more about the method <a href="https://bulletjournal.com/pages/learn">here</a>.</p>
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
    justify-items: center;

    h3 {
        margin-bottom: 3rem;
    }
    
    a {
        color: $color-tertiary-dark;
    }
}

</style>