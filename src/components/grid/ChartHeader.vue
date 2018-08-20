// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang='pug'>
.chartHeader
  .chartHeader__buttons
    .chartHeader__buttonTxt.chartHeader__buttonTxt--period(v-for="period in periods", :class="{'chartHeader__buttonTxt--active' : isCurrentPeriod(period)}", @click="setChartPeriod(period)") {{period}}
  .chartHeader__buttons
    Icon.chartHeader__buttonIcon(:id="type + 'Chart'" v-for="type in chartTypes", :key="type", :class="{'chartHeader__buttonIcon--active' : isCurrentChart(type)}", @click="changeChartType(type)")
  .chartHeader__rightButtons
    .chartHeader__button.chartHeader__buttonFull(@click="fullscreen()")
</template>

<script>
import {mapGetters, mapState, mapMutations, mapActions} from 'vuex';
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
    ...mapState('chart', [
      'chartTypes',
      'currentChart',
    ]),
    ...mapGetters('chart', [
      'isCurrentPeriod',
    ]),
  },
  methods: {
    ...mapActions('chart', {
      setChartPeriod: 'changeChartPeriod',
    }),
    ...mapMutations('chart', [
      'setChartType',
    ]),
    ...mapActions('chart', {
      setChartPeriod: 'changeChartPeriod',
    }),
    changeChartType(type) {
      const types = new Map([
        ['candlestick', 1],
        ['line', 2],
      ]);
      window.tvWidget.chart().setChartType(types.get(type));
      this.setChartType(type);
    },
    isCurrentChart(chart) {
      return this.currentChart === chart;
    },
    fullscreen() {
      const elem = document.getElementById('vue-charting-library');
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
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

  &__button{
    display: block;
    border: 1px solid $color__grey_border;
    padding: 5px 0;
    height: 28px;
    border-radius: 2px;
    cursor: pointer;
  }

  &__buttonFull{
    width: 28px;
    background-position: 4px;
    background-repeat: no-repeat;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5Hcm91cCAyPC90aXRsZT4gICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+ICAgIDxkZWZzPjwvZGVmcz4gICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+ICAgICAgICA8ZyBpZD0iTWFpbl9jaGFydF93aWRnZXQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03NTUuMDAwMDAwLCAtOTAuMDAwMDAwKSI+ICAgICAgICAgICAgPHJlY3QgZmlsbD0ibm9uZSIgeD0iMCIgeT0iMCIgd2lkdGg9Ijk4OSIgaGVpZ2h0PSIxNDc3Ij48L3JlY3Q+ICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDc1NS4wMDAwMDAsIDkwLjAwMDAwMCkiIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyI+ICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNi41MDMsMTggTDEuNDk3NzUsMTggQzAuNjcyLDE4IDAsMTcuMzI4IDAsMTYuNTAzIEwwLDEuNDk3NzUgQzAsMC42NzIgMC42NzIsMCAxLjQ5Nzc1LDAgTDE2LjUwMywwIEMxNy4zMjgsMCAxOCwwLjY3MiAxOCwxLjQ5Nzc1IEwxOCwxNi41MDMgQzE4LDE3LjMyOCAxNy4zMjgsMTggMTYuNTAzLDE4IFogTTE2LjUwMywxNi41IEwxNi41MDMsMTcuMjUgTDE2LjUwMywxNi41IFogTTE2LjUsMS40OTc3NSBMMS40OTc3NSwxLjUgTDEuNSwxNi41MDMgTDE2LjUwMDc1LDE2LjUgTDE2LjUsMS40OTc3NSBaIE04LjI1LDE4IEM3LjgzNiwxOCA3LjUsMTcuNjY0NzUgNy41LDE3LjI1IEw3LjUsMTAuNSBMMC43NSwxMC41IEMwLjMzNiwxMC41IDAsMTAuMTY0NzUgMCw5Ljc1IEMwLDkuMzM2IDAuMzM2LDkgMC43NSw5IEw4LjI1LDkgQzguNjY0LDkgOSw5LjMzNiA5LDkuNzUgTDksMTcuMjUgQzksMTcuNjY0NzUgOC42NjQsMTggOC4yNSwxOCBaIE04LjI1LDEwLjUgQzguMDU4LDEwLjUgNy44NjYsMTAuNDI2NSA3LjcxOTc1LDEwLjI4MDI1IEM3LjQyNjUsOS45ODcgNy40MjY1LDkuNTEzIDcuNzE5NzUsOS4yMTk3NSBMMTIuMjE5NzUsNC43MTk3NSBDMTIuNDM0MjUsNC41MDQ1IDEyLjc1Njc1LDQuNDQwNzUgMTMuMDM3MjUsNC41NTcgQzEzLjMxNzc1LDQuNjczMjUgMTMuNSw0Ljk0NyAxMy41LDUuMjUgTDEzLjUsOSBDMTMuNSw5LjQxNCAxMy4xNjQ3NSw5Ljc1IDEyLjc1LDkuNzUgQzEyLjMzNTI1LDkuNzUgMTIsOS40MTQgMTIsOSBMMTIsNy4wNjA1IEw4Ljc4MDI1LDEwLjI4MDI1IEM4LjYzNCwxMC40MjY1IDguNDQyLDEwLjUgOC4yNSwxMC41IFogTTEyLjc1LDYgTDksNiBDOC41ODYsNiA4LjI1LDUuNjY0IDguMjUsNS4yNSBDOC4yNSw0LjgzNiA4LjU4Niw0LjUgOSw0LjUgTDEyLjc1LDQuNSBDMTMuMTY0NzUsNC41IDEzLjUsNC44MzYgMTMuNSw1LjI1IEMxMy41LDUuNjY0IDEzLjE2NDc1LDYgMTIuNzUsNiBaIiBpZD0iU2hhcGUiPjwvcGF0aD4gICAgICAgICAgICA8L2c+ICAgICAgICA8L2c+ICAgIDwvZz48L3N2Zz4=);
  }
}
</style>
