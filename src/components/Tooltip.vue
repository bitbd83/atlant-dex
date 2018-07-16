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
.tooltip(:class="{'tooltip--bottom': bottom, 'tooltip--middle': middle}")
  slot
</template>

<script>
export default {
  props: {
    bottom: {
      type: Boolean,
      required: false,
      default: false,
    },
    middle: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss">
  @import 'variables';
  .tooltip {
    $arrow_left: 18px;
    $arrow_width: 11px;
    $arrow_height: 12px;
    position: absolute;
    // min-width: 256px;
    // padding: 20px 20px 13px 20px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0px 0px 15px 0px rgba(40, 75, 105, 0.15);
    &::after
    {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 0 $arrow_width $arrow_height;
      border-color: #FFFFFF transparent;
      display: block;
      width: 0;
      z-index: 1;
      top: -$arrow_height;
      left: $arrow_left;
    }
    &::before
    {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 0 $arrow_width $arrow_height;
      border-color: transparent;
      display: block;
      width: 0;
      z-index: 0;
      top: -($arrow_height + 1);
      left: $arrow_left;
    }
    &--bottom {
      top: initial !important;
      bottom: calc(100% + 32px);
      &::after, &::before {
        top: 100%;
        transform: rotate(180deg);
      }
    }
    &--middle {
      &::after, &::before {
        left: calc(50% - ((#{$arrow_width} + #{$arrow_height}) / 2));
      }
    }
  }
</style>
