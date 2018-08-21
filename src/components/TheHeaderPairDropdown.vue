// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.pairDropdown(@click="dropOptions(baseQuote)")
  .pairDropdown__current
    Icon(:id="getCurrencyIconId(currentCurrency)").pairDropdown__icon
    .pairDropdown__label {{currentCurrency}}
  .pairDropdown__container(:class="['pairDropdown__container--' + baseQuote, {'pairDropdown__container--showBorder': showOptions}]")
    .pairDropdown__option(:class="['pairDropdown__option--' + baseQuote, 'pairDropdown__option--' + i]" v-for="i in currencyOptions" @mouseover="currencyHover(i)" @mouseout="currencyUnhover(i)"
    @click="changePairCurrrency(i)")
      Icon.pairDropdown__icon.pairDropdown__icon--option(:class="'pairDropdown__icon--' + i", :id="getCurrencyIconId(i)")
      .pairDropdown__label.pairDropdown__label--option(:class="'pairDropdown__label--' + i") {{i}}
</template>

<script>
import TweenLite from 'gsap/TweenLite';
import {mapState, mapGetters, mapActions} from 'vuex';

export default {
  data() {
    return {
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
    baseQuote() {
      return this.isBase ? 'base' : 'quote';
    },
    currentCurrency() {
      return this.isBase ? this.baseCurrency : this.quoteCurrency;
    },
    currencyOptions() {
      if (this.isBase) return Object.keys(this.pairs);
      else return this.pairs[this.baseCurrency] ? this.pairs[this.baseCurrency] : [];
    },
  },
  methods: {
    ...mapActions('tradeInfo', [
      'changeQuoteCurrency',
      'changeBaseCurrency',
      'getPairs',
      'getPairInfo',
    ]),
    changePairCurrrency(cur) {
      this.isBase ? this.changeBaseCurrency(cur) : this.changeQuoteCurrency(cur);
    },
    currencyHover(cur) {
      if (this.showOptions) {
        TweenLite.to('.pairDropdown__icon--' + cur, 0.1, {width: 35, height: 35, paddingLeft: 0, opacity: 1});
        TweenLite.to('.pairDropdown__label--' + cur, 0.1, {opacity: 1, fontSize: 14});
      }
    },
    currencyUnhover(cur) {
      TweenLite.to('.pairDropdown__icon--' + cur, 0.1, {width: 30, height: 25, paddingLeft: 5, opacity: 0.5});
      TweenLite.to('.pairDropdown__label--' + cur, 0.1, {opacity: 0.5, fontSize: 11});
    },
    dropOptions(curType) {
      let otherCurType = (curType === 'base') ? 'quote' : 'base';
      TweenLite.to('.pairDropdown__option--' + otherCurType, 0.3, {transform: 'translateY(0)', opacity: 0, ease: Power0.easeNone});
      TweenLite.to('.pairDropdown__container--' + otherCurType, 0.3, {height: '45px'});
      this.$emit('setShow', curType);
      if (this.showOptions) {
        TweenLite.to('.pairDropdown__option--' + curType, 0.3, {transform: 'translateY(0)', opacity: 0, ease: Power0.easeNone});
        TweenLite.to('.pairDropdown__container--' + curType, 0.3, {height: '45px'});
        TweenLite.to('.pairDropdown__label--option', 0, {opacity: 0, fontSize: 11});
        this.$emit('setShow', '');
      } else {
        let itemsCount = document.getElementsByClassName('pairDropdown__option--' + curType).length;
        TweenLite.to(document.getElementsByClassName('pairDropdown__container--' + curType)[0], 0, {height: (itemsCount + 1) * 40 + 15 + 'px'});
        for (let i in document.getElementsByClassName('pairDropdown__option--' + curType)) {
          if (i < 5) {
            TweenLite.to(document.getElementsByClassName('pairDropdown__option--' + curType)[i], 0.3, {transform: 'translateY(' + ((parseInt(i) + 1) * 40 + 5) + 'px)', opacity: 1, ease: Power0.easeNone});
            TweenLite.to(document.getElementsByClassName('pairDropdown__option--' + curType)[i].querySelectorAll('.pairDropdown__icon--option')[0], 0, {width: 30, height: 25, paddingLeft: 5, opacity: 0.5});
            TweenLite.to(document.getElementsByClassName('pairDropdown__option--' + curType)[i].querySelectorAll('.pairDropdown__label--option')[0], 0, {opacity: 0, fontSize: 11});
            TweenLite.to(document.getElementsByClassName('pairDropdown__option--' + curType)[i].querySelectorAll('.pairDropdown__label--option')[0], 0.5, {opacity: 0.5, fontSize: 11, delay: ((parseInt(i) + 1) * 0.2)});
          }
        };
        this.$emit('setShow', curType);
      }
    },
    setQuoteAfterBaseChange(baseCurrency) {
      if (this.pairs[baseCurrency].includes(this.quoteCurrency)) return;
      this.changeQuoteCurrency(this.pairs[baseCurrency][0]);
    },
    getCurrencyIconId(currencyName) {
      return `cur_${currencyName}`.toLocaleLowerCase();
    },
  },
  props: {
    isBase: {
      type: Boolean,
      required: true,
    },
    showOptions: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    baseCurrency(baseCurrency) {
      this.setQuoteAfterBaseChange(baseCurrency);
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
  },
};
</script>

<style lang="scss">
@import 'variables';
.pairDropdown {
  position: relative;
  background-color: transparent;
  width: 100%;
  z-index: 1000001;
  &__current {
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: $color__black;
    background-color: $background__grey_white;
    padding-left: 5px;
    z-index: 1000001;
    border-radius: 5px;
    &:after {
      content: "";
      border-style: solid;
      border-width: 9px 7px 0;
      border-color: $color__blue transparent transparent;
      margin-left: 15px;
    }
  }
  &__container {
    cursor: pointer;
    position: absolute;
    top: -5px;
    left: -1px;
    z-index: 1000000;
    width: 110px;
    height: 100%;
    background-color: $background__grey_white;
    border: 1px solid transparent;
    border-radius: 5px;
    height: 45px;
    &--showBorder {
      border-color: $color__grey_border;
    }
  }
  &__icon {
    $size: 35px;
    fill: $color_white;
    height: $size;
    width: $size;
    z-index: 1000001;
    &--option {
      width: 30px;
      height: 25px;
      z-index: 1000001;
      padding-left: 5px;
    }
  }
  &__option {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    position: absolute;
    top: 4px;
    left: 4px;
    opacity: 0;
    height: 35px;
    width: 35px;
  }
  &__label {
    position: relative;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: $color__black;
    z-index: 1000001;
    padding-left: 10px;
    &--option {
      position: absolute;
      top: 0;
      left: 45px;
      height: 100%;
      opacity: 0;
      padding-left: 0;
      z-index: 999999;
      font-size: 11px;
    }
  }
}
</style>
