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
