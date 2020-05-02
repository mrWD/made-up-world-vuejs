<template lang="pug">
  #app
    HeaderBlock

    .inner(:class="{ 'inner_fluid': isFluid }")
      .inner__content
        router-view

    Chat(v-if="authInfo" :authInfo="authInfo" :token="token")

</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default Vue.extend({
  name: 'App',

  computed: {
    ...mapGetters({
      token: 'auth/token',
      authInfo: 'auth/authInfo',
    }),

    isFluid(): boolean {
      return this.$route.name === 'EditStory';
    },
  },

  methods: mapActions('auth', ['getAuthInfo']),

  created() {
    this.getAuthInfo();
  },

  components: {
    Chat: () => import('@/components/chat/index.vue'),
    HeaderBlock: () => import('@/components/header-block/index.vue'),
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
  background-image: url('./assets/images/bg.jpg')
  background-attachment: fixed
  background-repeat: no-repeat
  background-size: cover
  font-family: $main-font-stack

#app
  padding-top: 100px
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
  display: flex
  max-width: 790px
  height: calc(100vh - 100px)
  margin-left: auto
  margin-right: auto
  padding: calc(21vh - 100px) 5.7077626%
  background-image: url('./assets/images/inner-bg.png')
  background-position: center
  background-repeat: no-repeat
  background-size: 100% 100%

  &_fluid
    max-width: 95%

  &__content
    flex-grow: 1
    padding-left: 5.7971014%
    padding-right: 5.7971014%
    overflow-y: auto

.btn-text
  padding-left: 0
  padding-right: 0
  border: none
  background-color: transparent

  &__icon
    width: 24px
    height: 24px
    color: $black

</style>
