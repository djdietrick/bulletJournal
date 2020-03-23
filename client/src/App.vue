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
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

body {
  padding: 0;
  background-color: $color-grey-dark-3;
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
  padding-top: 1rem;
  text-align: center;
  opacity: 0.8;
  transition: 0.1s ease-in-out;

  &:hover {
    opacity: 1;
  }

  a {
    //font-weight: bold;
    color: $color-grey-dark-3;
    padding: 0.5rem 5rem;
    background-color: $color-primary-light;
    font-size: 1.7rem;
    text-decoration: none;
    border: 1.5px solid $color-grey-light-2;
    box-shadow: 0 0.5rem 1rem rgba($color-black, .2);

    &:first-child {
      border-top-left-radius: 7px;
      border-bottom-left-radius: 7px;
    }

    &:last-child {
      border-top-right-radius: 7px;
      border-bottom-right-radius: 7px;
    }

    &.router-link-exact-active {
      background-color: $color-primary;
      color: $color-grey-light-1;
    }
  }

  grid-row: 1 / 2;
  grid-column: 2 / 3;

}

.grid-container {
  grid-row: 2 / 3;
  grid-column: 2 / 3;
}

</style>
