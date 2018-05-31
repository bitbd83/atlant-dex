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
  .portfolio__content(v-scrollbar="")
    Accordion(title="Tokens & Coins:"
              isSidebar
              :isLoading="getUserBalancesInCrypto.length > 0"
    )
      .portfolio__item
        SidebarPortfolioBalance.portfolio__balanceItem(
          v-for="bal in getUserBalancesInCrypto",
          :key="bal.currency",
          :data="bal",
          :isActive="bal.currency === selectedCur",
          @click.native="openCur(bal.currency)"
        )
    Accordion(title="Currencies:" isSidebar :isLoading="getUserBalancesInFiat.length > 0")
      .portfolio__item
        SidebarPortfolioBalance.portfolio__balanceItem(
          v-for="bal in getUserBalancesInFiat",
          :key="bal.currency",
          :data="bal",
          :isActive="bal.currency === selectedCur",
          @click.native="openCur(bal.currency)"
        )
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import {scrollbar} from '@/directives';
import Dropdown from './Dropdown';
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
    toCurrencyFormat(amount) {
      return amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ');
    },
  },
  created() {
    this.getBalances();
  },
  directives: {
    scrollbar,
  },
  components: {
    Dropdown,
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
    padding: 32px 18px 32px 25px;
    font-size: 12px;
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
  &__content {
    position: relative;
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
