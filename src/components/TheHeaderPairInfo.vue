<template lang="pug">
.pairInfo
  // .pairInfo__content(:class="(this.visible) ? 'pairInfo__content--visible' : ''", @click="visible = (visible ? false : true)")
  .pairInfo__container
    .pairInfo__label Last:
    .pairInfo__block
      .pairInfo__value.pairInfo__value--last {{numbersFormat(last)}}
      Icon.pairInfo__triangle(id="triangle", :class="(change  < 0) ? 'pairInfo__triangle--negative' : ''")
      .pairInfo__percent(:class="(change < 0) ? 'pairInfo__percent--negative' : ''") {{numbersFormat(((change < 0) ? -change : change), 2)}}%
  .pairInfo__container
    .pairInfo__label High:
    .pairInfo__block
      .pairInfo__value {{numbersFormat(high)}}
      Icon.pairInfo__triangle(id="triangle", :class="(highChange  < 0) ? 'pairInfo__triangle--negative' : ''")
      .pairInfo__percent(:class="(highChange < 0) ? 'pairInfo__percent--negative' : ''") {{numbersFormat(((highChange < 0) ? -highChange : highChange), 2)}}%
  .pairInfo__container
    .pairInfo__label Low:
    .pairInfo__block
      .pairInfo__value {{numbersFormat(low)}}
      Icon.pairInfo__triangle(id="triangle", :class="(lowChange  < 0) ? 'pairInfo__triangle--negative' : ''")
      .pairInfo__percent(:class="(lowChange < 0) ? 'pairInfo__percent--negative' : ''") {{numbersFormat(((lowChange < 0) ? -lowChange : lowChange), 2)}}%
  .pairInfo__container
    .pairInfo__label Volume:
    .pairInfo__volume ${{numbersFormat(volume, 2)}}
</template>

<script>
import {mapState} from 'vuex';

export default {
  data() {
    return {
      visible: false,
    };
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
    // getFixed(number, fixTo = 4) {
    //   return number.toFixed(fixTo);
    // },
    addSpacesForNumbers(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'variables';
.pairInfo {
  position: absolute;
  top: 13px;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: -5px;
  white-space: nowrap;
  // width: 100%;
  // &__content {
  //   z-index: 2;
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-between;
  //   margin-top: -5px;
  //   white-space: nowrap;
  // }
  &__container {
    display: flex;
    // align-items: flex-end;
    // &:not(:last-child) {
    //   margin-right: 60px;
    // }
  }
  &__label {
    margin-right: 10px;
    font-weight: 700;
    text-transform: uppercase;
  }
  &__value {
    font-weight: 400;
    margin-right: 20px;
    // &--last {
    //   color: #31edd7;
    // }
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
    // color: #7ed321;
    // &--negative {
    //   color: #f33a3a;
    // }
  }
  &__block {
    display: flex;
    align-items: flex-end;
  }
}
</style>
