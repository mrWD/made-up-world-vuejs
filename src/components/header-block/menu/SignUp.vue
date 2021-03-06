<template lang="pug">
  form.sign-up
    Btn.sign-up__close(isSmall @click="$emit('close')")
      svgicon(icon="cross")

    template(v-if="formType === 'signup'")
      label.sign-up__label(for="photo") Photo

      label.sign-up__photo.field(v-if="userImg" for="photo")
        img.sign-up__photo-img(:src="userImg" width="126")

      label.sign-up__field.field(v-else for="photo") Add your photo

      input#photo.sign-up__upload(
        name="photo"
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        @change="uploadFile"
      )

    label.sign-up__label(for="login") Login

    input#login.sign-up__field.field(
      v-model="form.login"
      name="login"
      type="text"
    )

    label.sign-up__label(for="password") Password

    input#password.sign-up__field.field(
      v-model="form.password"
      name="password"
      type="password"
    )

    label.sign-up__label(v-if="formType === 'signup'" for="passwordConfirm") Confirm Password

    input#passwordConfirm.sign-up__field.field(
      v-if="formType === 'signup'"
      v-model="form.passwordConfirm"
      name="passwordConfirm"
      type="password"
    )

    Btn.sign-up__btn( @click="formType === 'signup' ? signUp(form) : signIn(form)")
      | {{ formType === 'signup' ? 'Sign Up' : 'Sign In' }}

</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'SignUp',

  props: {
    formType: {
      type: String as () => 'signin' | 'signup',
      default: '',
    },
  },

  data() {
    return {
      userImg: null as ArrayBuffer | string | null,

      form: {
        file: null as File | null,
        login: null,
        password: null,
        passwordConfirm: null,
      },
    };
  },

  methods: {
    ...mapActions('auth', ['signIn', 'signUp']),

    setImage({ target }: ProgressEvent<FileReader>): void {
      this.userImg = target && target.result;
    },

    uploadFile({ target }: { target: HTMLInputElement }) {
      if (target.files && target.files[0]) {
        const reader = new FileReader();

        reader.onload = this.setImage;

        reader.readAsDataURL(target.files[0]);

        [this.form.file] = target.files;
      }
    },
  },
});

</script>

<style lang="sass">
.sign-up
  position: absolute
  top: calc(100% + 15px)
  right: -15px
  display: flex
  flex-direction: column
  width: 355px
  max-height: 100vh
  padding: 30px 25px
  background-image: url('../../../assets/images/inner-bg.png')
  background-size: 100% 100%

  +for-tablet-up
    right: 0
    width: 320px

  &:before,
  &:after
    position: absolute
    left: -8px
    right: -8px
    height: 40px
    background-position: center
    background-repeat: no-repeat
    background-size: 100% 100%
    content: ''

  &:before
    top: -15px
    background-image: url('../../../assets/images/inner-top-bg.png')

  &:after
    bottom: -15px
    background-image: url('../../../assets/images/inner-bottom-bg.png')

  &__close
    position: absolute
    top: -5px
    right: 35px

    +for-tablet-up
      right: 15px

  &__label
    align-self: flex-start
    margin-bottom: 8px

  &__photo
    max-width: 150px
    margin-bottom: 15px
    font-size: 0

    &:last-of-type
      margin-bottom: 20px

  &__photo-img
    max-width: 100%
    border-radius: 4px

  &__field
    margin-bottom: 15px

    &:last-of-type
      margin-bottom: 20px

  &__upload
    display: none

  &__btn
    padding-top: 8px
    padding-bottom: 8px

</style>
