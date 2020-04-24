<template>
  <div id="app">
    <router-view name="nav"></router-view>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="scss">
@import "./styles/main.scss";
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

body {
  padding: 0;
}

#app {
  //font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  //color: #2c3e50;

  // display: grid;
  // grid-template-columns: minmax(0, 1fr) 95vw minmax(0, 1fr);
  // grid-template-rows: 1fr 90vh;

}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
