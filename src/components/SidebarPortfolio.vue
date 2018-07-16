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
.portfolio
  .portfolio__item.portfolio__item--header
    .portfolio__headerLine
      .portfolio__header Portfolio value:
      // Dropdown.portfolio__headerDropdown(:options="currencies" v-model="selected")
    .portfolio__headerLine
      .portfolio__balance ${{toCurrencyFormat(portfolioValue)}}
      // .portfolio__change
        Icon.portfolio__chngIcon(id="arrow", :class="{'portfolio__chngIcon--neg': percChng < 0}")
        .portfolio__changeAmt(:class="{'portfolio__changeAmt--neg': percChng < 0}") {{percChng}}%
      //.portfolio__headerText 24 hr change
  .portfolio__item
    .portfolio__headerLine
      .portfolio__header Coins:
      Icon.portfolio__icon(id="refresh" @click="getBalances")
    SidebarPortfolioBalance.portfolio__balanceItem(v-for="bal in getUserBalancesInCrypto", :key="bal.currency", :data="bal",
     :isActive="bal.currency === selectedCur", @click.native="openCur(bal.currency)")
    //- BalanceItem(v-for="bal in balances", v-if="bal.isCrypto && bal.availableFunds == 0 && showAll", :key="bal.currency",
      :data="bal", :isActive="bal.currency == selectedCur", :isCrypto="bal.isCrypto", @click.native="openCur(bal.currency)")
    //- Icon.portfolio__EllipsisIcon(v-if="!showAll" id="ellipsis" @click="toggleShowAll()")
  //- .portfolio__item
    .portfolio__headerLine
      .portfolio__header Fiat:
      Icon.portfolio__icon(id="refresh")
    BalanceItem(v-for="bal in getUserBalancesInFiat", :key="bal.currency",
      :data="bal", :isActive="bal.currency == selectedCur", :isCrypto="bal.isCrypto", @click.native="openCur(bal.currency)")
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import Dropdown from './Dropdown';
import SidebarPortfolioBalance from './SidebarPortfolioBalance';

export default {
  data() {
    return {
      showAll: false,
      selected: '',
      selectedCur: '',
      percChng: 2.73,
    };
  },
  computed: {
    ...mapGetters('user', {
      getUserBalancesInCrypto: 'getUserBalancesInCrypto',
      getUserBalancesInFiat: 'getUserBalancesInFiat',
      portfolioValue: 'getPortofolioValue',
    }),
  },
  methods: {
    ...mapActions('user', [
      'getBalances',
    ]),
    openCur(cur) {
      this.selectedCur = cur;
    },
    toCurrencyFormat(amount) {
      return amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ');
    },
    // toggleShowAll() {
    //   this.showAll = true;
    // },
  },
  created() {
    this.getBalances();
  },
  components: {
    Dropdown,
    SidebarPortfolioBalance,
  },
};

</script>

<style lang="scss">
@import 'variables';

.portfolio {
  position: relative;
  &:after {
    display: block;
    content: '';
    height: 1px;
    border-top: 1px solid #00334C;
  }
  &__icon {
    $size: 14px;
    height: $size;
    width: $size;
    fill: #fff;
    &:active {
      animation: spin 0.5s 1 ease-in-out;
    }
    &:hover{
      cursor: pointer;
    }
  }
  &__item {
    padding: 32px 18px 32px 25px;
    border-bottom: 1px solid #032537;
    font-size: 12px;
    border-top: 1px solid #00334C;
    &--header {
      font-weight: 700;
    }
  }
  &__headerLine {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-transform: uppercase;
    &:first-of-type {
      margin-bottom: 21px;
      align-items: flex-end;
    }
  }
  &__balance {
    color: #31edd7;
    font-size: 22px;
    font-weight: 500;
  }
  &__balanceItem {
    &:not(:last-of-type) {
      margin-bottom: 30px;
    }
  }
  &__headerDropdown {
    width: 50px;
    font-size: 12px;
  }
  &__change {
    display: flex;
    align-items: center;
  }
  &__chngIcon {
    width: 11px;
    height: 9px;
    margin-right: 3px;
    fill: $color_green;
    &--neg {
      fill: $color_red;
      transform: rotate(180deg);
    }
  }
  &__EllipsisIcon {
    width: 30px;
    height: 5px;
    fill: #044669;
    cursor: pointer;
  }
  &__changeAmt {
    font-size: 14px;
    color: $color_green;
    &--neg {
      color: $color_red;
    }
  }
  &__headerText {
    font-size: 10px;
    text-transform: lowercase;
    font-weight: 400;
  }
}

@keyframes spin {
  0%  {-webkit-transform: rotate(0deg);}
  100% {-webkit-transform: rotate(-180deg);}
}
</style>
