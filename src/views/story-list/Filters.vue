<template lang="pug">
  form.filters
    .filters__item
      Field.filters__field(v-model="form.title" type="text" placeholder="Title")

    template(v-if="isVisible || windowWidth > 767")
      .filters__item
        Field.filters__field(v-model="form.from" type="date" placeholder="From date")

      .filters__item
        Field.filters__field(v-model="form.to" type="date" placeholder="To date")

      .filters__item(v-if="!isOwner")
        Field.filters__field(v-model="form.owner" type="text" placeholder="Author")

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

      Btn.filters__toggler(@click="isVisible = !isVisible")
        svgicon(:icon="isVisible ? 'cross' : 'filter'")

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
      isVisible: false,

      form: {
        title: null,
        from: null,
        to: null,
        owner: null,
        sortBy: 'createdAt',
      },

      sortList: [
        { label: 'Title', value: 'title' },
        { label: 'Title Reverse', value: '-title' },
        { label: 'Author', value: 'owner' },
        { label: 'Author Reverse', value: '-owner' },
        { label: 'Date', value: 'createdAt' },
        { label: 'Date Reverse', value: '-createdAt' },
      ],
    };
  },

  computed: {
    windowWidth(): number {
      return window.innerWidth;
    },
  },

  methods: {
    ...mapActions('stories', ['getStoryList']),

    handleSubmit() {
      this.$router.push({ query: this.form });

      this.getStoryList(this.form);
    },
  },
});

</script>

<style lang="sass">
.filters
  display: flex
  flex-wrap: wrap
  align-items: flex-start

  &__toggler
    margin-left: auto
    padding: 6px

    +for-tablet-up
      display: none

  &__item
    width: 100%
    display: flex
    margin-bottom: 15px
    padding-left: 6px
    padding-right: 6px

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
