<template>
  <div id="app">
    <div id="nav">
      <router-link to="/year">Year</router-link>
      <router-link to="/month">Month</router-link>
      <router-link to="/day">Day</router-link>
      <router-link to="/create">Create</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "./styles/main.scss";

body {
  padding: 0;
}

#app {
  //font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;

  display: grid;
  grid-template-columns: minmax(0, 1fr) 95vw minmax(0, 1fr);
  grid-template-rows: 1fr 90vh;

}

#nav {
  padding: 2rem;
  text-align: center;

  a {
    //font-weight: bold;
    color: $color-grey-dark-3;
    padding: 1.5rem 5rem;
    background-color: $color-tertiary;
    margin: 1rem;
    border-radius: 7px;
    font-size: 1.7rem;
    text-decoration: none;
    border: 1.5px solid $color-secondary-dark;
    box-shadow: 0 0.5rem 1rem rgba($color-black, .2);

    &.router-link-exact-active {
      background-color: $color-tertiary-dark;
      color: $color-grey-light-1;
    }
  }

  grid-row: 1 / 2;
  grid-column: 2 / 3;

}

.container {
  grid-row: 2 / 3;
  grid-column: 2 / 3;
}

</style>
