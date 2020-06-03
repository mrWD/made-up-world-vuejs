<template lang="pug">
  #app
    HeaderBlock

    Errors

    .inner
      .inner__content
        router-view

      Loader(v-if="isLoading")

    Chat(v-if="authInfo" :authInfo="authInfo" :token="token")

</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

import HeaderBlock from '@/components/header-block/index.vue';
import Loader from '@/components/loader/index.vue';
import Errors from '@/components/errors/index.vue';
import Chat from '@/components/chat/index.vue';

export default Vue.extend({
  name: 'App',

  computed: mapGetters({
    token: 'auth/token',
    authInfo: 'auth/authInfo',
    isLoading: 'isLoading',
  }),

  methods: mapActions('auth', ['getAuthInfo']),

  created() {
    this.getAuthInfo();
  },

  components: {
    HeaderBlock,
    Loader,
    Errors,
    Chat,
  },
});

</script>

<style lang="sass">
html,
body
  box-sizing: border-box

*,
*:before,
*:after
  box-sizing: inherit

body
  min-height: 100vh
  margin: 0
  background-color: #36291e
  background-image: url('./assets/images/bg.jpg')
  background-attachment: fixed
  background-repeat: no-repeat
  background-size: cover
  font-family: $main-font-stack

#app
  padding-top: 100px
  padding-bottom: 100px
  font-family: $main-font-stack
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: $black

hr
  flex-basis: 100%
  margin-top: 0
  margin-bottom: 0
  border-color: $main-color-darkest
  box-shadow: 0 0 20px $main-color-darkest

h1,
h2,
p
  margin-top: 0

p,
span
  color: $black

ul
  margin-top: 0
  margin-bottom: 0
  padding-left: 0

.inner
  position: relative
  display: flex
  max-width: 790px
  margin-left: auto
  margin-right: auto
  padding: 50px 15px

  &:before,
  &:after
    position: absolute
    left: 0
    right: 0
    width: 100%
    height: 90px
    background-position: center
    background-repeat: no-repeat
    background-size: 100% 100%
    content: ''

  &:before
    top: 0
    background-image: url('./assets/images/inner-top-bg.png')

  &:after
    bottom: 0
    background-image: url('./assets/images/inner-bottom-bg.png')

  &__content
    flex-grow: 1
    padding-top: 60px
    padding-bottom: 80px
    padding-left: 50px
    padding-right: 50px
    background-image: url('./assets/images/inner-bg.png')
    background-position: top center
    background-repeat: repeat-y
    background-size: 100% auto

</style>
