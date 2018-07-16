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
.changePhone
  .changePhone__param Contact phone:
  .changePhone__row(v-if="step === 0")
    .changePhone__value {{this.account.phone.value}} #[Icon.changePhone__icon(v-if="account.phone.verified" id="verified")]
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
import {mapState, mapMutations, mapActions} from 'vuex';
import * as User from 'services/api/user';
import {getCountryCode} from 'services/countries';
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
    isEmpty() {
      return (this.account.phone.value === null && this.step === 0);
    },
    ...mapState('user', {
      account: 'account',
    }),
    getCountryCode() {
      return getCountryCode(this.country);
    },
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
      this.phone = this.account.phone.value ? this.account.phone.value.substring(getCountryCode(this.account.phone.countryCode).length) : '';
      this.country = this.account.phone.countryCode ? this.account.phone.countryCode : 'us';
      this.setStep(1);
    },
    setPhoneNumber() {
      this.setPhone({
        phone: this.getCountryCode + this.phone,
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
.changePhone {
  &__row {
    margin-top: 18px;
    height: 32px;
    display: flex;
    align-items: center;
  }
  &__param {
    font-weight: 700;
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
    width: 40px;
    margin-right: 10px;
  }
  &__input {
    width: 120px;
  }
  &__icon{
    $size: 13px;
    height: $size;
    width: $size;
    margin-left: 14px;
  }
}
</style>
