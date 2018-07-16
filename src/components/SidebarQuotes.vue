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
      )
      .quotes__headerText Range
      Dropdown.quotes__headerDropdown(
        :options="fiatCurrencies",
        v-model="selectedFiatCurrency",
        no-border,
        no-padding,
        preselect-first,
        underline,
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
</template>

<script>
import {mapState, mapActions} from 'vuex';
import {scrollbar} from '@/directives';
import {getCryptoName} from 'services/misc';
import Dropdown from 'components/Dropdown';
import Accordion from 'components/Accordion';
import SidebarQuotesItem from 'components/SidebarQuotesItem';

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
    };
  },
  computed: {
    ...mapState('quotes', {
      quotes: 'info',
    }),
    filteredQuotes() {
      if (!this.search) return this.quotes;
      return this.quotes.filter(({currency}) => {
        const fullName = getCryptoName(currency.toUpperCase()) || '';
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
    getApiRequest() {
      this.getQuotesInfo({
        period: this.selectedTimestamp,
        currencies: this.aviableQuotesToQueryString,
      });
    },
  },
  created() {
    this.getApiRequest();
  },
  watch: {
    selectedTimestamp() {
      this.getApiRequest();
    },
  },
  directives: {
    scrollbar,
  },
  components: {
    Dropdown,
    Accordion,
    SidebarQuotesItem,
  },
};

</script>

<style lang="scss" scoped>
@import 'variables';

.quotes {
  position: relative;
  display: flex;
  flex-direction: column;
  &__headerContainer {
    padding: 40px 23px 28px 23px;
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
  }

}

@keyframes spin {
  0%  {-webkit-transform: rotate(0deg);}
  100% {-webkit-transform: rotate(-180deg);}
}
</style>
