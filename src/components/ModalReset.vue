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
  .reset
    Icon.reset__icon(id="pass")
    .reset__content(v-if="step == 0")
      .reset__headerContent
        .reset__title Reset password
        .reset__other(href="#" @click="openModal({name: 'signIn'})") Sign in
      .reset__inputs
        IInput.reset__input(label="Email address", v-model="email")
        Checkbox.reset__checkbox(name="acknowledged", :value="true", v-model="acknowledged")
          .reset__checkboxText I acknowledge that my account will be locked for a minimum of 24 hours.
      BButton.reset__button(color="malachite" rounded @click.native="reset()") Reset now
    .reset__other(href="#" @click="openModal({name: 'signIn'})") Sign in
    TFA(v-if="step == 1", :onConfirm="confirmReset", :onResend="reset", :onCancel="cancelReset", :isModal="true")
    Status.reset__status(v-if="step == 2")
      .reset__statusMsg Completed
</template>

<script>
import {mapMutations} from 'vuex';
import * as Membership from 'services/api/membership';
import ModalLayout from '@/layouts/ModalLayout';
import Checkbox from 'components/Checkbox';
import BButton from 'components/BButton';
import IInput from 'components/IInput';
import TFA from 'components/TFA';
import Status from 'components/Status.vue';
import {serverNotification} from 'services/notification';

export default {
  data() {
    return {
      email: '',
      acknowledged: false,
      step: 0,
      isSuccess: false,
    };
  },
  methods: {
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    ...mapMutations('user', {
      setTFAMethod: 'setTFAMethod',
    }),
    reset() {
      Membership.requestPasswordRestore(this.email).then((response) => {
        this.setTFAMethod({method: response.data.twoFactorAuthenticationMethod});
        this.step = 1;
      }).catch((res) => {
        serverNotification(res);
      });
    },
    cancelReset() {
      this.step = 0;
    },
    confirmReset(code) {
      Membership.validatePasswordRestore({code: code, email: this.email}).then(() => {
        this.step = 2;
      }).catch((res) => {
        serverNotification(res);
      });
    },
  },
  components: {
    ModalLayout,
    Checkbox,
    BButton,
    IInput,
    TFA,
    Status,
  },
};
</script>

<style lang="scss">
@import 'variables';

.reset {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  &__icon {
    $size: 77px;
    width: $size;
    height: $size;
    fill: $color_yellow;
    margin-bottom: 50px;
  }
  &__headerContent {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 50px;
  }
  &__title {
    font-size: 18px;
    font-weight: 900;
    text-transform: uppercase;
  }
  &__other {
    $color: #f7b933;
    color: $color;
    font-size: 14px;
    position: relative;
    font-weight: 700;
    cursor: pointer;
    &::after {
      content: "";
      height: 3px;
      width: 100%;
      bottom: -5px;
      left: 0;
      position: absolute;
      background-color: $color;
    }
  }
  &__inputs {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    & > * {
      flex-basis: 45%;
      margin-bottom: 50px;
    }
  }
  &__checkbox {
    align-items: flex-start !important;
  }
  &__checkboxText {
    margin-left: 20px;
  }
  &__button {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    font-size: 16px;
    font-weight: 900px;
    text-transform: uppercase;
  }
  &__statusMsg {
    text-align: center;
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 900;
  }
}
</style>
