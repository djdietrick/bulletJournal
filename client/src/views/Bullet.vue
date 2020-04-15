<template>
    <div class="bullet">
        <Create/>
    </div>
</template>

<script>
import Create from "../components/popovers/Create";
export default {
    components: {
        Create
    },
  created() {
    this.$store.dispatch('fetchBullets');
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/main.scss";
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

body {
  padding: 0;
}

#nav {
  padding-top: 1rem;
  text-align: center;

  a {
    //font-weight: bold;
    color: $color-primary-light;
    padding: 0.5rem 5rem;
    background-color: $color-grey-dark-3;
    font-size: 1.7rem;
    text-decoration: none;
    border: 1.5px solid $color-grey-light-2;
    box-shadow: 0 0.5rem 1rem rgba($color-black, .2);
    transition: 0.2s ease-in-out;

    // &:first-child {
    //   border-top-left-radius: 7px;
    //   border-bottom-left-radius: 7px;
    // }

    // &:last-child {
    //   border-top-right-radius: 7px;
    //   border-bottom-right-radius: 7px;
    // }

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

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.create {
  position: fixed;
  top: 3rem;
  right: 7%;

  &--icon {
    color: $color-primary-light;
    transform: scale(4);
  }
}

</style>