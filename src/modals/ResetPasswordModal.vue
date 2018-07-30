// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
ModalLayout(:step="step - 1", :isSuccess="isSuccess", title="Reset password")
  .reset
    .reset__content(v-if="step == 0")
      .reset__input
        .reset__inputTitle E-mail
        IInput(v-model="email")
      Checkbox.reset__checkbox(name="acknowledged", :value="true", color="white", v-model="acknowledged")
        .reset__checkboxText I acknowledge that my account will be locked for a minimum of 24 hours.
      BButton.reset__button(color="white" @click.native="reset()") Reset it now
      .reset__linkContainer
        span.link.link--white(@click="openModal({name: 'signIn'})") Sign in
        span.reset__linkSeparator or
        span.link.link--white(@click="openModal({name: 'signUp'})") Sign Up
        icon.reset__linkArrow(id="arrow_short")
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
  &__input {
    display: flex;
    margin-bottom: 75px;
  }
  &__inputTitle {
    margin-right: 18px;
    font-weight: 700;
    font-size: 16px;
    color: #FFFFFF;
  }
  &__checkbox {
    align-items: baseline !important;
    margin-bottom: 65px;
  }
  &__checkboxText {
    max-width: 325px;
    font-family: CenturyGothic;
    font-size: 12px;
    color: #FFFFFF;
    letter-spacing: 0.38px;
    line-height: 25px;
    margin-left: 43px;
  }
  &__button {
    font-size: 16px;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: 85px;
  }
  &__linkSeparator {
    font-weight: 400;
    font-size: 14px;
    color: #FFFFFF;
    text-align: center;
    margin: 0 24px;
  }
  &__linkArrow {
    display: inline-block;
    fill: $fill__white;
    width: 12px;
    height: 10px;
    margin-left: 20px;
    margin-top: 6px;
  }
  &__statusMsg {
    text-align: center;
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 900;
  }
}
</style>
