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
.widgets
  .widgets__button(:class="buttonClass" @click="toggleDropdown()")
    Icon.widgets__icon(:class="iconClass" id="plus")
    // transition(name="widgets__transition" @enter="transitionEnter" @leave="transitionLeave")
    .widgets__dropdowns(ref="widget__drops", :class="dropdownClass")
      TheHeaderWidgetsDropdown
  .widgets__label Widgets
</template>

<script>
import TheHeaderWidgetsDropdown from './TheHeaderWidgetsDropdown';

export default {
  data() {
    return {
      showDropdown: false,
    };
  },
  computed: {
    buttonClass() {
      return (this.showDropdown) ? 'widgets__button--active' : '';
    },
    dropdownClass() {
      return (this.showDropdown) ? 'widgets__dropdowns--open' : '';
    },
    iconClass() {
      return (this.showDropdown) ? 'widgets__icon--outside' : '';
    },
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
      if (this.showDropdown) {
        setTimeout(() => {
          if (this.showDropdown) {
            this.$refs.widget__drops.style.overflow = 'visible';
          }
        }, 1000);
      } else {
        this.$refs.widget__drops.style.overflow = 'hidden';
      }
    },
  },
  components: {
    TheHeaderWidgetsDropdown,
  },
};
</script>

<style lang="scss">
@import 'variables';

.widgets {
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  &__button {
    display: flex;
    align-items: center;
    height: 35px;
    width: 35px;
    padding: 13px;
    border-radius: 3px;
    background-color: $background__blue;
    cursor: pointer;
    transition: width .5s ease-out;
    &--active {
      width: 360px;
      transition: width .5s ease-out;
    }
  }
  &__icon {
    width: 9px;
    height: 9px;
    fill: $fill__white;;
    transition: margin .5s ease-out;
    &--outside {
      margin-left: -50px;
      margin-right: 28px;
      fill: $fill__blue;
    }
  }
  &__dropdowns {
    width: 100%;
    opacity: 0;
    // display: none;
    overflow: hidden;
    transition: opacity .5s .5s linear;
    &--open {
      //overflow: visible;
      opacity: 1;
      transition: opacity .5s .5s linear;
    }
  }
  &__label {
    margin-left: 25px;
    text-transform: uppercase;
  }
}
</style>
