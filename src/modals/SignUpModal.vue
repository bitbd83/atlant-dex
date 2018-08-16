// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
ModalLayout(:step="step", :isSuccess="isSuccess" title="Sign up")
  .signup
    form.signup__content(v-if="step == 0"  @submit.prevent="signUpUser()")
      .signup__inputs
        .signup__input
          .signup__input-title E-mail
          IInput.signup__input-input(v-model="email", type="email")
        .signup__input
          .signup__input-title Password
          IInput.signup__input-input(v-model="password", type="password")
      .signup__checkboxContainer
        Checkbox.signup__checkbox(name="acknowledged", :value="true", v-model="iAgree", color="white")
          .signup__checkboxLabel I certify that I am 18 years of age or older, and I agree to the #[a.link.link--white.signup__agreeLink(href="#") User Agreement] and #[a.link.link--white.signup__agreeLink(href="#") Privacy Policy].
      BButton.signup__button(color="white" type="submit") Create account
      .signup__link(@click="openSignIn")
        span.link.link--white Sign in
        icon.signup__linkArrow(id="arrow_short")
    Status.signup__status(v-if="step == 1", :isSuccess="isSuccess", v-on:getBack="step = 0")
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
      isSuccess: false,
    };
  },
  computed: {
    parsePassword() {
      if (this.$v.$error) {
        if (this.$v.password.$error) {
          return this.$t('passwordValidation.tooShort', {minLength: this.$v.password.$params.minLength.min});
        } else if (this.$v.passwordRepeat.$error) {
          return this.$t('passwordValidation.notMatch');
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
      Membership.signup({
        email: this.email,
        password: this.password,
        termsaccepted: this.iAgree,
      }).then((res) => {
        this.step++;
        this.isSuccess = true;
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

.signup {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 522px;
  justify-content: center;

  &__title {
    font-size: 18px;
    font-weight: 900;
    text-transform: uppercase;
  }

  &__inputs {
    display: flex;
    margin-bottom: 75px;
  }
  &__input {
    display: flex;

    &:first-of-type {
      margin-right: 57px;
    }
    &-title {
      margin-right: 18px;
      font-weight: 700;
      font-size: 16px;
      color: $color__white;
    }

    &-input {
      width: 147px;
    }
  }

  &__checkboxContainer {
    margin-bottom: 65px;
    display: flex;
    justify-content: space-between;
  }

  &__checkbox {
    flex-direction: row;
    align-items: baseline !important;
  }

  &__checkboxLabel {
    max-width: 400px;
    font-family: CenturyGothic;
    font-size: 12px;
    color: $color__white;
    letter-spacing: 0.38px;
    line-height: 25px;
    margin-left: 42px;
  }

  &__agreeLink {
    font-size: 12px;
    &:after {
      bottom: -1px;
      height: 2px;
    }
  }

  &__button {
    display: block;
    width: 184px;
    margin-bottom: 82px;
    font-size: 16px;
    font-weight: 900;
    text-align: center;
    text-transform: uppercase;
  }

  &__link {
    cursor: pointer;
  }

  &__linkArrow {
     display: inline-block;
    fill: $fill__white;
    width: 12px;
    height: 10px;
    margin-left: 20px;
    margin-top: 6px;
  }
}
</style>
