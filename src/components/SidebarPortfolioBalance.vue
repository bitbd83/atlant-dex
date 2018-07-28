// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang='pug'>
.balance
  .balance__container(
    v-for="(bal, index) in data",
    :key="bal.currency",
  )
    .balance__content
      Icon.balance__currencyIcon(:id="'cur_' + setCurrency(bal.currency)")
      .balance__currencyContainer
        .balance__main
          .balance__currencyName {{bal.currency}}
          .balance__changeIconContainer
            Icon.balance__changeIcon(id="triangle-up")
          .balance__amount(:class="{'balance__amount--zero': bal.availableFunds == 0}")
            .balance__currencyBalance {{bal.availableFunds | currency('', 2, { thousandsSeparator: ',', decimalSeparator: '.'}) }}
            .balance__equivBalance ${{bal.balanceFiat | currency('', 2, { thousandsSeparator: ',', decimalSeparator: '.'}) }}
      Icon.balance__icon.balance__icon--alert(id="alert-inactive" @click="openModal({name:'addAlert'})")
    .balance__actions
      .balance__action(@click="openDeposit(bal.currency)") Make deposit
      .balance__action(@click="openWithdrawal(bal.currency)") Withdraw
</template>

<script>
import {mapMutations} from 'vuex';

export default {
  methods: {
    ...mapMutations('modal', {
      openModal: 'open',
    }),

    setCurrency(curr) {
      if (typeof curr == 'string') return curr.toLowerCase();
    },


    openDeposit(currency) {
      if (currency !== 'USD') {
        this.openCrypto(currency, 'cryptoDeposit');
      } else {
        this.openFiat(currency, true);
      };
    },

    openWithdrawal(currency) {
      if (currency !== 'USD') {
        this.openCrypto(currency, 'cryptoWithdraw');
      } else {
        this.openFiat(currency, false);
      };
    },

    openFiat(currency, isDeposit) {
      this.openModal({
        name: 'fiat',
        data: {
          isDeposit,
          currency: currency,
        },
      });
    },

    openCrypto(currency, name) {
      this.openModal({
        name,
        data: {
          currency: currency,
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
  },
};

</script>

<style lang="scss">
@import 'variables';

.balance {
  position: relative;
  margin-top: 24px;
  &__container {
    position: relative;
    padding: 16px 16px 16px 24px;
    margin-bottom: 14px;
    background: transparent;
    transition: background .5s;

    &:hover {
      background: $background__blue_white;
      transition: background .5s;
    }
  }
  &__content {
    display: flex;
    margin-bottom: 14px;
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
  &__icon{
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
  &__actions {
    display: flex;
    justify-content: space-evenly;
  }
  &__action {
    cursor: pointer;
  }
}
</style>
