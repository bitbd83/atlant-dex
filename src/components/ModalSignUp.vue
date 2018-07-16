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
  .singUp
    Icon.singUp__icon(id="signup")
    form.singUp__content(v-if="step == 0" @submit.prevent="signUpUser")
      .singUp__headerContent
        .singUp__title Sign up
        .singUp__other( @click="openSignIn") Sign in
      .singUp__blocks
        .singUp__block
          IInput.singUp__input(label="Email address", v-model="email")
          IInput.singUp__input(label="Choose a password", v-model="password",  type="password")
          IInput.singUp__input(label="Confirm password", v-model="passwordRepeat",  type="password")
          .singUp__hiddenError(v-show="parsePassword") {{parsePassword}}
        .singUp__block
          Checkbox.singUp__checkbox(name="acknowledged", :value="true", v-model="iAgree")
            span.singUp__iAgree I certify that I am 18 years of age or older, and I agree to the #[a.link(href="#") User Agreement] and #[a.link(href="#") Privacy Policy].
          BButton.singUp__button(color="malachite" rounded type="submit") Create account
      .singUp__other(@click="openSignIn") Sign in
    Status.singUp__status(v-if="step == 1")
      .singUp__statusMsg Completed
</template>

<script>
import {required, sameAs, minLength} from 'vuelidate/lib/validators';
import {mapMutations} from 'vuex';
import {serverNotification} from 'services/notification';
import * as Membership from 'services/api/membership';
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
      passwordRepeat: '',
      iAgree: false,
      step: 0,
    };
  },
  computed: {
    parsePassword() {
      if (this.$v.$error) {
        if (this.$v.password.$error) {
          return this.$.t('passwordValidation.tooShort', {minLength: this.$v.password.$params.minLength.min});
        } else if (this.$v.passwordRepeat.$error) {
          return this.$.t('passwordValidation.notMatch');
        }
      }
      return '';
    },
  },
  methods: {
    ...mapMutations('modal', {
      open: 'open',
    }),
    openSignIn() {
      this.open({
        name: 'signIn',
      });
    },
    signUpUser() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      };
      Membership.signup({
        email: this.email,
        password: this.password,
        termsaccepted: this.iAgree,
      }).then((res) => {
        this.step++;
      }).catch((error) => {
        serverNotification(error);
      });
    },
  },
  components: {
    Checkbox,
    ModalLayout,
    BButton,
    IInput,
    Status,
  },
  validations: {
    password: {
      required,
      minLength: minLength(8),
    },
    passwordRepeat: {
      sameAsPassword: sameAs('password'),
    },
  },
};
</script>

<style lang="scss">
@import 'variables';

.singUp {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  max-width: 522px;
  margin: auto;
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
  &__blocks {
    display: flex;
    flex-direction: space-between;
    justify-content: space-between;
  }

  &__block {
    width: 45%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__inputs {

    display: flex;
    flex-direction: column;
    & > * {
      flex-basis: 40%;
      margin-bottom: 50px;
    }
  }
  &__input {
    &:not(:last-child){
      margin-bottom: 40px;
    }
  }
  &__hiddenError {
    color: #f33a3a;
    margin-top: -14px;
  }
  &__checkbox {
    align-items: flex-start !important;
  }

  &__iAgree {
    margin-left: 29px;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
  }
  &__button {
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
