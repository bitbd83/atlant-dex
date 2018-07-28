// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang='pug'>
.buySell
  .buySell__default(v-show="!isDone")
    .buySell__headerContainer
      .buySell__header
        .title.buySell__title  {{baseCurrency}} / {{quoteCurrency}}
        Icon.buySell__arrow(id="arrow_short")
        .buySell__infoContainer
          .buySell__info #[.buySell__infoLabel Spread] #[span {{bidAskSpread | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ','}) }}%]
          .buySell__info #[.buySell__infoLabel Fee] #[span {{(fee * 100) | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ','}) }}%]
    .buySell__buttons
      .buySell__quantity(:class="{'buySell__quantity--expand' : open}")
        IInput.buySell__input(v-show="!open" placeholder="Quantity" center no-underline v-model="amount" type="number")
        .buySell__input(v-show="open") {{amount}} {{baseCurrency}}
        Icon.buySell__close(v-show="open" id="cross" @click="toggleMain(false)")
    .buySell__main(:class="[{'buySell__main--open': open}, 'buySell__main--' + type]")
      .buySell__types
        .buySell__typeBox(:class="{'buySell__typeBox--selected' : type === 'market'}" @click="setType('market')") Market
        .buySell__typeBox(:class="{'buySell__typeBox--selected' : type === 'limit'}" @click="setType('limit')") Limit
      .buySell__field.buySell__field--limit(:class="{'buySell__field--showLimit' : type === 'limit'}" )
        .buySell__label Limit price
        .buySell__inputContainer
          IInput.buySell__input(center no-underline v-model="price" type="number")
      .buySell__field
        .buySell__label Total amount
        .buySell__inputContainer
          .buySell__totalAmount {{getTotal | currency('', 4, { thousandsSeparator: '.', decimalSeparator: ','}) }} {{quoteCurrency}}
      BButton.buySell__button.buySell__button--buy(:class="{'buySell__button--hide': !isBuy && open, 'buySell__button--full': isBuy && open}" color="green" caps @click="startTransaction(true)")
        .buySell__buttonContent(v-show="!open") #[b Buy] #[div {{ask | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ','}) }}]
        .buySell__buttonContent(v-show="open") Confirm buy order
      BButton.buySell__button.buySell__button--sell(:class="{'buySell__button--hide': isBuy && open, 'buySell__button--full': !isBuy && open}" color="red" caps @click="startTransaction(false)")
        .buySell__buttonContent(v-show="!open") #[b Sell] #[div {{bid | currency('', 2, { thousandsSeparator: '.', decimalSeparator: ','}) }}]
        .buySell__buttonContent(v-show="open") Confirm sell order
  .buySell__done(v-show="isDone" @click="isDone = false") Done
</template>

<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';
import {notification} from 'services/notification';
import {addTileToDashboard} from 'services/grid';
import BButton from 'components/BButton';
import IInput from 'components/IInput';

export default {
  data() {
    return {
      open: false,
      isDone: false,
      type: 'market',
      isBuy: false,
      amount: '',
      price: '',
      total: 0,
    };
  },
  computed: {
    ...mapState('tradeInfo', {
      bid: (state) => state.pairInfo.bid,
      ask: (state) => state.pairInfo.ask,
      fee: (state) => state.pairInfo.makerFee,
    }),
    ...mapGetters('membership', {
      isLoggedIn: 'isLoggedIn',
    }),
    ...mapGetters('tradeInfo', {
      baseCurrency: 'baseCurrency',
      quoteCurrency: 'quoteCurrency',
    }),
    bidAskSpread() {
      return (this.ask/this.bid - 1) ? (this.ask/this.bid - 1) : 0;
    },
    getPrice() {
      return this.isBuy ? this.ask : this.bid;
    },
    getTotal() {
      let total = 0;
      if (this.type === 'market') {
        total = this.isBuy ? this.ask * this.amount : this.bid * this.amount;
      } else {
        total = this.amount * this.price;
      };
      return (this.isBuy ? total + (total / 100) * this.fee : total - (total / 100) * this.fee);
    },
  },
  methods: {
    addInvalidQuantityBorder() {
      let element = document.querySelector('.buySell__quantity');
      element.classList.remove('buySell__quantity--invalid');
      void element.offsetWidth;
      element.classList.add('buySell__quantity--invalid');
    },
    ...mapActions('orders', {
      placeOrder: 'placeOrder',
    }),
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    toggleMain(isOpen) {
      this.open = isOpen;
    },
    setType(type) {
      this.type = type;
    },
    startTransaction(isBuy) {
      if (!this.open) {
        if (this.amount > 0) {
          this.toggleMain(true);
          this.isBuy = isBuy;
        } else {
          notification({
            title: 'Negative or zero value:',
            text: 'Please correct the value provided.',
            type: 'error',
          });
          this.addInvalidQuantityBorder();
          return false;
        };
      } else {
        this.getOrder();
      }
    },
    getOrder() {
      if (!this.isLoggedIn) {
        this.openModal({name: 'signIn'});
        return false;
      };
      this.placeOrder({
        isMarketOrder: this.type === 'market',
        isSellOrder: !this.isBuy,
        baseCurrency: this.baseCurrency,
        quoteCurrency: this.quoteCurrency,
        price: this.price,
        quantity: this.amount,
        isQuantityInBaseCurrency: true,
      }).then(() => {
        this.isDone = true;
        this.amount = '';
        this.total = 0;
        this.open = false;
      });
    },
  },
  watch: {
    isBuy() {
      this.price = this.getPrice;
    },
    type() {
      this.price = this.getPrice;
    },
    bid() {
      if (this.type === 'market') this.price = this.getPrice;
    },
    ask() {
      if (this.type === 'market') this.price = this.getPrice;
    },
  },
  created() {
    this.price = this.getPrice;
  },
  mounted() {
    addTileToDashboard(
      this.$store,
      {
        target: document.getElementsByClassName('buySell')[0],
        trigger: document.getElementsByClassName('buySell__headerContainer')[0],
        isHideable: false,
        isResizeable: false,
      }
    );
  },
  components: {
    BButton,
    IInput,
  },
};

</script>

<style lang='scss'>
@import 'variables';
.buySell {
  position: absolute;
  overflow: hidden;
  width: 360px;
  color: $color__white;
  border-radius: 8px;
  z-index: 100000;
  &__default {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: $color__blue;
  }
  &__headerContainer {
    width: 100%;
    padding: 15px 23px 15px 0;
  }
  &__header{
    min-height: 28px;
    max-height: 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-left: 5px solid $color__white;
  }
  &__title {
    white-space: nowrap;
    margin-left: 15px;
  }
  &__arrow{
    width: 10px;
    height: 9px;
    // margin-right: 8px;
    fill: $color_white;
  }
  &__infoContainer {
    display: flex;
    align-items: center;
  }
  &__info {
    font-weight: 400;
    display: flex;
    align-items: baseline;
    &:not(:last-child) {
      margin-right: 12px;
    }
  }
  &__infoLabel {
    font-size: 12px;
    font-weight: 300px;
    opacity: 0.6;
    margin-right: 10px;
  }
  &__buttons {
    width: 100%;
    height: 66px;
    display: flex;
    justify-content: center;
  }
  &__button {
    position: absolute;
    bottom: 0;
    width: 120px;
    height: 66px;
    font-size: 12px;
    transition: width .4s ease-out;
    &--buy {
      left: 0;
    }
    &--sell {
      right: 0;
    }
    &--buy.buySell__button--full,
    &--sell.buySell__button--full {
      width: 100%;
    }
    &--buy.buySell__button--hide,
    &--sell.buySell__button--hide {
      display: none;
    }
  }
  &__buttonContent {
    font-size: 16px;
    font-weight: 400;
  }
  &__quantity {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.33);
    transition: width .5s ease-out;
    &--expand {
      width: 100%;
      transition: width .5s ease-out;
    }
    &--invalid {
      animation: borderAccent 1s linear 2;
    }
  }
  &__main {
    position: relative;
    width: 100%;
    height: 0;
    transition: height .4s ease-out, padding .4s ease-out;
    &--open {
      padding: 23px;
    }
    &--open.buySell__main--limit {
      height: 380px;
    }
    &--open.buySell__main--market {
      height: 271px;
    }
  }
  &__types {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 28px;
  }
  &__typeBox {
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 146px;
    height: 42px;
    border-radius: 2px;
    border: 1px solid rgba(255, 255, 255, .5);
    cursor: pointer;
    text-transform: uppercase;
    &:hover, &--selected {
      border-color: $color__white;
    }
  }
  &__field {
    overflow: hidden;
    &--limit {
      height: 0;
      margin: 0;
      transition: height .4s ease-out;
    }
    &--showLimit {
      height: 79px;
      margin-bottom: 28px;
    }
  }
  &__inputContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 46px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
    border-radius: 2px;
    background-color: #0248e9;
  }
  &__input {
    // width: 100%;
  }
  &__totalAmount {
    width: 100%;
    text-align: center;
  }
  &__label{
    font-size: 16px;
    font-weight: 400;
    width: 100%;
    margin-bottom: 14px;
  }
  &__close {
    $size: 15px;
    width: $size;
    height: $size;
    fill: $fill__white;
    position: absolute;
    right: 20px;
    cursor: pointer;
    animation: spin .5s linear;
  }
  &__done {
    text-transform: uppercase;
    height: 160px;
    background-color: $background__green;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 700;
    cursor: pointer;
  }
}

@keyframes spin { 0% { opacity: 0 } 100% { opacity: 1; -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
@keyframes borderAccent { 0% { background-color: transparent; } 100% { background-color: $color__red; } }
</style>
