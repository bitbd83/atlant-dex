// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.changePhone
  .changePhone__param Contact phone:
  .changePhone__row(v-if="step === 0")
    img.changePhone__imgFlag(:src="`/static/flags/${account.phone.countryCode}.png`")
    .changePhone__value +{{getCountryPhoneCode(account.phone.countryCode)}}{{account.phone.value}} #[Icon.changePhone__icon(v-if="account.phone.verified" id="verified")]
    .link.changePhone__action(:class="{'changePhone__action--empty' : isEmpty}" @click="changePhone") Change
    .link.changePhone__action(v-if="account.phone.value && !account.phone.verified" @click="verifyPhone") Verify
  .changePhone__row(v-if="step === 1")
    .changePhone__value
      FlagSwitch.changePhone__dropdown(v-model="country" type="phone")
      input.input.changePhone__input(v-model="phone")
    .link.changePhone__action(@click="setPhoneNumber") Save
    .link.changePhone__action(@click="setStep(0)") Cancel
  TFA(v-if="step === 2", :onCancel="cancelVerification", :onConfirm="finishVerification", :onResend="verifyPhone", :confirmType="1")
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import * as User from 'services/api/user';
// import {serverNotification} from 'services/notification';
import FlagSwitch from 'components/FlagSwitch';
import TFA from 'components/TFA';

export default {
  data() {
    return {
      phone: null,
      country: 'us',
      step: 0,
    };
  },
  computed: {
    ...mapGetters('geo', ['getCountryPhoneCode']),
    isEmpty() {
      return (this.account.phone.value === null && this.step === 0);
    },
    ...mapState('user', {
      account: 'account',
    }),
  },
  methods: {
    ...mapMutations('user', {
      setPhoneVerified: 'setPhoneVerified',
    }),
    ...mapActions('user', {
      setPhone: 'setPhone',
    }),
    setStep(step) {
      this.step = step;
    },
    changePhone() {
      // this.phone = this.account.phone.value ? this.account.phone.value.substring(getCountryPhoneCode(this.account.phone.countryCode).length) : '';
      this.phone = this.account.phone.value ? this.account.phone.value : '';
      this.country = this.account.phone.countryCode ? this.account.phone.countryCode : 'us';
      this.setStep(1);
    },
    setPhoneNumber() {
      this.setPhone({
        phone: this.getCountryPhoneCode() + this.phone,
        countryCode: this.country,
      }).then(() => {
        this.setPhoneVerified(false);
        this.setStep(2);
      });
    },
    verifyPhone() {
      this.setPhone({
        phone: this.account.phone.value,
        countryCode: this.account.phone.countryCode,
      }).then(() => {
        this.setStep(2);
      });
    },
    cancelVerification() {
      this.setStep(0);
    },
    finishVerification(code) {
      User.verifyPhone(code).then(() => {
        this.setPhoneVerified(true);
        this.setStep(0);
      });
    },
  },
  components: {
    FlagSwitch,
    TFA,
  },
};
</script>


<style lang="scss">
@import 'variables';

.index--dark .changePhone {
  &__param{
    color: $color__white;
  }
}

.changePhone {
  &__row {
    margin-top: 18px;
    height: 32px;
    display: flex;
    align-items: center;
  }
  &__param {
    font-weight: 700;
    font-size: 12px;
    color: $color__black;
    line-height: 19px;
    text-transform: uppercase;
    margin-bottom: 18px;
  }
  &__value {
    display: flex;
    align-items: center;
  }
  &__action {
    margin: 0 5px 0 19px;
    &--empty {
      margin-left: 0;
    }
  }
  &__dropdown {
    // width: 40px;
    // margin-right: 10px;
  }
  &__input {
    width: 180px;
    margin-left: 10px;
  }
  &__imgFlag {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    margin-right: 12px;
  }
  &__icon{
    $size: 13px;
    height: $size;
    width: $size;
    margin-left: 14px;
  }
}
</style>
