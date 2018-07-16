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
  ModalLayout
    .tfaWarning
      .tfaWarning__title {{$t('tfaSecureWarning.title')}}
      Icon.tfaWarning__icon(id="statusFailed")
      .tfaWarning__text {{$t('tfaSecureWarning.text')}}
      BButton(
        rounded,
        caps,
        @click="onYesClick",
      ) {{$t('tfaSecureWarning.yesButton')}}
      .tfaWarning__link(
        role="button",
        @click="onNoClick",
      ) {{$t('tfaSecureWarning.noButton')}}
</template>

<script>
import {mapMutations, mapActions} from 'vuex';
import ModalLayout from '@/layouts/ModalLayout';
import BButton from 'components/BButton';

export default {
  name: 'TFAWarningModal',
  methods: {
    ...mapMutations('modal', {
      closeModal: 'close',
    }),
    ...mapActions('page', [
      'getOpenPage',
    ]),
    onYesClick() {
      this.closeModal();
      this.getOpenPage('securitySettings');
    },
    onNoClick() {
      this.closeModal();
    },
  },
  components: {
    ModalLayout,
    BButton,
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .tfaWarning {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 95vh;
    justify-content: space-around;
    max-height: 600px;
    text-align: center;

    &__title {
      color: #ffc600;
      font-size: 18px;
      font-weight: 900;
      text-transform: uppercase;
    }
    &__iconWrap {
      text-align: center;
    }
    &__icon {
      display: inline-block;
      height: 111px;
      width: 111px;
    }
    &__text {
      color: #fff;
      font-size: 20px;
      line-height: 35px;
      font-weight: 300;
      max-width: 400px;
    }
    &__link {
      $color: #f7b933;
      color: $color;
      cursor: pointer;
      display: inline-block;
      font-size: 14px;
      font-weight: 700;
      position: relative;
      &::after {
        background-color: $color;
        bottom: -8px;
        content: "";
        height: 3px;
        left: 0;
        position: absolute;
        width: 100%;
      }
    }
  }
</style>
