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
    .sidebarChild__headerLine
      .sidebarChild__title Portfolio value:
    .sidebarChild__headerLine
      .portfolio__balance $ {{numbersFormat(portfolioValue)}}
      .portfolio__balanceChanged
        Icon.portfolio__balanceChangedIcon(id="triangle" :class="{'portfolio__balanceChangedIcon--positive' : percChng > 0}")
        span.portfolio__balanceChangedText {{numbersFormat(percChng)}}%
    .sidebarChild__headerLine
      .portfolio__action Make deposit
      .portfolio__action Withdraw
  .portfolio__content(v-scrollbar="")
    Accordion(title="Tokens & Coins:" isSidebar :isHidden="getUserBalancesInCrypto.length == 0")
      SidebarPortfolioBalance.portfolio__balanceItem(
        :data="getUserBalancesInCrypto"
      )
      .portfolio__add
        Icon.portfolio__addIcon(id="icon__add")
        .portfolio__addText NEW
    Accordion(title="Currencies:" isSidebar :isHidden="getUserBalancesInFiat.length == 0")
      SidebarPortfolioBalance.portfolio__balanceItem(
        :data="getUserBalancesInFiat"
      )
      .portfolio__add
        Icon.portfolio__addIcon(id="icon__add")
        .portfolio__addText NEW
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import {scrollbar} from '@/directives';
import SidebarPortfolioBalance from './SidebarPortfolioBalance';
import Accordion from 'components/Accordion';
import {numbersFormat} from '@/mixins';

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
  mixins: [numbersFormat],
  methods: {
    ...mapActions('user', [
      'getBalances',
    ]),
    openCur(cur) {
      this.selectedCur = cur;
    },
    setContentActiveBGHeight(index) {
      return (index + 1) * 80 + 'px';
    },
  },
  created() {
    this.getBalances();
  },
  directives: {
    scrollbar,
  },
  components: {
    SidebarPortfolioBalance,
    Accordion,
  },
};

</script>

<style lang="scss">
@import 'variables';

.portfolio {
  position: relative;
  display: flex;
  flex-direction: column;

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
    padding: 40px 18px 32px 25px;
    font-size: 12px;

    &--header {
      font-weight: 700;
    }
  }

  &__balance {
    color: $color__white;
    font-size: 22px;
    line-height: 22px;
    font-weight: 500;
    white-space: nowrap;
  }

  &__balanceChanged {
    margin-top: 12px;
    display: flex;
    align-items: flex-end;
  }

  &__balanceChangedIcon {
    width: 7px;
    height: 6px;
    fill: $fill__red;
    margin-bottom: 2px;

    &--positive {
      transform: rotate(180deg);
      fill: $fill__green;
    }
  }

  &__balanceChangedText {
    color: $color__white;
    font-size: 14px;
    line-height: 14px;
    font-weight: 700;
    margin-left: 9px;
  }

  &__action {
    color: #ffffff;
    font-family: Supply;
    font-size: 14px;
    font-weight: 400;
    position: relative;
    cursor: pointer;

    &:after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 100%;
      height: 3px;
      background: $background__white;
      transition: transform .3s ease-in;
      transform: scale3d(1,1,1);
    }

    &:hover:after {
      transition: transform .3s ease-out;
      transform: scale3d(0,1,1);
    }
  }

  &__content {
    position: relative;
  }

  &__add {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin: 32px 0 25px 24px;
  }

  &__addIcon {
    $size: 28px;
    width: $size;
    height: $size;
    fill: $fill__white;
    margin-right: 12px;
  }

  &__addText {
    font-size: 16px;
    font-weight: 700;
  }
}
</style>
