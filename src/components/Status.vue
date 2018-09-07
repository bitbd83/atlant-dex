// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.status
  icon.status__angle(id="angle-top-left")
  Icon.status__icon(:id="(isSuccess) ? 'statusSucceed' : 'statusFailed'")
  p.status__text(v-if="isSuccess") {{successText ? successText : "The operation was successfully done."}}
  p.status__text(v-else) {{failText ? failText : "Something went wrong. Please try again."}}
  icon.status__iconAction(v-if="isSuccess" id="arrow_short" @click="close")
  icon.status__iconAction.status__iconAction--back(v-else id="arrow_short"  v-on:click="$emit('getBack')")
</template>

<script>
import {mapMutations} from 'vuex';

export default {
  methods: {
    ...mapMutations('modal', ['close']),
  },
  props: {
    isSuccess: {
      type: [Boolean, String],
      default: true,
      required: false,
    },
    successText: String,
    failText: String,
  },
};
</script>

<style lang="scss">
@import 'variables';
.status {
  // position: relative;
  min-width: 400px;
  &__angle {
    position: absolute;
    top: 0;
    left: 0;
    width: 17px;
    height: 16.26px;
    fill: $fill__white;
  }
  &__icon {
    width: 126px;
    height: 116px;
    margin: 80px auto;
    fill: $fill__white;
  }

  &__text {
    max-width: 220px;
    font-weight: 700;
    font-size: 20px;
    color: $color__white;
    text-align: center;
    line-height: 39px;
    text-transform: uppercase;
    margin: auto;
    margin-bottom: 68px;
  }

  &__iconAction {
    width: 33px;
    height: 28px;
    fill: $fill__white;
    margin: auto;
    cursor: pointer;
    transition: transform 0.5s;

    &:hover {
      transition: transform 0.5s;
      transform: scale(1.1);
    }

    &--back {
      transform: rotate(180deg);

      &:hover {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
