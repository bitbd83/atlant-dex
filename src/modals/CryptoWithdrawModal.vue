// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
ModalLayout(:title="`${$t('crypto.withdraw.withdraw')} ${data.currency}`", :step="step", :isSuccess="isSuccess",)
  .cryptoWithdraw
    icon.cryptoWithdraw__angle(id="angle-top-left")
    .cryptoWithdraw__content(v-if="step == 0")
      .cryptoWithdraw__inputContainer
        IInput(:placeholder="data.currency + ' ' + $t('crypto.withdraw.placeholderAddress')", v-model="address").cryptoWithdraw__input
      .cryptoWithdraw__inputContainer
        IInput.cryptoWithdraw__input(:placeholder="data.currency  + ' ' + $t('crypto.withdraw.placeholderAmount')", type="number", v-model="amount")
        .cryptoWithdraw__fee {{$t('crypto.withdraw.fee')}}: #[span.cryptoWithdraw__feeAmt {{fee}} {{data.currency}}]
      .cryptoWithdraw__amountText {{$t('crypto.withdraw.text')}} {{data.currency}}:
      .link.link--white.cryptoWithdraw__amount  {{netAmount}}
      BButton.cryptoWithdraw__button(color="malachite" rounded  @click.native="withdraw") {{$t('crypto.withdraw.button')}}
    TFA(v-if="step == 1", :onConfirm="tryConfirmation", :onCancel="cancelConfirmation", :onResend="withdraw", :isModal="true")
    Status.cryptoWithdraw__status(v-if="step === 2", :isSuccess="isSuccess", :successText="successText", v-on:getBack="step--")
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import * as User from 'services/api/user';
import BButton from 'components/BButton';
import IInput from 'components/IInput';
import ModalLayout from '@/layouts/ModalLayout';
import TFA from 'components/TFA';
import Status from 'components/Status.vue';

export default {
  data() {
    return {
      address: '',
      amount: '',
      step: 0,
      fee: 0.00017,
      transId: '',
      isSuccess: false,
    };
  },
  computed: {
    ...mapState('modal', {
      data: 'data',
    }),
    netAmount() {
      return Math.max(this.amount - this.fee, 0);
    },
    successText() {
      return `${this.amount} ${this.data.currency} has been successfully sent to the address provided`;
    },
  },
  methods: {
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    clearData() {
      this.transId = '';
    },
    setStep(step) {
      this.step = step;
    },
    withdraw() {
      User.withdraw({
        currency: this.data.currency,
        amount: this.amount,
        address: this.address,
      }).then((response) => {
        this.transId = response.data.transactionId;
        this.setStep(1);
      });
    },
    tryConfirmation(code) {
      User.confirmWithdraw({
        currency: this.data.currency,
        transactionId: this.transId,
        code,
      }).then(() => {
        this.setStep(2);
        this.isSuccess = true;
      });
    },
    cancelConfirmation() {
      this.setStep(0);
      this.clearData();
    },
  },
  created() {
    if (this.data.address) this.address = this.data.address;
    if (this.data.amount) this.amount = this.data.amount;
  },
  components: {
    ModalLayout,
    BButton,
    IInput,
    Status,
    TFA,
  },
};
</script>

<style lang="scss">
@import "variables";

.cryptoWithdraw {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 88px;

  &__angle {
    position: absolute;
    top: 0;
    left: 0;
    width: 17px;
    height: 16.26px;
    fill: $fill__white;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
  }

  &__inputContainer {
    margin-bottom: 48px;
    width: 100%;
  }

  &__input {
    width: 100%;
    input {
      &::placeholder {
        color: #6895FF !important;
      }
    }

  }
  &__amountText {
    font-size: 14px;
    color: $color__white;
    text-align: center;
    line-height: 26px;
    margin-bottom: 22px;
  }
  &__amount {
    cursor: default;
    font-size: 20px;
    color: $color__white;
    text-align: center;
    line-height: 26px;
    margin-bottom: 65px;
  }
  &__button {
    color: $color__blue !important;
    text-transform: uppercase;
  }
  &__fee {
    margin-top: 15px;
    font-size: 14px;
    color: $color__white;
    line-height: 26px;
  }
  &__feeAmt {
    font-weight: 700;
  }
  &__currency {
    text-transform: uppercase;
  }
}
</style>
