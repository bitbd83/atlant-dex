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
  .singIn
    Icon.singIn__icon(id="signin")
    form.singIn__content(v-if="step == 0"  @submit.prevent="signIn()")
      .singIn__headerContent
        .singIn__title Sign in
        .singIn__other( @click="openSignUp") Sign up
      .singIn__inputs
        IInput.singIn__input(label="Email", v-model="email", type="email")
        IInput.singIn__input(label="Password", v-model="password", type="password")
      .singIn__checkboxContainer
        Checkbox.singIn__checkbox(name="remember", :value="true", v-model="remember")
          .singIn__checkboxLabel Remember me
      BButton.singIn__button(color="malachite" rounded type="submit") Let me in
      .singIn__forgot #[a.link(href="#" @click="openModal({name: 'reset'})") Forgot password?]
    Status.singIn__status(v-if="step == 1", :isSuccess="isSuccess")
      .singIn__statusMsg {{ isSuccess ? 'Completed' : 'Failed' }}
</template>

<script>
import {mapMutations, mapActions} from 'vuex';
import Checkbox from 'components/Checkbox';
import BButton from 'components/BButton';
import ModalLayout from '@/layouts/ModalLayout';
import IInput from 'components/IInput';
import Status from 'components/Status.vue';

export default {
  data() {
    return {
      email: '',
      password: '',
      remember: false,
      step: 0,
      isSuccess: false,
    };
  },
  methods: {
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    ...mapActions('membership', {
      login: 'login',
    }),
    openSignUp() {
      this.openModal({
        name: 'signUp',
      });
    },
    signIn() {
      this.login({
        email: this.email,
        password: this.password,
      }).then(() => {
        this.finishTransaction();
      });
    },
    finishTransaction() {
      this.step = 1;
      this.isSuccess = true;
    },
  },
  components: {
    Checkbox,
    ModalLayout,
    BButton,
    IInput,
    Status,
  },
};
</script>

<style lang="scss">
@import 'variables';

.singIn {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 522px;
  justify-content: space-between;
  &__icon {
    $size: 77px;
    width: $size;
    height: $size;
    fill: $color_yellow;
    margin: auto;
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

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  }
  &__inputs {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    & > * {
      flex-basis: 40%;
      margin-bottom: 50px;
    }
  }
  &__input {
    width: 100%;
    max-width: 400px;
  }
  &__button {
    display: block;
    margin: auto;
    min-width: 130px;
    align-items: center;
    margin-bottom: 40px;
    font-size: 16px;
    font-weight: 900;
    text-align: center;
    text-transform: uppercase;
  }
  &__checkboxContainer {
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
  }
  &__checkbox {
    flex-direction: column;
  }
  &__checkboxLabel {
    margin-top: 21px;
    font-size: 14px;
    font-weight: 400;
  }
  &__forgot {
    display: block;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
  }
  &__statusMsg {
    text-align: center;
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 900;
  }
}
</style>
