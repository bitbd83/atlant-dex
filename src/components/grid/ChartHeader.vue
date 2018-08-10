// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang='pug'>
.chartHeader
  .chartHeader__buttons
    .chartHeader__buttonTxt.chartHeader__buttonTxt--period(v-for="period in periods", :class="{'chartHeader__buttonTxt--active' : isCurrentPeriod(period)}", @click="setChartPeriod(period)") {{period}}
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import {periods} from '@/config';

export default {
  data() {
    return {
      periods: Object.keys(periods),
    };
  },
  computed: {
    ...mapGetters('chart', [
      'isCurrentPeriod',
    ]),
  },
  methods: {
    ...mapActions('chart', {
      setChartPeriod: 'changeChartPeriod',
    }),
  },
};

</script>

<style lang='scss'>
@import 'variables';
.chartHeader {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 53px 0 87px;
  &__buttons {
    display: flex;
    align-items: center;
  }
  &__buttonTxt {
    cursor: pointer;
    font-size: 14px;
    text-transform: uppercase;
    padding: 3px 5px 0;
    border-bottom: 3px solid transparent;
    &--active {
      color: $color__blue;
      border-color: $color__blue;
    }
    &--activeBox {
      border-radius: 2px;
      color: $color__white;
    }
    &--MA10 {
      background-color: $color__blue;
    }
    &--EMA10 {
      background-color: orange;
    }
    &--MACD {
      background-color: pink;
    }
    &--period {
      &:not(:last-of-type) {
        margin-right: 5px;
      }
    }
    &--indicator {
      &:not(:last-of-type) {
        margin-right: 20px;
      }
    }
  }
  &__buttonIcon {
    $size: 20px;
    width: $size;
    height: $size;
    cursor: pointer;
    fill: $fill__black;
    &:not(:last-of-type) {
      margin-right: 33px;
    }
    &--active {
      fill: $fill__blue;
    }
  }
  &__technical{
    display: flex;
    align-items: center;
  }
}
</style>
