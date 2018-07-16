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
.alert
  .alert__main
    .alert__currency
      Icon.alert__currencyIcon(:id="'cur_'+ currency")
      .alert__currencyName {{currency}}
    Icon.alert__icon.alert__icon--alert(id="alert-inactive")
    .alert__date 11.10 / 21:37
  .alert__textContainer
    .alert__text Target price for #[span.alert__textCurrency {{fullCurrencyName()}}] {{targetText}} #[span.alert__textTarget {{level}}] ...
    Icon.alert__removeIcon(id="remove")
</template>

<script>
import {getCryptoName} from 'services/misc';


export default {
  data() {
    return {
    };
  },
  computed: {
    targetText() {
      return (this.dropped) ? 'has dropped to/below' : 'has reached the value of';
    },
  },
  methods: {
    fullCurrencyName() {
      const name = this.currency.toUpperCase();
      return getCryptoName(name);
    },
  },
  props: {
    currency: {
      type: String,
      required: true,
    },
    dropped: {
      type: Boolean,
      default: false,
      required: false,
    },
    level: {
      type: [String, Number],
      required: true,
    },
  },
};

</script>

<style lang="scss">
@import 'variables';

.alert {
  &__main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 17px;
  }
  &__currency{
    display: flex;
    align-items: center;
  }
  &__currencyIcon {
    $size: 25px;
    width: $size;
    height: $size;
    margin-right: 13px;
  }
  &__currencyName {
    font-size: 12px;
    font-weight: bold;
    margin-right: 5px;
    text-transform: uppercase;
  }
  &__icon{
    $size: 12px;
    width: $size;
    height: $size;
    &--alert {
      fill: #044669;
    }
  }
  &__date{
    font-size: 11px;
    color: #5b87a0;
  }
  &__textContainer{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  &__text{
    line-height: 19px;
  }
  &__textCurrency{
    color: #6ece1a;
    text-transform: capitalize;
    &:hover{
      cursor: pointer;
    }
  }
  &__textTarget {
    color: #febc09;
  }
  &__removeIcon {
    transform: rotate(45deg);
    $size: 14px;
    width: $size;
    height: $size;
    &:hover {
      cursor: pointer;
    }
    margin-top: 2px;
    margin-left: 32px;
  }
}
</style>
