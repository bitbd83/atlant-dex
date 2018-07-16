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
.balance
  .balance__content(
    v-for="(bal, index) in data",
    :key="bal.currency",
  )
    Icon.balance__currencyIcon(:id="'cur_' + setCurrency(bal.currency)")
    .balance__currencyContainer
      .balance__main
        .balance__currencyName {{bal.currency}}
        .balance__changeIconContainer
          Icon.balance__changeIcon(id="triangle-up")
        .balance__amount(:class="{'balance__amount--zero': bal.availableFunds == 0}")
          .balance__currencyBalance {{numbersFormat(bal.availableFunds)}}
          .balance__equivBalance ${{numbersFormat(bal.balanceFiat)}}
    Icon.balance__icon.balance__icon--alert(id="alert-inactive" @click="open({name:'addAlert'})")
</template>

<script>
import {mapMutations} from 'vuex';
import {numbersFormat} from '@/mixins';

export default {
  mixins: [numbersFormat],
  methods: {
    ...mapMutations('modal', [
      'open',
    ]),
    setCurrency(curr) {
      if (typeof curr == 'string') return curr.toLowerCase();
    },
  },
  props: {
    data: {
      type: [Array, Object],
    },
    isActive: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
};

</script>

<style lang="scss">
@import 'variables';

.balance {
  position: relative;
  margin-top: 24px;
  &__content {
    position: relative;
    display: flex;
    height: 75px;
    padding: 16px 16px 0 24px;
    margin-bottom: 14px;
    background: transparent;
    transition: background .5s;
    &:hover {
      background: $background__blue_white;
      transition: background .5s;
    }
  }
  &__currencyContainer {
    width: 100%;
  }
  &__main {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    cursor: pointer;
  }
  &__currencyIcon {
    $size: 28px;
    width: $size;
    height: $size;
    margin-top: -4px;
    margin-right: 13px;
  }
  &__changeIconContainer {
    flex: 2;
  }
  &__changeIcon {
    width: 6px;
    height: 7px;
    fill: $fill__green;
    margin-top: 10px;
    margin-left: 15px;
  }
  &__currencyName {
    color: $color__white;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    margin-top: 1px;
    margin-right: 5px;
  }
  &__amount {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 0;
    &--zero {
      opacity: 0.2;
      transition: opacity 0.5s;
    }
  }
  &__currencyBalance {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 14px;
  }
  &__equivBalance {
    font-size: 12px;
    font-weight: 400;
    white-space: nowrap;
  }
  &__icon{
    width: 16px;
    height: 17px;
    &--alert {
      fill: $fill__white;
      margin-left: 24px;
    }
  }
  &__deposit {
    margin: 18px 0;
    display: flex;
    justify-content: space-between;
  }
  &__depositIcon {
    $size: 14px;
    width: $size;
    height: $size;
  }
}
</style>
