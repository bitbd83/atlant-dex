// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang='pug'>
.balance
  .balance__content(
    v-for="(bal, index) in data",
    :key="bal.currency",
    @click="getShowButtons(bal.currency)"
  )
    .balance__container
      Icon.balance__currencyIcon(:id="'cur_' + setCurrency(bal.currency)")
      .balance__currencyContainer
        .balance__main
          .balance__currencyName {{bal.currency}}
          .balance__changeIconContainer
            Icon.balance__changeIcon(id="triangle-up")
          .balance__amount(:class="{'balance__amount--zero': bal.availableFunds == 0}")
            .balance__currencyBalance {{bal.availableFunds | currency('', 2, { thousandsSeparator: ',', decimalSeparator: '.'}) }}
            .balance__equivBalance ${{bal.balanceFiat | currency('', 2, { thousandsSeparator: ',', decimalSeparator: '.'}) }}
      Icon.balance__icon.balance__icon--alert(id="alert-inactive" @click="open({name:'addAlert'})")
    .balance__buttonContainer(v-show="showButtons == bal.currency")
      button.balance__button(@click="openDeposit(bal.currency)") Deposit
      button.balance__button.balance__button--withdraw(@click="openWithdraw(bal.currency)")  Withdraw
</template>

<script>
import {mapMutations} from 'vuex';

export default {
  data() {
    return {
      showButtons: '',
    };
  },
  methods: {
    ...mapMutations('modal', [
      'open',
    ]),
    setCurrency(curr) {
      if (typeof curr == 'string') return curr.toLowerCase();
    },
    getShowButtons(curr) {
      this.showButtons = this.showButtons == curr ? '' : curr;
    },
    openDeposit(curr) {
      this.open({
        name: this.isFiat ? 'fiat' : 'cryptoDeposit',
        data: {
          isDeposit: true,
          currency: curr,
        },
      });
    },
    openWithdraw(curr) {
      this.open({
        name: this.isFiat ? 'fiat' : 'cryptoWithdraw',
        data: {
          isDeposit: false,
          currency: curr,
        },
      });
    },
  },
  props: {
    data: {
      type: [Array, Object],
    },
    isActive: {
      type: Boolean,
      default: false,
      required: false,
    },
    isFiat: Boolean,
  },
};

</script>

<style lang="scss">
@import 'variables';

.index--dark .balance__content:hover{
  background: $background__dark_toolbar;
}

.balance {
  position: relative;
  margin-top: 24px;
  &__content {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 16px 16px 16px 24px;
    margin-bottom: 14px;
    background: transparent;
    transition: background .5s;
    &:hover {
      background: $background__blue_white;
      transition: background .5s;
    }
  }
  &__container {
    display: flex;
    padding-bottom: 14px;
  }
  &__currencyContainer {
    width: 100%;
  }
  &__main {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    cursor: pointer;
  }
  &__currencyIcon {
    $size: 28px;
    width: $size;
    height: $size;
    margin-top: -4px;
    margin-right: 13px;
  }
  &__changeIconContainer {
    flex: 2;
  }
  &__changeIcon {
    width: 6px;
    height: 7px;
    fill: $fill__green;
    margin-top: 10px;
    margin-left: 15px;
  }
  &__currencyName {
    color: $color__white;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    margin-top: 1px;
    margin-right: 5px;
  }
  &__amount {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 0;
    &--zero {
      opacity: 0.2;
      transition: opacity 0.5s;
    }
  }
  &__currencyBalance {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 14px;
  }
  &__equivBalance {
    font-size: 12px;
    font-weight: 400;
    white-space: nowrap;
  }
  &__buttonContainer {
    display: flex;
    justify-content: space-between;
    margin-right: 40px;
  }
  &__button {
    width: 80px;
    height: 26px;
    border-radius: 2px;
    background: $background__green;
    color: $color__white;

    &--withdraw {
      border: solid 1px $background__white;
      background: transparent;
    }

    &:hover {
      background: $background__yellow;
      border-width: 0px;
    }
  }
  &__icon {
    width: 16px;
    height: 17px;
    &--alert {
      fill: $fill__white;
      margin-left: 24px;
    }
  }
  &__deposit {
    margin: 18px 0;
    display: flex;
    justify-content: space-between;
  }
  &__depositIcon {
    $size: 14px;
    width: $size;
    height: $size;
  }
}
</style>
