// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.pair
  .title.pair__title Current pair:
  .pair__currency.pair__currency--main(@click="dropOptions('base')")
    Icon(:id="getCurrencyIconId(baseCurrency)").pair__icon
    .pair__label {{baseCurrency}}
    .pair__currency.pair__currency--option.pair__currency--base(:class="'pair__currency--' + i" v-for="i in baseCurrencyOptions" @mouseover="currencyHover(i)" @mouseout="currencyUnhover(i)" @click="changeBaseCurrency(i)")
      Icon.pair__icon.pair__icon--option(:class="'pair__icon--' + i", :id="getCurrencyIconId(i)")
      .pair__label.pair__label--option(:class="'pair__label--' + i") {{i}}
  Icon.pair__exchange(id="exchange")
  .pair__currency.pair__currency--main(@click="dropOptions('quote')")
    Icon(:id="getCurrencyIconId(quoteCurrency)").pair__icon
    .pair__label {{quoteCurrency}}
    .pair__currency.pair__currency--option.pair__currency--quote(:class="'pair__currency--' + i" v-for="i in quoteCurrencyOptions" @mouseover="currencyHover(i)" @mouseout="currencyUnhover(i)" @click="changeQuoteCurrency(i)")
      Icon.pair__icon.pair__icon--option(:class="'pair__icon--' + i", :id="getCurrencyIconId(i)")
      .pair__label.pair__label--option(:class="'pair__label--' + i") {{i}}
</template>

<script>
import TweenLite from 'gsap/TweenLite';
import {mapState, mapGetters, mapActions} from 'vuex';
import Dropdown from './Dropdown';

export default {
  data() {
    return {
      showOptions: false,
      currentCurType: 'base',
    };
  },
  computed: {
    ...mapState('tradeInfo', [
      'pairs',
    ]),
    ...mapGetters('tradeInfo', [
      'baseCurrency',
      'quoteCurrency',
    ]),
    baseCurrencyOptions() {
      return Object.keys(this.pairs);
    },
    quoteCurrencyOptions() {
      return this.pairs[this.baseCurrency] ? this.pairs[this.baseCurrency] : [];
    },
  },
  methods: {
    ...mapActions('tradeInfo', [
      'changeQuoteCurrency',
      'changeBaseCurrency',
      'getPairs',
      'getPairInfo',
    ]),
    currencyHover(cur) {
      if (this.showOptions) {
        TweenLite.to('.pair__icon--' + cur, 0.1, {width: 35, height: 35, paddingLeft: 0, opacity: 1});
        TweenLite.to('.pair__label--' + cur, 0.1, {opacity: 1, fontSize: 14});
      }
    },
    currencyUnhover(cur) {
      TweenLite.to('.pair__icon--' + cur, 0.1, {width: 30, height: 25, paddingLeft: 5, opacity: 0.5});
      TweenLite.to('.pair__label--' + cur, 0.1, {opacity: 0.5, fontSize: 11});
    },
    dropOptions(curType) {
      let otherCurType = (curType === 'base') ? 'quote' : 'base';
      TweenLite.to('.pair__currency--' + otherCurType, 0.3, {transform: 'translateY(0)', opacity: 0, ease: Power0.easeNone});
      if (this.showOptions) {
        TweenLite.to('.pair__currency--' + curType, 0.3, {transform: 'translateY(0)', opacity: 0, ease: Power0.easeNone});
        TweenLite.to('.pair__label--option', 0, {opacity: 0, fontSize: 11});
        this.showOptions = false;
      } else {
        this.showOptions = true;
        for (let i in document.getElementsByClassName('pair__currency--' + curType)) {
         if (i < 5) {
           TweenLite.to(document.getElementsByClassName('pair__currency--' + curType)[i], 0.3, {transform: 'translateY(' + ((parseInt(i) + 1) * 40 + 10) + 'px)', opacity: 1, ease: Power0.easeNone});
           TweenLite.to(document.getElementsByClassName('pair__currency--' + curType)[i].querySelectorAll('.pair__icon--option')[0], 0, {width: 30, height: 25, paddingLeft: 5, opacity: 0.5});
           TweenLite.to(document.getElementsByClassName('pair__currency--' + curType)[i].querySelectorAll('.pair__label--option')[0], 0, {opacity: 0, fontSize: 11});
           TweenLite.to(document.getElementsByClassName('pair__currency--' + curType)[i].querySelectorAll('.pair__label--option')[0], 0.5, {opacity: 0.5, fontSize: 11, delay: ((parseInt(i) + 1) * 0.2)});
         }
        };
      }
    },
    getCurrencyIconId(currencyName) {
      return `cur_${currencyName}`.toLocaleLowerCase();
    },
  },
  watch: {
    baseCurrency(baseCurrency) {
      this.getPairInfo();
    },
    quoteCurrency() {
      this.getPairInfo();
    },
  },
  created() {
    this.getPairs();
    this.getPairInfo();
  },
  components: {
    Dropdown,
  },
};
</script>

<style lang="scss">
@import 'variables';
.pair {
  display: flex;
  align-items: center;
  background-color: $background__grey_white;
  z-index: 1000001;
  &__title {
    white-space: nowrap;
    margin-right: 30px;
  }
  &__icon {
    $size: 35px;
    fill: $color_white;
    background-color: $background__grey_white;
    height: $size;
    width: $size;
    z-index: 1000001;
    &--option {
      width: 30px;
      height: 25px;
      z-index: 999999;
      padding-left: 5px;
    }
  }
  &__currency {
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    height: 100%;
    color: $color__black;
    background-color: $background__grey_white;
    z-index: 1000001;
    &--main {
      &:after {
        content: "";
        border-style: solid;
        border-width: 9px 7px 0;
        border-color: $color__blue transparent transparent;
        margin-left: 15px;
      }
    }
    &--option {
      position: absolute;
      top: 0;
      left: 0;
      width: auto;
      z-index: 999999;
    }
  }
  &__label {
    position: relative;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: $color__black;
    background-color: $background__grey_white;
    z-index: 1000001;
    padding-left: 10px;
    &--option {
      position: absolute;
      top: 0;
      left: 40px;
      height: 100%;
      opacity: 0;
      padding-left: 0;
      z-index: 999999;
      font-size: 11px;
    }
  }
  &__container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &__option {
    align-items: center;
    display: flex;
    flex-direction: row;
    font-size: 16px;
    font-weight: bold;
  }
  &__exchange {
    $size: 16px;
    height: $size;
    width: $size;
    margin: 0 25px;
  }
}
</style>
