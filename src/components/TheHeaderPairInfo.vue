// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.pairInfo
  // .pairInfo__content(:class="(this.visible) ? 'pairInfo__content--visible' : ''", @click="visible = (visible ? false : true)")
  .pairInfo__container(v-if="pairInfoItems > 0")
    .pairInfo__label Last:
    .pairInfo__block
      .pairInfo__value.pairInfo__value--last {{last | currency('', 2, { thousandsSeparator: ',', decimalSeparator: '.'}) }}
      Icon.pairInfo__triangle(id="triangle", :class="(change  < 0) ? 'pairInfo__triangle--negative' : ''")
      .pairInfo__percent(:class="(change < 0) ? 'pairInfo__percent--negative' : ''") {{(((change < 0) ? -change : change)) | currency('', 2, { thousandsSeparator: ',', decimalSeparator: '.'}) }}%
  .pairInfo__container(v-if="pairInfoItems > 1")
    .pairInfo__label High:
    .pairInfo__block
      .pairInfo__value {{high | currency('', 2, { thousandsSeparator: ',', decimalSeparator: '.'}) }}
      Icon.pairInfo__triangle(id="triangle", :class="(highChange  < 0) ? 'pairInfo__triangle--negative' : ''")
      .pairInfo__percent(:class="(highChange < 0) ? 'pairInfo__percent--negative' : ''") {{(((highChange < 0) ? -highChange : highChange)) | currency('', 2, { thousandsSeparator: ',', decimalSeparator: '.'}) }}%
  .pairInfo__container(v-if="pairInfoItems > 2")
    .pairInfo__label Low:
    .pairInfo__block
      .pairInfo__value {{low | currency('', 2, { thousandsSeparator: ',', decimalSeparator: '.'}) }}
      Icon.pairInfo__triangle(id="triangle", :class="(lowChange  < 0) ? 'pairInfo__triangle--negative' : ''")
      .pairInfo__percent(:class="(lowChange < 0) ? 'pairInfo__percent--negative' : ''") {{(((lowChange < 0) ? -lowChange : lowChange)) | currency('', 2, { thousandsSeparator: ',', decimalSeparator: '.'}) }}%
  .pairInfo__container(v-if="pairInfoItems === 4")
    .pairInfo__label Volume:
    .pairInfo__volume ${{volume | currency('', 2, { thousandsSeparator: ',', decimalSeparator: '.'}) }}
  .pairInfo__container(v-if="pairInfoItems < 4" @mouseover="hoverEnter()" @mouseout="hoverLeave()")
    .pairInfo__ellipsis
      Icon.pairInfo__ellipsisIcon(id="ellipsis")
    .pairInfo__dropdownList
      .pairInfo__dropdownItem(v-if="pairInfoItems < 1") #[.pairInfo__label--dropdown Last]
        .pairInfo__block.pairInfo__block--dropdown
          .pairInfo__value.pairInfo__value--dropdown {{last | currency('', 2, { thousandsSeparator: ',', decimalSeparator: '.'}) }}
          Icon.pairInfo__triangle(id="triangle", :class="(change  < 0) ? 'pairInfo__triangle--negative' : ''")
          .pairInfo__percent(:class="(change < 0) ? 'pairInfo__percent--negative' : ''") {{(((change < 0) ? -change : change)) | currency('', 2, { thousandsSeparator: ',', decimalSeparator: '.'}) }}%
      .pairInfo__dropdownItem(v-if="pairInfoItems < 3") #[.pairInfo__label--dropdown High]
        .pairInfo__block.pairInfo__block--dropdown
          .pairInfo__value.pairInfo__value--dropdown {{high | currency('', 2, { thousandsSeparator: ',', decimalSeparator: '.'}) }}
          Icon.pairInfo__triangle(id="triangle", :class="(highChange  < 0) ? 'pairInfo__triangle--negative' : ''")
          .pairInfo__percent(:class="(highChange < 0) ? 'pairInfo__percent--negative' : ''") {{(((highChange < 0) ? -highChange : highChange)) | currency('', 2, { thousandsSeparator: ',', decimalSeparator: '.'}) }}%
      .pairInfo__dropdownItem(v-if="pairInfoItems < 3") #[.pairInfo__label--dropdown Low]
        .pairInfo__block.pairInfo__block--dropdown
          .pairInfo__value.pairInfo__value--dropdown {{low | currency('', 2, { thousandsSeparator: ',', decimalSeparator: '.'}) }}
          Icon.pairInfo__triangle(id="triangle", :class="(lowChange  < 0) ? 'pairInfo__triangle--negative' : ''")
          .pairInfo__percent(:class="(lowChange < 0) ? 'pairInfo__percent--negative' : ''") {{(((lowChange < 0) ? -lowChange : lowChange)) | currency('', 2, { thousandsSeparator: ',', decimalSeparator: '.'}) }}%
      .pairInfo__dropdownItem #[.pairInfo__label--dropdown Volume]
        .pairInfo__volume ${{volume | currency('', 2, { thousandsSeparator: ',', decimalSeparator: '.'}) }}
</template>

<script>
import {mapState} from 'vuex';

export default {
  data() {
    return {
      visible: false,
    };
  },
  props: {
    pairInfoItems: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState('tradeInfo', {
      last: (state) => state.pairInfo.last,
      high: (state) => state.pairInfo.high,
      highChange: (state) => state.pairInfo.highChange,
      low: (state) => state.pairInfo.low,
      lowChange: (state) => state.pairInfo.lowChange,
      volume: (state) => state.pairInfo.volume,
      change: (state) => state.pairInfo.change,
      bid: (state) => state.pairInfo.ask,
      ask: (state) => state.pairInfo.bid,
    }),
  },
  methods: {
    addSpacesForNumbers(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    },
    hoverEnter() {
      let listHeight = 0;
      for (let item of document.querySelector('.pairInfo__dropdownList').children) {
        listHeight += item.offsetHeight + 7; // TODO: remove hardcode for margin height
      };
      document.querySelector('.pairInfo__dropdownList').style.height = `${listHeight}px`;
    },
    hoverLeave() {
      document.querySelector('.pairInfo__dropdownList').style.height = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'variables';
.pairInfo {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;
  align-items: center;
  margin-top: -5px;
  white-space: nowrap;
  &__container {
    position: relative;
    display: flex;
    height: 100%;
    &:not(:last-child) {
      margin-right: 60px;
    }
  }
  &__label {
    margin-right: 10px;
    font-weight: 500;
    text-transform: uppercase;
  }
  &__value {
    font-weight: 400;
    font-size: 12px;
    margin-right: 20px;
    &--dropdown {
      margin-right: 8px;
    }
  }
  &__triangle {
    fill: #7ed321;
    transform: rotate(180deg);
    width: 7px;
    height: 6px;
    margin-right: 5px;
    margin-bottom: 3px;
    &--negative {
      fill: #f33a3a;
      transform: rotate(0deg);
    }
  }
  &__percent {
    font-weight: 400;
    font-size: 12px;
  }
  &__block {
    display: flex;
    align-items: flex-end;
    &--dropdown {
      justify-content: center;
      align-items: baseline;
    }
  }
  &__ellipsis {
    height: 100%;
    min-width: 22px;
    cursor: pointer;
  }
  &__ellipsisIcon {
    height: 4px;
    width: 22px;
    margin-top: 7px;
    fill: $fill__blue;
  }
  &__dropdownList {
    position: absolute;
    overflow: hidden;
    height: 0;
    width: 150px;
    margin-top: 35px;
    background-color: $background__grey_white;
    top: 0;
    right: -64px;
    z-index: 1000000;
    transition: height 1s ease-out;
  }
  &__dropdownItem {
    width: 100%;
    cursor: pointer;
    margin-top: 7px;
    padding: 7px;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    color: $color__white;
    background-color: $background__blue;
    font-size: 12px;
    font-weight: 400;
    border-radius: 3px;
    text-transform: capitalize;
    line-height: 21px;
    &:hover {
      opacity: 0.6;
    }
  }
}
</style>
