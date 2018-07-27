// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang='pug'>
.portfolio
  .portfolio__item.portfolio__item--header
    .sidebarChild__headerLine
      .sidebarChild__title Portfolio value:
    .sidebarChild__headerLine
      .portfolio__balance $ {{portfolioValue | currency('', 2, { thousandsSeparator: ',', decimalSeparator: '.'}) }}
      .portfolio__balanceChanged
        Icon.portfolio__balanceChangedIcon(id="triangle" :class="{'portfolio__balanceChangedIcon--positive' : percChng > 0}")
        span.portfolio__balanceChangedText {{percChng | currency('', 2, { thousandsSeparator: ',', decimalSeparator: '.'}) }}%
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
    padding: 20px 18px 32px 25px;
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
