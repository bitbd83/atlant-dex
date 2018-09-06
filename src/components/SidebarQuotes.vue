// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang='pug'>
.quotes
  .quotes__headerContainer
    .sidebarChild__headerLine
      .sidebarChild__title CURRENT QUOTES’S:
    .quotes__paramsContainer
      Dropdown.quotes__headerDropdown(
        :options="aviableTimestamps",
        v-model="selectedTimestamp",
        no-border,
        no-padding,
        preselect-first,
        underline,
        whiteTriangle,
      )
      .quotes__headerText Range
      Dropdown.quotes__headerDropdown(
        :options="fiatCurrencies",
        v-model="selectedFiatCurrency",
        no-border,
        no-padding,
        preselect-first,
        underline,
        whiteTriangle,
      )
    input.quotes__search(type="text", placeholder="Search for..." v-model="search")
  .quotes__content(v-scrollbar="")
    Accordion(title="Tokens & Coins:" isSidebar :isHidden="filteredQuotes.length == 0")
      SidebarQuotesItem(
        v-for="chart in filteredQuotes",
        :key="chart.currency",
        :currency="chart.currency.toLowerCase()",
        :price="chart.price",
        :priceChng="chart.change",
        :cap="chart.cap",
        :volume="chart.volume",
        :isActive="activeCur == chart.currency",
        @click.native="openChart(chart.currency)",
      )
    Loader(:isLoading="isLoading" isWhite="")
</template>

<script>
import {mapState, mapActions} from 'vuex';
import {scrollbar} from '@/directives';
import {cryptoName} from '@/store/staticData/cryptoName';
import Dropdown from 'components/Dropdown';
import Accordion from 'components/Accordion';
import SidebarQuotesItem from 'components/SidebarQuotesItem';
import Loader from 'components/Loader';

export default {
  data() {
    return {
      fiatCurrencies: ['USD'],
      selectedFiatCurrency: 'USD',
      aviableTimestamps: ['1h', '24h', '1w'],
      selectedTimestamp: '12h',
      search: '',
      activeCur: 'btc',
      aviableQuotes: ['BTC', 'ETH', 'LTC', 'ATL'],
      isLoading: false,
    };
  },
  computed: {
    ...mapState('quotes', {
      quotes: 'info',
    }),
    filteredQuotes() {
      if (!this.search) return this.quotes;
      return this.quotes.filter(({currency}) => {
        const fullName = cryptoName[currency.toUpperCase()] || '';
        const searchLowerCased = this.search.toLowerCase();
        return (
            currency.toLowerCase().includes(searchLowerCased)
            || fullName.toLowerCase().includes(searchLowerCased)
        );
      });
    },
    aviableQuotesToQueryString() {
      let queryString = '';
      for (let i=0; i < this.aviableQuotes.length; i++) {
        queryString += '&currencies=' + this.aviableQuotes[i];
      };
      return queryString;
    },
  },
  methods: {
    ...mapActions('quotes', [
      'getQuotesInfo',
    ]),
    openChart(cur) {
      this.activeCur = cur;
    },
    getApiRequest(isChangeTimeStamp = false) {
      if (this.filteredQuotes.length == 0 || isChangeTimeStamp) {
        this.isLoading = true;
        this.getQuotesInfo({
          period: this.selectedTimestamp,
          currencies: this.aviableQuotesToQueryString,
        }).then(() => {
          this.isLoading = false;
        }).catch(() => {
          this.isLoading = false;
        });
      };
    },
  },
  created() {
    this.getApiRequest();
  },
  watch: {
    selectedTimestamp() {
      this.getApiRequest(true);
    },
  },
  directives: {
    scrollbar,
  },
  components: {
    Dropdown,
    Accordion,
    SidebarQuotesItem,
    Loader,
  },
};

</script>

<style lang="scss" scoped>
@import 'variables';

.index--dark {
  .quotes {
    &__search {
      background: $background__dark_toolbar;
    }
  }
}

.quotes {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  &__headerContainer {
    padding: 20px 23px 28px 23px;
  }
  &__paramsContainer {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
  }
  &__headerText {
    flex: 2;
    margin-left: 13px;
  }
  &__search{
    width: 100%;
    height: 41px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.33);
    border-radius: 2px;
    border-color: transparent;
    background: $background__blue;
    font-size: 14px;
    font-weight: 400;
    padding: 12px 11px;
    &::placeholder{
      color: $color__white;
    }
  }

  &__content {
    position: relative;
    flex-grow: 2;
  }

}

@keyframes spin {
  0%  {-webkit-transform: rotate(0deg);}
  100% {-webkit-transform: rotate(-180deg);}
}
</style>
