<template>
  <div id="app">
    <div id="nav">
      <router-link to="/year">Year</router-link>
      <router-link to="/month">Month</router-link>
      <router-link to="/day">Day</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import "./styles/main.scss";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;

  display: grid;
  grid-template-columns: minmax(0, 1fr) 95vw minmax(0, 1fr);
  grid-template-rows: 1fr 95vh minmax(0, 1fr);

}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
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
