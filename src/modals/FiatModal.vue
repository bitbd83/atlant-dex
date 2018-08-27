// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
ModalLayout(:step="step", :isSuccess="isSuccess", :title="title + ' ' + data.currency")
  .fiat
    .fiat__balance(v-if="step == 0") {{data.isDeposit ? 'Current balance' : 'Available'}}: #[span.fiat__balanceAmt {{balance.toFixed(2)}} {{data.currency}}]
    .fiat__content(v-if="step == 0")
      .fiat__block.fiat__block--left
        .fiat__step.fiat__step--1
          .fiat__stepNumber STEP 1:
          .fiat__stepText Choose {{transactionType}} method
        .fiat__optionsContainer
          .fiat__options(v-scrollbar="")
            Radio.fiat__option(v-for="(method, index) in paymentMethods", :key="index", name="paymentSys", :value="method.paymentName" v-model="CheckedPaymentSystem" isWhite="" :checked="method.paymentName == CheckedPaymentSystem")
              img.fiat__systemLogo(:src="method.logo", :class="{'fiat__systemLogo--checked': method.paymentName === CheckedPaymentSystem}")
        .fiat__bottom
          div.fiat__separator ***
          p(v-if="data.isDeposit") Your funds will be held for 24 hours.
          p(v-else) Withdrawals may take up to 24 hours.
          p Operations are carried out with a commission with which you can in a special section.
      .fiat__block.fiat__block--right
        .fiat__step.fiat__step--2
          .fiat__stepNumber STEP 2:
          .fiat__stepText Enter {{data.isDeposit ? 'fiat code or the desired topup amount:' : 'the desired withdrawal amount:'}}
        IInput.fiat__input(:placeholder="'Amount for ' + transactionType", v-model="amount", type="number")
        .fiat__fee Fee: {{fee}}%
        .fiat__toReceive
          span You will receive:
          span.fiat__receiveAmt {{newBalance.toFixed(2)}} {{data.currency}}
        IInput.fiat__input(placeholder="Contact information" v-model="contact")
        IInput.fiat__input(placeholder="Comment" v-model="comment")
        BButton.fiat__button(color="malachite" rounded @click="makeDeposit()", :disabled="!valid") {{data.isDeposit ? 'TOPUP BALANCE' : 'WITHDRAW'}}
    Status.fiat__status(v-if="step == 1", :isSuccess="isSuccess", v-on:getBack="step--")
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex';
import {getFee, getBalance} from 'services/tradeInfo';
import {scrollbar} from '@/directives';
import ModalLayout from '@/layouts/ModalLayout';
import BButton from 'components/BButton';
import IInput from 'components/IInput';
import Radio from 'components/Radio';
import Status from 'components/Status.vue';
import * as User from 'services/api/user';
import sepaLogo from '@/assets/images/PaymentServices/logo-sepa.png';
import swiftLogo from '@/assets/images/PaymentServices/logo-swift.png';

export default {
  data() {
    return {
      step: 0,
      isSuccess: false,
      amount: '',
      paymentMethods: [
        {
          'paymentName': 'sepa',
          'logo': sepaLogo,
        },
        {
          'paymentName': 'swift',
          'logo': swiftLogo,
        },
      ],
      CheckedPaymentSystem: 'sepa',
      contact: '',
      comment: '',
    };
  },
  computed: {
    ...mapState('modal', {
      data: 'data',
    }),
    ...mapState('user', ['transactionFees']),
    balance() {
      return getBalance(this.data.currency);
    },
    fee() {
      return getFee(this.data.currency, this.data.isDeposit);
    },
    title() {
      return (this.data.isDeposit) ? 'deposit' : 'withdraw';
    },
    transactionType() {
      return (this.data.isDeposit) ? 'deposit' : 'withdrawal';
    },
    newBalance() {
      return this.balance + ((this.data.isDeposit) ? this.amount * (1 - this.fee / 100) : - this.amount * (1 + this.fee / 100));
    },
    valid() {
      return parseInt(this.amount) || 0 > 0;
    },
  },
  methods: {
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    ...mapActions('user', {
      deposit: 'deposit',
    }),
    ...mapActions('user', ['getFee']),

    getPaymentMethods(array) {
      return array.map((item) => item.paymentName);
    },
    makeDeposit() {
      if (!this.valid) {
        return false;
      }
      if (this.data.isDeposit) {
        User.depositRequest({
          amount: this.amount,
          currency: this.data.currency,
          paymentSystem: this.CheckedPaymentSystem,
        })
        .then(
          (result) => {
            this.step++;
          }
        );
      } else {
        let methods = ['withdrawSwift', 'withdrawSepa'];
        let method = methods[this.CheckedPaymentSystem];

        User[method]({
          amount: this.amount,
          currency: this.data.currency,
        })
        .then(
          (result) => {
            console.log('withdraw', result);
          }
        );
      }
    },
  },
  directives: {
    scrollbar,
  },
  components: {
    ModalLayout,
    BButton,
    IInput,
    Radio,
    Status,
  },
};
</script>

<style lang="scss">
@import 'variables';

.fiat {
  display: flex;
  flex-direction: column;
  width: 100%;
  &__balance {
    font-size: 14px;
    color: $color__white;
    line-height: 26px;
    margin-left: auto;
    margin-bottom: 98px;
  }
  &__balanceAmt {
    position: relative;
    font-size: 20px;
    color: $color__white;
    text-align: right;
    line-height: 26px;
    margin-left: 67px;
    &:after {
      position: absolute;
      content: '';
      left: 0;
      right: 0;
      bottom: -9px;
      height: 3px;
      background: #fff;
    }
  }
  &__content{
    display: flex;
  }
  &__block{
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 400px;
    &--left{
      &:after {
        content: '';
        position: absolute;
        top: -15px;
        bottom: -15px;
        right: 0px;
        width: 1px;
        background: url('~assets/images/border-vertical-white.png');
      }
      padding-right: 60px;
    }
    &--right{
      padding-left: 60px;
    }
  }
  &__step {
    display: flex;
    // max-width: 280px;
    font-weight: 700;
    font-size: 16px;
    line-height: 26px;
    color: $color__white;

    &--1 {
      margin-bottom: 58px;
    }

    &--2 {
      margin-bottom: 20px;
    }
  }

  &__stepNumber {
    white-space: nowrap;
    margin-right: 17px;
  }
  &__optionsContainer {
    display: flex;
    position: relative;
    flex: 2;
  }
  &__options {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    justify-content: space-between;
    align-items: baseline;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
    padding-right: 15px;
  }
  &__option{
    flex-grow: 50%;
    margin-bottom: 20px;
  }
  &__systemLogo {
    margin-left: 21px;
    opacity: .41;
    transition: opacity .3s;
    &--checked {
      opacity: 1;
      transition: opacity .3s;
    }
  }
  &__bottom {
    // margin-top: auto;
    font-family: "Century Gothic";
    font-size: 12px;
    color: $color__white;
    letter-spacing: 0.5px;
    line-height: 20px;
  }
  &__separator {
    margin-bottom: 20px;
  }
  &__note {
    font-size: 12px;
    line-height: 20px;
    margin-top: 15px;
  }
  &__input {
    margin-top: 20px;
    margin-bottom: 15px;
  }
  &__fee {
    font-size: 14px;
    color: $color__white;
    line-height: 26px;
    margin-bottom: 15px;
  }
  &__toReceive {
    display: flex;
    font-size: 14px;
    color: $color__white;
    line-height: 26px;
    margin-bottom: 30px;
    white-space: nowrap;
  }
  &__receiveAmt {
    font-size: 20px;
    color: $color__white;
    text-align: right;
    line-height: 26px;
    margin-left: auto;
  }
  &__button{
    text-transform: uppercase;
    width: 176px;
    margin-top: 47px;
  }
}
</style>
