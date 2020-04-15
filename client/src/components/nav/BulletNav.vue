<template>
    <div class="bullet__nav">
        <div id="nav">
            <router-link to="/bullets/year" append active>Year</router-link>
            <router-link to="/bullets/month" append>Month</router-link>
            <router-link to="/bullets/day" append>Week</router-link>
        </div>
        <Create/>
        <Options/>
    </div>
</template>

<script>
import Create from '../popovers/Create.vue';
import Options from '../popovers/Options.vue';
export default {
  components: {
    Create,
    Options
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/main.scss";

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

</style>