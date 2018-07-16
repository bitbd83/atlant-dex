// Copyright 2017, 2018 Tensigma Ltd.

// Licensed under the Microsoft Reference Source License (MS-RSL)

// This license governs use of the accompanying software. If you use the software, you accept this license.
// If you do not accept the license, do not use the software.

// 1. Definitions
// The terms "reproduce," "reproduction," and "distribution" have the same meaning here as under U.S. copyright law.
// "You" means the licensee of the software.
// "Your company" means the company you worked for when you downloaded the software.
// "Reference use" means use of the software within your company as a reference, in read only form, for the sole purposes
// of debugging your products, maintaining your products, or enhancing the interoperability of your products with the
// software, and specifically excludes the right to distribute the software outside of your company.
// "Licensed patents" means any Licensor patent claims which read directly on the software as distributed by the Licensor
// under this license.

// 2. Grant of Rights
// (A) Copyright Grant- Subject to the terms of this license, the Licensor grants you a non-transferable, non-exclusive,
// worldwide, royalty-free copyright license to reproduce the software for reference use.
// (B) Patent Grant- Subject to the terms of this license, the Licensor grants you a non-transferable, non-exclusive,
// worldwide, royalty-free patent license under licensed patents for reference use.

// 3. Limitations
// (A) No Trademark License- This license does not grant you any rights to use the Licensor’s name, logo, or trademarks.
// (B) If you begin patent litigation against the Licensor over patents that you think may apply to the software
// (including a cross-claim or counterclaim in a lawsuit), your license to the software ends automatically.
// (C) The software is licensed "as-is." You bear the risk of using it. The Licensor gives no express warranties,
// guarantees or conditions. You may have additional consumer rights under your local laws which this license cannot
// change. To the extent permitted under your local laws, the Licensor excludes the implied warranties of merchantability,
// fitness for a particular purpose and non-infringement.

<template lang='pug'>
.chartHeader
  .chartHeader__buttons
    .chartHeader__buttonTxt.chartHeader__buttonTxt--period(v-for="period in periods", :class="{'chartHeader__buttonTxt--active' : isCurrentPeriod(period)}", @click="setChartPeriod(period)") {{period}}
  .chartHeader__technical
    .chartHeader__buttonTxt.chartHeader__buttonTxt--indicator(v-for="tech in technicalIndicators", :class="[techClass(tech.name), colorClass(tech.name)]", @click="toggleIndicator(tech.name)") {{tech.name}}
  .chartHeader__buttons
    Icon.chartHeader__buttonIcon(:id="type + 'Chart'" v-for="type in chartTypes", :key="type", :class="{'chartHeader__buttonIcon--active' : isCurrentChart(type)}", @click="setChartType(type)")
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import {periods} from '@/config';

export default {
  data() {
    return {
      periods: Object.keys(periods),
    };
  },
  computed: {
    ...mapState('chart', [
      'technicalIndicators',
      'chartTypes',
      'currentChart',
    ]),
    ...mapGetters('chart', [
      'isCurrentPeriod',
    ]),
  },
  methods: {
    ...mapMutations('chart', [
      'setChartType',
      'toggleIndicator',
    ]),
    ...mapActions('chart', {
      setChartPeriod: 'changeChartPeriod',
    }),
    isCurrentChart(chart) {
      return this.currentChart === chart;
    },
    techClass(indicator) {
      return (this.technicalIndicators[indicator].enabled) ? 'chartHeader__buttonTxt--activeBox' : '';
    },
    colorClass(indicator) {
      return (this.technicalIndicators[indicator].enabled) ? ('chartHeader__buttonTxt--' + indicator) : '';
    },
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
