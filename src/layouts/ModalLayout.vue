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
transition(name="modal__anim")
  .modal(v-scrollbar="")
    .modal__overlay(@click="closeModal()")
    .modal__main
      .modal__body(:class="[`modal__body--${screenType}`]")
        Icon.modal__closeIcon(id="close"  @click="closeModal()")
        .modal__content
          slot
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import {scrollbar} from '@/directives';

export default {
  computed: {
    ...mapState('misc', {
      screenType: 'screenType',
    }),
  },
  methods: {
    ...mapMutations('modal', {
      close: 'close',
    }),
    closeModal() {
      this.close();
      this.onClose();
    },
  },
  props: {
    onClose: {
      type: Function,
      required: false,
      default: () => {},
    },
  },
  directives: {
    scrollbar,
  },
};
</script>

<style lang="scss" scoped>
@import '~perfect-scrollbar/dist/css/perfect-scrollbar';
@import 'variables';
$padding: 40px;

.modal {
  position: fixed;
  display: flex;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 888;
  overflow: visible;
  &__overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(0,0,0,0.40);
  }
  &__main {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  &__body {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 407px;
    // min-height: 600px;
    padding: $padding;
    margin: auto;
    border-radius: 12px;
    z-index: 801;
    box-shadow: 0 25px 20px rgba(0, 0, 0, 0.24);
    background-image: repeating-linear-gradient(
      135deg,
      #002338,
      #002338 45px,
      #0d2e41 0,
      #0d2e41 80px
    )
  }
  &__closeIcon {
    z-index: 801;
    top: -30px;
    right: -30px;
    width: 32px;
    height: 32px;
    position: absolute;
    cursor: pointer;
    transition: transform .5s;
    &:hover {
      transition: transform .5s;
      transform: scale(1.1);
    }
  }
  &__cross {
    display: none;
  }
  &__anim-enter,
&__anim-leave-active {
opacity: 0;
}

&__anim-enter-active,
&__anim-leave-active {
transition: opacity .4s ease;
}
}
</style>
