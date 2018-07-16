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
label.radio
  input.radio__input(:id="`radio${_uid}`", type="radio", :name="name", @change="change")
  .radio__icon
  .radio__text(v-if="label") {{label}}
  slot
</template>

<script>

export default {
  model: {
    prop: 'cModel',
    event: 'change',
  },
  methods: {
    change() {
      this.$emit('change', this.value);
    },
  },
  mounted() {
    if (this.checked) {
      this.change();
      document.querySelector(`#radio${this._uid}`).checked = true;
    }
  },
  props: {
    name: {
      type: [String, Number],
      default: '',
      required: true,
    },
    value: {
      type: [String, Number, Boolean],
      default: '',
      required: false,
    },
    cValue: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: [String, Number],
      default: '',
      required: false,
    },
    checked: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};

</script>

<style lang='scss' scoped>
@import 'variables';
$ROOT: "radio";
.#{$ROOT} {
  display: flex;
  align-items: center;
  cursor: pointer;
  &__input {
    position: absolute;
    clip: rect(0 0 0 0);
    width: 1px;
    height: 1px;
    margin: -1px;
    &:checked {
      & + .#{$ROOT}__icon {
        border-color: $color_green;
        background-color: $color_green;
      }
    }
  }
  &__icon {
    $size: 12px;
    width: $size;
    height: $size;
    border-radius: 50%;
    border-style: solid;
    border-width: 1px;
    border-color: $color_yellow;
    flex-shrink: 0;
  }
  &__text {
    font-size: 12px;
    font-weight: bold;
    margin-left: 10px;
    color: inherit;
    text-transform: uppercase;
  }
}
</style>
