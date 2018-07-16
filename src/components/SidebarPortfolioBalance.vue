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
.balance
  Icon.balance__currencyIcon(:id="logoId")
  .balance__currencyContainer
    .balance__main
      .balance__currencyName(:class="activeClass") {{data.currency}}
      //Icon.balance__icon.balance__icon--qr(id="qr")
      .balance__amount(:class="{'balance--zero': data.availableFunds == 0}")
        .balance__currencyBalance {{toCurrencyFormat(data.availableFunds)}}
        .balance__equivBalance ${{toCurrencyFormat(data.balanceFiat)}}
    .balance__additional(v-if="isActive")
      div &#8212;
      .balance__deposit
        Icon.balance__depositIcon(id="deposit")
        .balance__actionText(@click="openDeposit()") Make deposit
        .balance__actionText(@click="openWithdrawal()") Withdraw
      div &#8212;
      .balance__withdraw
  //Icon.balance__icon.balance__icon--alert(id="alert-inactive")
</template>

<script>
import {mapMutations} from 'vuex';

export default {
  data() {
    return {
    };
  },
  computed: {
    activeClass() {
      return (this.data.isActive) ? 'balance__currencyName--active' : '';
    },
    logoId() {
      return 'cur_'+ this.data.currency.toLowerCase();
    },
  },
  methods: {
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    openFiat(isDeposit) {
      this.openModal({
        name: 'fiat',
        data: {
          isDeposit,
          currency: this.data.currency,
        },
      });
    },
    openCrypto(name) {
      this.openModal({
        name,
        data: {
          currency: this.data.currency,
        },
      });
    },
    openDeposit() {
      if (this.data.isCrypto) {
        this.openCrypto('cryptoDeposit');
      } else {
        this.openFiat(true);
      };
    },
    openWithdrawal() {
      if (this.data.isCrypto) {
        this.openCrypto('cryptoWithdraw');
      } else {
        this.openFiat(false);
      };
    },
    toCurrencyFormat(amount) {
      return amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ');
    },
  },
  props: {
    data: {
      type: Object,
      validator: (value) => {
        return value.currency !== '' && value.isCrypto !== '';
      },
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
  display: flex;
  align-items: flex-start;
  &--zero {
    opacity: 0.2;
  }
  &:hover {
    .balance--zero {
      opacity: 1;
    }
  }
  &__currencyContainer {
    width: 100%;
  }
  &__main {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    &:hover {
      cursor: pointer;
      color: #ffc600;
    }
  }
  &__currencyIcon {
    $size: 25px;
    width: $size;
    height: $size;
    margin-top: 5px;
    margin-right: 13px;
  }
  &__currencyName {
    font-size: 12px;
    font-weight: bold;
    margin-top: 9px;
    margin-right: 5px;
    text-transform: uppercase;
    &--active {
      color: #ffc600;
    }
  }
  &__amount {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 0;
  }
  &__currencyBalance {
    font-size: 18px;
    margin-top: 3px;
    margin-bottom: 10px;
    font-weight: 400;
  }
  &__equivBalance {
    font-size: 14px;
    font-weight: 400;
  }
  &__icon{
    $size: 12px;
    width: $size;
    height: $size;
    &--qr {
      fill: #fff;
      margin-top: 9px;
    }
    &--alert {
      fill: #044669;
      margin-top: 5px;
      margin-left: 14px;
    }
  }
  &__deposit {
    margin: 18px 0;
    display: flex;
    justify-content: space-between;
  }
  &__actionText {
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  &__depositIcon {
    $size: 14px;
    width: $size;
    height: $size;
  }
}
</style>
