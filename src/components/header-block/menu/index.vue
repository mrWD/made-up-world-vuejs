<template lang="pug">
  .menu
    template(v-if="authInfo")
      Btn.menu__tablet-btn(isText @click="isMenuVisible = !isMenuVisible")
        | {{ authInfo.login }}

      AuthMenu(v-if="isMenuVisible" :login="authInfo.login" @signOut="signOut")

    template(v-else)
      Btn.menu__btn(isText @click="showAuth('signin')") Sign In

      Btn.menu__btn(isText @click="showAuth('signup')") Sign Up

      SignUp.menu__sign-up(
        v-show="formType"
        :formType="formType"
        :user="authInfo"
        @close="showAuth(formType)"
      )

</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

import AuthMenu from './AuthMenu.vue';
import SignUp from './SignUp.vue';

export default Vue.extend({
  name: 'Menu',

  data() {
    return {
      isMenuVisible: false,
      formType: '',
    };
  },

  computed: mapGetters('auth', ['authInfo']),

  methods: {
    ...mapActions('auth', ['getAuthInfo', 'signOut']),

    showAuth(formType: 'signin' | 'signup'): void {
      this.formType = this.formType !== formType ? formType : '';
    },
  },

  created() {
    this.getAuthInfo();
  },

  components: {
    AuthMenu,
    SignUp,
  },
});

</script>

<style lang="sass">
.menu
  &__tablet-btn
    display: none

    +for-tablet-up
      display: block

  &__btn
    &:not(:last-of-type)
      margin-bottom: 15px

      +for-tablet-up
        margin-bottom: 0

</style>
