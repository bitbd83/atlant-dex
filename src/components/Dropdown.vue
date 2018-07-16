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
  VSelect.dropdown(
    :class="{'dropdown--noBorder': noBorder, 'dropdown--noPadding': noPadding, 'dropdown--underline': underline}",
    :options="$_options",
    placeholder="",
    :show-labels="false",
    :allow-empty="false",
    :value="$_value",
    :track-by="$_trackBy",
    :searchable="searchable",
    @input="onChange",
    v-bind="$attrs",
  )
    span.multiselect__placeholder(slot="placeholder") {{placeholder}}
    span(slot="noResult") No Results
    template(v-for="(value, slotName) in $scopedSlots", :slot="slotName",  slot-scope="props")
      slot(:name="slotName" v-bind="props")
</template>

<script>
import VSelect from 'vue-multiselect';

export default {
  name: 'CommonSelect',
  computed: {
    isOptionsObject() {
      return this.options && typeof this.options === 'object' && !Array.isArray(this.options);
    },
    $_options() {
      if (this.isOptionsObject) {
        return Object.keys(this.options).map((key) => {
          if (typeof this.options[key] === 'object') {
            return {...this.options[key], keyValue: key};
          } else {
            return {label: this.options[key], keyValue: key};
          }
        });
      }
      return this.options;
    },
    $_value() {
      if (this.isOptionsObject) {
        return this.options[this.value];
      } else if (this.trackBy) {
        return this.options.find((opt) => opt[this.trackBy] === this.value);
      }
      return this.value;
    },
    $_trackBy() {
      if (this.isOptionsObject) {
        return 'keyValue';
      }
      return this.trackBy;
    },
  },
  methods: {
    onChange(val) {
      let value = val;
      if (this.isOptionsObject) {
        value = val.keyValue;
      } else if (this.trackBy) {
        value = val[this.trackBy];
      }
      this.$emit('input', value);
    },
  },
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: '-',
    },
    options: [Array, Object],
    trackBy: String,
    searchable: {
      type: Boolean,
      default: false,
    },
    noBorder: Boolean,
    noPadding: Boolean,
    underline: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {
    VSelect,
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import 'variables';

  .dropdown {
    &--noBorder /deep/ .multiselect__tags {
      border: none;
    }
    &--noPadding /deep/ .multiselect {
      &__tags {
        padding: 0 19px 0 0;
      }
      &__select {
        padding:  0 0 0 9px;
      }
    }
    &--underline /deep/ .multiselect {
      &__tags {
        &:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 3px;
          bottom: -7px;
          background: $background__white;
          transition: transform .3s ease-in;
          transform: scale3d(1,1,1);
        }

        &:hover:after {
          transition: transform .3s ease-out;
          transform: scale3d(0,1,1);
        }
      }
    }
  }

  .multiselect {
    color: $color_white;
    cursor: pointer;
    display: block;
    outline: 0;
    position: relative;
    text-align: left;
    margin-right: 28px;
    &--active /deep/ &__tags {
      border-color: $input-border-color-highlight;
    }

    /deep/ & {
      &__input {
        background: transparent;
        border-radius: 0;
        border: none;
        box-sizing: border-box;
        display: inline-block;
        line-height: 1em;
        margin: 0;
        min-height: 1em;
        padding: 0;
        position: relative;
        transition: border .1s ease;
        vertical-align: middle;
        width: 100%;

        &::placeholder {
          color: $input-placeholder-color;
        }
      }

      &__placeholder {
        color: $input-placeholder-color;
      }

      &__tags {
        align-items: center;
        background: transparent;
        display: flex;
        font-size: 14px;
        font-weight: 500;
        transition: $input-transition;
        padding: 0 !important;
      }

      &__content-wrapper {
        position: absolute;
        top: calc(100% + 4px);
        overflow: auto;
        display: block;
        background: $color-white;
        min-width: 100%;
        // max-height: 240px;
        z-index: 3;
        color: #00354D;
      }

      &__content {
        list-style: none;
        display: inline-block;
        padding: 0;
        margin: 0;
        min-width: 100%;
        vertical-align: top;
      }

      &__option {
        align-items: center;
        cursor: pointer;
        color: $input-option-color;
        display: flex;
        line-height: 16px;
        min-height: 32px;
        padding: $input-padding;
        padding-left: 20px;
        position: relative;
        text-decoration: none;
        text-transform: none;
        vertical-align: middle;
        transition: all .2s;
        white-space: nowrap;
        &--highlight {
          background-color: #eee;
          color: $input-option-highlight-color;
        }

        &--selected {
          &:before {
            border: solid $input-option-color;
            border-width: 0 2px 2px 0;
            content: '';
            display: block;
            height: 8px;
            left: 8px;
            position: absolute;
            transform: rotate(45deg);
            width: 4px;
          }
        }
      }

      &__select {
        position: absolute;
        height: 100%;
        right: -28px;
        top: 0;
        padding: 0 9px;
        transition: transform .2s ease;
        display: flex;
        align-items: center;
        &:before {
          content: "";
          border-style: solid;
          border-width: 9px 6px 0;
          border-color: $color__blue transparent transparent;
        }
      }

      &__spinner {
        display: block;
        height: 16px;
        position: absolute;
        right: 6px;
        width: 16px;

        &:before,
        &:after {
          position: absolute;
          content: "";
          top: 50%;
          left: 50%;
          margin: -8px 0 0 -8px;
          width: 16px;
          height: 16px;
          border-radius: 100%;
          border-color: #ffc600 transparent transparent;
          border-style: solid;
          border-width: 2px;
          box-shadow: 0 0 0 1px transparent;
        }

        &:before {
          animation: spinning 2.4s  cubic-bezier(.41,.26,.2,.62);
          animation-iteration-count: infinite;
        }
        &:after {
          animation: spinning 2.4s cubic-bezier(.51,.09,.21,.8);
          animation-iteration-count: infinite;
        }
      }
    }
}
@keyframes spinning {
  from { transform:rotate(0) }
  to { transform:rotate(2turn) }
}
</style>
