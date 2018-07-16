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

<template lang="pug">
.pair
  Dropdown.pair__select(
    :options="baseCurrencyOptions",
    :value="baseCurrency",
    @input="changeBaseCurrency",
    no-border,
    no-padding,
  )
    template(slot="option", slot-scope="props")
      .pair__label
        Icon.pair__icon.pair__icon--option(:id="getCurrencyIconId(props.option)")
        div {{props.option}}
    template(slot="singleLabel", slot-scope="props")
      .pair__label
        Icon.pair__icon(:id="getCurrencyIconId(props.option)")
        span {{props.option}}
  Icon.pair__exchange(id="exchange")
  Dropdown.pair__select(
    :options="quoteCurrencyOptions",
    :value="quoteCurrency",
    @input="changeQuoteCurrency",
    no-border,
    no-padding,
  )
    template(slot="option", slot-scope="props")
      .pair__label
        Icon.pair__icon.pair__icon--option(:id="getCurrencyIconId(props.option)")
        div {{props.option}}
    template(slot="singleLabel", slot-scope="props")
      .pair__label
        Icon.pair__icon(:id="getCurrencyIconId(props.option)")
        span {{props.option}}
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import Dropdown from './Dropdown';

export default {
  computed: {
    ...mapState('trade', [
      'pairs',
    ]),
    ...mapGetters('trade', [
      'baseCurrency',
      'quoteCurrency',
    ]),
    baseCurrencyOptions() {
      return Object.keys(this.pairs);
    },
    quoteCurrencyOptions() {
      return this.pairs[this.baseCurrency];
    },
  },
  methods: {
    ...mapActions('trade', [
      'changeQuoteCurrency',
      'changeBaseCurrency',
      'getPairs',
      'getPairInfo',
    ]),
    setQuoteAfterBaseChange(baseCurrency) {
      // This should be moved to Store
      // Do not change if current quote available for new base
      if (this.pairs[baseCurrency].includes(this.quoteCurrency)) return;
      // If not, change quote currency for first available
      this.changeQuoteCurrency(this.pairs[baseCurrency][0]);
    },
    getCurrencyIconId(currencyName) {
      return `cur_${currencyName}`.toLocaleLowerCase();
    },
  },
  watch: {
    baseCurrency(baseCurrency) {
      this.setQuoteAfterBaseChange(baseCurrency);
      this.getPairInfo();
    },
    quoteCurrency() {
      this.getPairInfo();
    },
  },
  created() {
    this.getPairs();
    this.getPairInfo();
  },
  components: {
    Dropdown,
  },
};
</script>

<style lang="scss">
@import 'variables';
.pair {
  align-items: center;
  display: flex;
  &__icon {
    $size: 25px;
    fill: $color_white;
    height: $size;
    margin-right: 10px;
    width: $size;

    &--option {
      $size: 17px;
      width: $size;
      height: $size;
    }
  }
  &__select {
    max-width: 90px;
    min-width: 90px;
  }
  &__label {
    align-items: center;
    display: flex;
    flex-direction: row;
    font-size: 16px;
    font-weight: bold;
    width: max-content;
  }
  &__option {
    align-items: center;
    display: flex;
    flex-direction: row;
    font-size: 16px;
    font-weight: bold;
  }
  &__exchange {
    $size: 15px;
    fill: $color_yellow;
    height: $size;
    margin: 0 10px;
    transform: rotate(90deg);
    width: $size;
  }
}
</style>
