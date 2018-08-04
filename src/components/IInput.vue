// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang='pug'>
.inputField
  input.inputField__input(:value="value", :placeholder="placeholder", @input="change", :type="type" required, :class="{'inputField__input--center' : center, 'inputField__input--noUnderline' : noUnderline}")
  label.inputField__label(v-if="label") {{label}}
</template>

<script>
import {mapState, mapMutations} from 'vuex';

export default {
  model: {
    event: 'change',
  },
  computed: {
    ...mapState('misc', {
      textValues: (state) => state.values,
    }),
  },
  methods: {
    ...mapMutations('misc', {
      setInput: 'setInput',
    }),
    change(e) {
      this.$emit('change', e.target.value);
    },
  },
  props: {
    value: {
      type: [String, Number],
      default: '',
      required: false,
    },
    label: {
      type: [String, Number],
      default: '',
      required: false,
    },
    placeholder: {
      type: [String],
      default: '',
      required: false,
    },
    type: {
      type: String,
      default: 'text',
      required: false,
    },
    center: {
      type: Boolean,
      default: false,
      required: false,
    },
    noUnderline: Boolean,
  },
};
</script>

<style lang='scss' scoped>
@import 'variables';
.inputField {
  position: relative;
  font-size: 16px;
  font-weight: 400;

  &__label {
    color: $color_white;
    white-space: nowrap;
    font-size: inherit;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 0.2s ease all;
  }

  &__input {
    font-size: inherit;
    line-height: inherit;
    font-weight: inherit;
    padding: 0;
    display: block;
    width: 100%;
    border: none;
    border-radius: 0;
    background: none;
    padding-bottom: 11px;
    border-bottom: 3.5px solid $background__white;
    &--center {
      text-align: center;
    }
    &--noUnderline {
      border-bottom: none;
      padding-bottom: 0;
    }
    &::placeholder {
      font-family: CenturyGothic;
      font-size: 14px;
      letter-spacing: 0.5px;
      line-height: 26px;
      color: #6895FF;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}
</style>
