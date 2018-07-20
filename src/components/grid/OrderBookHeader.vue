// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang='pug'>
.bookHeader
    .bookHeader__title Last: #[Icon.bookHeader__icon(id="arrow", v-if='!ask', :class="{'bookHeader__icon--neg': change <= 0}")] #[.bookHeader__number {{last.toFixed(4)}}]
    .bookHeader__title #[.bookHeader__rangeSelector 12H Range] #[.bookHeader__number {{low.toFixed(4)}} - {{high.toFixed(4)}}]
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('tradeInfo', {
      last: (state) => state.pairInfo.last,
      high: (state) => state.pairInfo.high,
      low: (state) => state.pairInfo.low,
      change: (state) => state.pairInfo.change,
    }),
  },
  props: {
    ask: {
      type: Boolean,
      default: false,
      required: false,
    },
    price: {
      type: Number,
      default: 0,
      required: false,
    },
  },
};
</script>

<style lang="scss">
@import 'variables';
.bookHeader {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
  color: $color__black;
  &__title {
    display: flex;
    align-items: flex-end;
    font-size: 16px;
    font-weight: 500;
    white-space: nowrap;
    &:first-child {
      margin-right: 39px;
    }
  }
  &__number {
    font-size: 18px;
    font-weight: 400;
  }
  &__icon {
    width: 7px;
    height: 6px;
    margin: 0 9px 4px 12px;
    fill: $color_green;
    &--neg {
      fill: $color_red;
      transform: rotate(180deg);
    }
  }
  &__rangeSelector {
    margin-right: 24px;
  }
}
</style>
