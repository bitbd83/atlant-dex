// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
button.button(
  v-bind="$attrs" v-on="$listeners",
  :class="[`button--${color}`, {'button--full': full}, {'button--outline': outline}, {'button--rounded': rounded}, {'button--caps': caps}]",
  :disabled="isLoading"
)
  .button__shadow
  span.button__content
    slot
</template>

<script>

export default {
  props: {
    color: {
      type: String,
      required: false,
      default: 'blue',
    },
    rounded: {
      type: Boolean,
      required: false,
      default: false,
    },
    outline: {
      type: Boolean,
      required: false,
      default: false,
    },
    full: {
      type: Boolean,
      required: false,
      default: false,
    },
    caps: {
      type: Boolean,
      required: false,
      default: false,
    },
    loader: {
      type: String,
      required: false,
      default: '',
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style lang='scss'>
@import 'variables';
$ROOT: "button";
.#{$ROOT} {
  position: relative;
  min-height: 28px;
  min-width: 184px;
  font-size: 16px;
  white-space: nowrap;
  padding: 8px 20px;
  border-radius: 3px;
  // color: $color_daintree;
  transform: scale(1);
  transition: transform .3s;

  &:hover {
    transform: scale(1.02);
    transition: transform .3s;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: inherit;
    font-weight: 700;
    color: inherit;
  }

  &--blue {
    color: $color__white;
    background: $background__blue;
  }

  &--white {
    color: $color__blue;
    background: $background__white;
  }

  &--green {
    color: $color__white;
    background-color: $background__green;
  }

  &--red {
    color: $color__white;
    background-color: $background__red;
  }

  &--full {
    width: 100%;
  }

  &--caps {
    text-transform: uppercase;
  }

  &--outline {
    background-image: none;
    background-color: transparent;
    border-style: solid;
    border-width: 1px;
  }

  &__shadow {
    background: #000;
    position: absolute;
    opacity: .15;
    border-radius: 0px 0px 3px 3px;
    top: 100%;
    right: 5px;
    left: 5px;
    bottom: -6px;
    filter: blur(2px);
  }
}
</style>
