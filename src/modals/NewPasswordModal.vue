// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
ModalLayout(:step="step", :isSuccess="isSuccess", title="Reset password")
  .newPassword
    form.newPassword__content(v-if="step == 0" @submit.prevent="finishPasswordReset()")
      .newPassword__headerContent
      .newPassword__inputs
        IInput.newPassword__input(v-if="showSymbols" label="New password" v-model="passwordNew")
        IInput.newPassword__input(v-else label="New password" v-model="passwordNew" type="password")
        IInput.newPassword__input(v-if="showSymbols" label="Repeat" v-model="passwordRepeat")
        IInput.newPassword__input(v-else label="Repeat" v-model="passwordRepeat" type="password")
      .newPassword__checkboxContainer
        Checkbox.newPassword__checkbox(name="showSymbols", :value="true", color="white" v-model="showSymbols")
          .link.link--white.newPassword__checkboxLabel {{$t('modals.display_symbols')}}
      BButton.newPassword__button(color="white" type="submit") {{$t('modals.reset_now')}}
    Status.newPassword__status(v-if="step == 1", :isSuccess="isSuccess", v-on:getBack="step--")
</template>

<script>
import {mapState} from 'vuex';
import * as Membership from 'services/api/membership';
import {serverNotification} from 'services/notification';
import Checkbox from 'components/Checkbox';
import BButton from 'components/BButton';
import ModalLayout from '@/layouts/ModalLayout';
import IInput from 'components/IInput';
import Status from 'components/Status.vue';

export default {
  data() {
    return {
      passwordNew: '',
      passwordRepeat: '',
      showSymbols: false,
      step: 0,
      isSuccess: false,
    };
  },
  computed: {
    ...mapState('modal', {
      data: 'data',
    }),
  },
  methods: {
    finishPasswordReset() {
      Membership.finishPasswordRestore({
        newpassword: this.passwordNew,
        confirmedpassword: this.passwordRepeat,
        code: this.data.code,
      }).then(() => {
        this.step = 1;
        this.isSuccess = true;
      }).catch((res) => {
        this.step = 1;
        serverNotification(res);
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

.newPassword{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  &__content {
    width: 100%;
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
      width: 147px !important;
    }
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
}
</style>
