// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
ModalLayout(:step="step", :isSuccess="isSuccess" title="Sign in")
  .singIn
    form.singIn__content(v-if="step == 0"  @submit.prevent="signIn()")
      .singIn__inputs
        .singIn__input
          IInput.singIn__input-input(v-model="email", label="E-mail", type="email")
        .singIn__input
          IInput.singIn__input-input(v-model="password", label="Password", type="password")
      .singIn__checkboxContainer
        Checkbox.singIn__checkbox(name="remember", :value="true", color="white" v-model="remember")
          .link.link--white.singIn__checkboxLabel Remember me
        span.link.link--white(@click="openResetPassword") Forgot password?
      BButton.singIn__button(color="white" type="submit") Let me in
      .singIn__link(@click="openSignUp")
        span.link.link--white Sign up
        icon.singIn__link-arrow(id="arrow_short")
    Status.singIn__status(v-if="step == 1", :isSuccess="isSuccess", successText="Signed in successfully", v-on:getBack="step = 0")
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
    openResetPassword() {
      this.openModal({
        name: 'reset',
      });
    },
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
        this.step = 1;
        this.isSuccess = true;
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
};
</script>

<style lang="scss">
@import 'variables';

.singIn {
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
    margin-bottom: 90px;
  }
  &__input {
    display: flex;

    &:first-of-type {
      margin-right: 57px;
    }

    input {
      width: 147px;
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
  &__checkboxContainer {
    margin-bottom: 82px;
    display: flex;
    justify-content: space-between;
  }
  &__checkbox {
    flex-direction: row;
    align-items: center
  }
  &__checkboxLabel {
    font-weight: 400;
    font-size: 14px;
    color: $color__white;
    margin-left: 47px;

  }

  &__link {
    cursor: pointer;
    &-arrow {
      display: inline-block;
      fill: $fill__white;
      width: 12px;
      height: 10px;
      margin-left: 20px;
      margin-top: 6px;
    }
  }
}
</style>
