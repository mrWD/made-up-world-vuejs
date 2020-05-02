<template lang="pug">
  form.filters
    .filters__item
      Field.filters__field(v-model="form.login" type="text" placeholder="Login")

    .filters__item
      select.filters__field.field(v-model="form.sortBy" placeholder="Sort By")
        option(
          v-for="item in sortList"
          :label="item.label"
          :value="item.value"
          :key="item.value"
        )

    .filters__item
      Btn.filters__btn(@click="handleSubmit") Find

    hr.filters__separator

</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'Filters',

  props: {
    isOwner: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      form: {
        login: null,
        sortBy: 'login',
      },

      sortList: [
        { label: 'Login', value: 'login' },
        { label: 'Login Reverse', value: '-login' },
      ],
    };
  },

  methods: {
    ...mapActions('users', ['getUserList']),

    handleSubmit() {
      this.$router.push({ query: this.form });

      this.getUserList(this.form);
    },
  },
});

</script>

<style lang="sass">
.filters
  display: flex
  flex-wrap: wrap

  &__item
    width: 100%
    padding-left: 6px
    padding-right: 6px
    margin-bottom: 15px

    +for-tablet-up
      width: 33.3333333%

  &__field
    width: 100%

  &__btn
    padding-top: 6px
    padding-bottom: 6px

  &__separator
    margin-bottom: 15px

</style>
