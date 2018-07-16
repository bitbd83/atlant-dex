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
  .quotes__item.quotes__item--header
    .quotes__headerLine
      .quotes__header QUOTES:
      .quotes__headerText 24 hr change
      Dropdown.quotes__headerDropdown(
        :options="currencies",
        v-model="selected",
        no-border,
        no-padding,
        preselect-first,
      )
  .quotes__item.quotes__item--search
    .quotes__headerLine
      input.quotes__search(type="text", placeholder="Search" v-model="search")
      Icon.quotes__searchIcon(id="search")
  .quotes__item(v-show="quotes")
    .quotes__headerLine
      .quotes__header Coins:
      Icon.quotes__icon(id="refresh")
    SidebarQuotesItem(v-for="chart in filteredQuotes", :key="chart.currency",
    :currency="chart.currency.toLowerCase()", :price="chart.price", :priceChng="chart.change", :cap="chart.cap", :volume="chart.volume",
    :isActive="activeCur == chart.currency", @click.native="openChart(chart.currency)")
</template>

<script>
import {mapState, mapActions} from 'vuex';
import {getCryptoName} from 'services/misc';
import Dropdown from './Dropdown';
import SidebarQuotesItem from './SidebarQuotesItem';

export default {
  data() {
    return {
      selected: '',
      search: '',
      activeCur: 'btc',
      // quotes: [
      //   {
      //     currency: 'btc',
      //     price: '$11 388,60',
      //     priceChng: '-3.71',
      //     cap: '$44 192 919 519',
      //     volume: '$1 100 850 000',
      //   },
      //   {
      //     currency: 'eth',
      //     price: '$459,70',
      //     priceChng: '-4.10',
      //     cap: '$44 192 919 519',
      //     volume: '$1 100 850 000',
      //   },
      //   {
      //     currency: 'tether',
      //     price: '$459,70',
      //     priceChng: '-4.10',
      //     cap: '$44 192 919 519',
      //     volume: '$1 100 850 000',
      //   },
      // ],
      currencies: ['USD'],
      aviableQuotes: ['BTC', 'ETH', 'LTC', 'ATL'],
    };
  },
  computed: {
    ...mapState('trade', {
      quotes: 'quotesInfo',
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
    ...mapActions('trade', [
      'getQuotesInfo',
    ]),
    openChart(cur) {
      this.activeCur = cur;
    },
//    isSearched(cur) {
//      return cur.includes(this.search);
//    },
    getApiRequest() {
      this.getQuotesInfo({
        period: '24h',
        currencies: this.aviableQuotesToQueryString,
      });
    },
  },
  created() {
    this.getApiRequest();
  },
  components: {
    SidebarQuotesItem,
    Dropdown,
  },
};

</script>

<style lang="scss" scoped>
@import 'variables';

.quotes {
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
    border-top: 1px solid #00334C;
    font-size: 12px;
    &--header {
      font-weight: 700;
    }
    &--search {
      padding: 14px 18px 14px 25px;
    }
  }
  &__headerLine {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-transform: uppercase;
  }
  &__search{
    border: none;
    padding: 0;
    height: 14px;
    width: 100%;
    background-color: transparent;
    color: #5b87a0;
    &::placeholder{
      color: #5b87a0;
    }
  }
  &__searchIcon {
    $size: 18px;
    height: $size;
    width: $size;
    fill: #ffffff;
    &:hover {
      cursor: pointer;
    }
  }
  &__headerDropdown {
    width: 50px;
    font-size: 12px;
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
