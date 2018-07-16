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
.inputField
  input.inputField__input(:value="value", :placeholder="placeholder", @input="change", :type="type" required, :class="{'inputField__input--center' : center}")
  .inputField__line
  label.inputField__label(v-if="label") {{label}}
</template>

<script>
import {mapState, mapMutations} from 'vuex';

export default {
  model: {
    event: 'change',
  },
  computed: {
    ...mapState('misc', {
      textValues: (state) => state.values,
    }),
  },
  methods: {
    ...mapMutations('misc', {
      setInput: 'setInput',
    }),
    change(e) {
      this.$emit('change', e.target.value);
    },
  },
  props: {
    value: {
      type: String,
      default: '',
      required: false,
    },
    label: {
      type: [String, Number],
      default: '',
      required: false,
    },
    placeholder: {
      type: [String],
      default: '',
      required: false,
    },
    type: {
      type: String,
      default: 'text',
      required: false,
    },
    center: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
};
</script>

<style lang='scss' scoped>
@import 'variables';
.inputField {
  position: relative;
  &__label {
    color: $color_white;
    white-space: nowrap;
    font-size: inherit;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 0.2s ease all;
  }

  &__input {
    font-size: inherit;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-bottom: 1px solid $color_white;
    background: none;
    &--center {
      text-align: center;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  &__line {
    position: relative;
    display: block;
    &:after,
    &:before {
      position: absolute;
      content: '';
      height: 2px;
      width: 0;
      bottom: 0;
      background: $color_white;
      transition: 0.2s ease all;
    }
    &:before {
      left: 50%;
    }
    &:after {
      right: 50%;
    }
  }
  //Active
  &__input:focus ~ &__line:after,
  &__input:focus ~ &__line:before {
    width: 50%;
  }

  &__input:focus ~ &__label,
  &__input:valid ~ &__label {
    top: -20px;
    font-size: 14px;
    color: $color_white;
}
}
</style>
