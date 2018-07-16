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
.bookHeader
    .bookHeader__title Last: #[Icon.bookHeader__icon(id="arrow", v-if='!ask', :class="{'bookHeader__icon--neg': change <= 0}")] #[.bookHeader__number {{last.toFixed(4)}}]
    .bookHeader__title #[.bookHeader__rangeSelector 12H Range] #[.bookHeader__number {{low.toFixed(4)}} - {{high.toFixed(4)}}]
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('tradeInfo', {
      last: (state) => state.pairInfo.last,
      high: (state) => state.pairInfo.high,
      low: (state) => state.pairInfo.low,
      change: (state) => state.pairInfo.change,
    }),
  },
  props: {
    ask: {
      type: Boolean,
      default: false,
      required: false,
    },
    price: {
      type: Number,
      default: 0,
      required: false,
    },
  },
};
</script>

<style lang="scss">
@import 'variables';
.bookHeader {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
  color: $color__black;
  &__title {
    display: flex;
    align-items: flex-end;
    font-size: 16px;
    font-weight: 500;
    white-space: nowrap;
    &:first-child {
      margin-right: 39px;
    }
  }
  &__number {
    font-size: 18px;
    font-weight: 400;
  }
  &__icon {
    width: 7px;
    height: 6px;
    margin: 0 9px 4px 12px;
    fill: $color_green;
    &--neg {
      fill: $color_red;
      transform: rotate(180deg);
    }
  }
  &__rangeSelector {
    margin-right: 24px;
  }
}
</style>
