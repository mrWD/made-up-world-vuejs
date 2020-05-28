<template lang="pug">
  .list(:class="{ 'list_wide': isWide }")
    h2.list__title {{ title }} ({{ list.length }})

    ul.list__content(v-if="list && list[0]")
      li.list__item(v-for="(item, i) in list.slice(0, maxLength)" :key="i")
        router-link.list__link(
          :to="{ name: routeName, params: { id: item[routeProp] } }"
        )
          | {{ item[propName] }}

        slot(:slotData="item")

    Btn(v-if="list && list.length > LENGTH_LIMIT" @click="toggleLimit") Show All

</template>

<script lang="ts">
import Vue from 'vue';

import Btn from '@/components/btn/index.vue';

const LENGTH_LIMIT: 5 = 5;

export default Vue.extend({
  name: 'List',

  props: {
    isWide: {
      type: Boolean,
    },
    isBtn: {
      type: Boolean,
    },
    title: {
      type: String,
    },
    routeName: {
      type: String,
    },
    routeProp: {
      type: String,
    },
    propName: {
      type: String,
    },
    list: {
      type: Array,
    },
  },

  data() {
    return {
      LENGTH_LIMIT,
      maxLength: LENGTH_LIMIT as number,
    };
  },

  methods: {
    toggleLimit() {
      this.maxLength = this.maxLength > LENGTH_LIMIT ? LENGTH_LIMIT : this.list.length;
    },
  },

  components: {
    Btn,
  },
});

</script>

<style lang="sass">
.list
  width: 50%

  &_wide
    width: 100%

  &__content
    flex-basis: 100%

  &__title
    flex-basis: 100%
    padding-top: 30px

  &__item
    display: block

    &:not(:last-child)
      margin-bottom: 15px

  &__link
    font-size: $font-size + 6
    text-decoration: none
    color: $black

    &:not(:last-child)
      margin-right: 10px

</style>
