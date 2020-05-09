<template lang="pug">
  header.header
    .header__inner
      router-link(:to="{ name: 'Home' }")
        svgicon.header__logo(name="logo")

      .header__mobile
        Btn(@click="isMobileMenuVisible = !isMobileMenuVisible")
          svgicon(:icon="isMobileMenuVisible ? 'cross' : 'burger'")

      .header__content
        Navigation.header__nav

        Menu.header__menu

</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

import pushNotification from '@/utils/pushNotifications';

import Menu from './menu/index.vue';
import Navigation from './Navigation.vue';

export default Vue.extend({
  name: 'HeaderBlock',

  data() {
    return {
      isMobileMenuVisible: false,
    };
  },

  computed: mapGetters('auth', ['token']),

  watch: {
    token: {
      immediate: true,
      handler(token) {
        if (token) {
          pushNotification(token);
        }
      },
    },
  },

  components: {
    Navigation,
    Menu,
  },
});

</script>

<style lang="sass">
.header
  position: fixed
  top: 0
  left: 0
  right: 0
  z-index: 100

  padding-top: 10px
  padding-bottom: 30px

  background-image: url('../../assets/images/header-bg.png')
  background-repeat: repeat-x
  background-position: top center
  background-size: auto 100%

  +for-tablet-up
    padding-bottom: 10px
    background-size: 100% 100%

  &__inner
    position: relative
    display: flex
    justify-content: space-between
    align-items: center
    max-width: 1170px
    margin-left: auto
    margin-right: auto
    padding-left: 15px
    padding-right: 15px

  &__logo
    width: 173px
    height: 56px
    color: $black

  &__mobile
    position: relative

    +for-tablet-up
      display: none

    .sign-up
      top: 0

  &__nav
    +for-tablet-up
      margin-left: auto
      margin-right: auto

  &__menu
    display: flex
    flex-direction: column

    +for-tablet-up
      position: relative
      flex-direction: row
      align-items: center

  &__content
    position: absolute
    top: 100%
    right: -15px
    width: 320px
    padding: 30px 15px
    background-image: url('../../assets/images/inner-bg.png')
    background-size: 100% 100%

    +for-tablet-up
      position: relative
      top: 0
      right: 0
      flex-grow: 1
      display: flex
      width: auto
      padding: 0
      background-image: none

</style>
