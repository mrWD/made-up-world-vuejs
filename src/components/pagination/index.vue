<template lang="pug" functional>
  ul.pagination
    template(v-if="props.pageNumber > 4")
      li.pagination__item
        Btn(isSmall @click="data.on.click(1)")
          svgicon(icon="chevronDouble")

      li.pagination__item
        Btn(isSmall @click="data.on.click(props.pageNumber - 1)")
          svgicon(icon="chevron")

    li.pagination__item(v-for="page in props.pageCount < 4 ? props.pageCount : 4")
      Btn(
        :disabled="(Math.ceil(props.pageNumber / 4) - 1) * 4 + page === props.pageNumber"
        isSmall
        @click="data.on.click((Math.ceil(props.pageNumber / 4) - 1) * 4 + page)"
      )
        | {{ (Math.ceil(props.pageNumber / 4) - 1) * 4 + page }}

    template(v-if="props.pageNumber <= props.pageCount - 4")
      li.pagination__item
        Btn(isSmall @click="data.on.click(props.pageNumber + 1)")
          svgicon.pagination__last-icon(icon="chevron")

      li.pagination__item
        Btn(isSmall @click="data.on.click(props.pageCount)")
          svgicon.pagination__last-icon(icon="chevronDouble")

</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Pagination',

  props: {
    pageCount: {
      type: Number,
    },
    pageNumber: {
      type: Number,
    },
  },
});

</script>

<style lang="sass">
.pagination
  display: flex
  justify-content: center
  padding-top: 15px

  &__item
    display: block
    padding-left: 5px
    padding-right: 5px

  &__last-icon
    transform: rotate(180deg)

</style>
