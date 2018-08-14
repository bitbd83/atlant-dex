// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang='pug'>
label.checkbox
  input.checkbox__input(type="checkbox", @change="change", :checked="value")
  .checkbox__icon(:class="'checkbox__icon--' + ((color === 'blue') ? 'blue' : 'white')")
  .checkbox__text(v-if="label") {{label}}
  slot
</template>

<script>

export default {
  model: {
    event: 'change',
  },
  methods: {
    change(e) {
      this.$emit('change', e.target.checked);
    },
  },
  props: {
    value: {
      type: [String, Number, Boolean],
      default: '',
      required: false,
    },
    label: {
      type: [String, Number],
      default: '',
      required: false,
    },
    color: {
      type: [String],
      default: 'blue',
    },
  },
};

</script>

<style lang='scss' scoped>
@import 'variables';
$ROOT: "checkbox";
.#{$ROOT} {
  display: flex;
  align-items: center;
  cursor: pointer;
  &__input {
    position: absolute;
    clip: rect(0 0 0 0);
    width: 1px;
    height: 1px;
    margin: -1px;
    &:checked {
      & + .#{$ROOT}__icon {
        &--blue {
          border-color: $background__blue;
          background-color: $background__blue;
        }
        &--white {
          border-color: $background__white;
          background-color: $background__white;
        }
      }
    }
  }
  &__icon {
    $size: 12px;
    width: $size;
    height: $size;
    border-radius: 50%;
    border-style: solid;
    border-width: 1px;
    flex-shrink: 0;
    transition: border-color .2s;
    transition: background-color .2s;
    &--blue {
      border-color: $background__blue;
    }
    &--white {
      border-color: $background__white;
    }
  }
  &__text {
    font-size: 12px;
    font-weight: bold;
    margin-left: 10px;
    color: inherit;
    text-transform: uppercase;
  }
}
</style>
