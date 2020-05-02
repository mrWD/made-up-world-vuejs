<template lang="pug">
  textarea.field(
    v-if="type === 'textarea'"
    :value="value"
    :row="row"
    :placeholder="placeholder"
    @input="$emit('input', $event.target.value)"
  )

  input.field.field_date(
    :class="{ 'field_empty': !value }"
    v-else-if="type === 'date'"
    :value="value"
    type="date"
    :data-value="value | dateReplacer(placeholder)"
    @input="$emit('input', $event.target.value)"
  )

  input.field(
    v-else
    :value="value"
    :type="type"
    :placeholder="placeholder"
    @input="$emit('input', $event.target.value)"
  )

</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';

export default Vue.extend({
  name: 'Field',

  model: {
    prop: 'value',
    event: 'input',
  },

  props: {
    value: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    type: {
      type: String as () => 'text' | 'textarea',
    },
    row: {
      type: [String, Number],
    },
  },

  filters: {
    dateReplacer(value: string, defaultText = ''): string {
      return value ? moment(value).format('DD.MM.YYYY') : defaultText;
    },
  },
});

</script>

<style lang="sass">
%text
  font-family: $main-font-stack
  font-size: $font-size + 6
  line-height: 1.2
  font-weight: 600
  color: $black

.field
  @extend %text

  position: relative
  max-width: 100%
  padding: 5px 10px
  border: 2px solid $main-color-darkest
  border-radius: 4px
  box-shadow: inset 0 0 20px $main-color-darkest
  background-color: $main-color-light

  &__textarea
    resize: vertical

  &:after
    position: absolute
    top: 5px
    left: 16px
    right: 50px
    display: inline-block
    content: attr(data-value)
    pointer-events: none

    @extend %text

  &::-webkit-datetime-edit,
  &::-webkit-inner-spin-button,
  &::-webkit-clear-button
    opacity: 0

  &_date
    height: 38px

  &_empty
    &:after
      color: #757575

</style>
