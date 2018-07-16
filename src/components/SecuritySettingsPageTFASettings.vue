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
.tfaSettings
  .tfaSettings__tfa
    .link.link--green(:class="{'tfaSettings__tfaEnabled' : security.tfa.enabled}" @click="setTFAStep(1)") {{security.tfa.enabled ? "Enabled" : "Enable"}}
    .tfaSettings__tfaMethod(v-if="security.tfa.enabled") via {{activeTFAMethod}}
    .link.link--red.tfaSettings__disable(:class="{'tfaSettings__tfaEnabled' : !security.tfa.enabled}" @click="requestTFAChange()") {{security.tfa.enabled ? "Disable" : "Disabled"}}
  .tfaSettings__item(v-if="tfaStep === 2 && tfaMethod === 0")
    TFA(:onConfirm="finish2FAChange", :onResend="requestTFAChange", :onCancel="cancel2FA", :text="tfaConfirmText")
  div(v-if="!security.tfa.enabled")
    .tfaSettings__item
      .tfaSettings__param I would like to use:
      .tfaSettings__value.tfaSettings__value--row.tfaSettings__desktopRow
        Radio.tfaSettings__tfaOption(v-for="(tfa, index) in tfaMethods", :key="index", name="tFAMethod", :value="tfa.id", v-model="tfaMethod", :checked="tfaMethod === tfa.id") #[.tfaSettings__tfaOptionName {{tfa.name}}]
    .tfaSettings__item.tfaSettings__desktopRow(v-if="tfaStep === 1 && requiresNumber")
      .tfaSettings__value My phone number
      .tfaSettings__value.tfaSettings__value--row
        FlagSwitch.tfaSettings__dropdown(
          v-model="country",
          :max-height="200",
          type="phone"
        )
        input.input.tfaSettings__input(placeholder="965 296 36 36" v-model="number")
      .link.tfaSettings__action.tfaSettings__action--mobileLeft.tfaSettings__value(@click="requestTFAChange()") Send
    .tfaSettings__item(v-if="tfaStep === 2 && requiresNumber")
      TFA(:onConfirm="finish2FAChange", :onResend="requestTFAChange", :onCancel="cancel2FA", :text="tfaConfirmText")
    .tfaSettings__item(v-if="tfaStep === 1 && tfaMethod === 2")
      .tfaSettings__value.tfaSettings__desktopRow You don't have an authentication key. #[.link.tfaSettings__action.tfaSettings__action--mobileLeft(@click="requestTFAChange()") Create key]
      .tfaSettings__param.tfaSettings__param--margin ***
      .tfaSettings__param Please install one of the following apps to generate key:
      .tfaSettings__item.tfaSettings__desktopRow
        .tfaSettings__value.tfaSettings__value--row.tfaSettings__value--os(v-for="os in opSys")
          Icon.tfaSettings__osIcon(:id="os.id")
          .link.tfaSettings__action {{os.name}}
      .tfaSettings__instruction After installing the app add the key by scanning the QR code or entering it manually.
    .tfaSettings__item(v-if="tfaStep === 2 && tfaMethod === 2")
      .tfaSettings__value Now scan QR-code below
      QR.tfaSettings__value(:text="qrText")
      TFA(:onConfirm="finish2FAChange", :onCancel="cancel2FA" :text="tfaConfirmText")
</template>

<script>
import i18n from '@/i18n';
import {mapState, mapMutations} from 'vuex';
import * as User from 'services/api/user';
import {getCountryCode} from 'services/countries';
// import {serverNotification} from 'services/notification';
import {operatingSystems, tfaMethods} from '@/config';
import Radio from 'components/Radio';
import FlagSwitch from 'components/FlagSwitch';
import TFA from 'components/TFA';
import QR from 'components/QR';

export default {
  data() {
    return {
      tfaStep: 0,
      tfaMethod: 3,
      number: '',
      qr: '',
      country: 'us',
      opSys: [],
      tfaMethods: [],
    };
  },
  computed: {
    ...mapState('user', {
      security: 'security',
      account: 'account',
    }),
    requiresNumber() {
      return this.tfaMethod === 1 || this.tfaMethod === 3;
    },
    getCountryCode() {
      return getCountryCode(this.country);
    },
    fullNumber() {
      return (this.number) ? this.getCountryCode + this.number : '';
    },
    activeTFAMethod() {
      return this.tfaMethods.find((item) => item.id === this.security.tfa.method).name;
    },
    selectedTFAMethod() {
      if (this.security.tfa.enabled) {
          return this.activeTFAMethod;
      } else {
        const method = this.tfaMethods.find((method) => method.id === this.tfaMethod);
        return method ? method.name : '';
      }
    },
    qrText() {
      return encodeURI(`otpauth://totp/${this.account.email.value}?secret=${this.qr}&issuer=ATLANT`);
    },
    tfaConfirmText() {
      if (!this.selectedTFAMethod) return '';
      const methodName = this.selectedTFAMethod.split(' ')[0];
      const status = this.security.tfa.enabled ? 'Disable' : 'Enable';
      return i18n.t(`tfaConfirmText${methodName}${status}`);
    },
  },
  methods: {
    ...mapMutations('user', {
      setTFAMethod: 'setTFAMethod',
    }),
    setTFAStep(step) {
      this.tfaStep = step;
    },
    resetData() {
      this.setTFAStep(0);
      this.tfaMethod = 3;
      this.number = '';
    },
    cancel2FA() {
      this.setTFAStep(0);
    },
    requestTFAChange() {
      let data = {};
      if (!this.security.tfa.method) {
        data = {
          method: this.tfaMethod,
          contact: this.fullNumber,
        };
      } else {
        this.tfaMethod = 0;
      };
      User.requestTFAChange(data).then((res) => {
        this.setTFAStep(2);
        if (res.data.manualEntryKey) this.qr = res.data.manualEntryKey;
      });
    },
    finish2FAChange(code) {
      let data = {code};
      if (!this.security.tfa.enabled) {
        data.method = this.tfaMethod;
        data.contact = this.fullNumber;
      };
      User.finishTFAChange(data).then(() => {
        this.setTFAMethod({
          method: this.tfaMethod,
          contact: this.fullNumber,
          enabled: !this.security.tfa.enabled,
        });
        this.resetData();
      });
    },
  },
  watch: {
    tfaMethod() {
      this.setTFAStep(1);
    },
  },
  created() {
    this.opSys = operatingSystems;
    this.tfaMethods = tfaMethods;
  },
  components: {
    Radio,
    FlagSwitch,
    TFA,
    QR,
  },
};
</script>

<style lang="scss">
.tfaSettings {
  &__desktopRow {
    display: flex;
    align-items: center;
  }
  &__item {
    font-size: 14px;
    line-height: 19px;
    margin-bottom: 43px;
  }
  &__param {
    font-weight: 700;
    &--margin {
      margin-top: 38px;
    }
  }
  &__value {
    margin-top: 18px;
    font-weight: 400;
    &--row {
      display: flex;
      align-items: center;
    }
    &--os {
      &:not(:first-of-type) {
        margin-left: 45px;
      }
    }
  }
  &__action {
    margin-right: 5px;
    margin-left: 19px;
  }
  &__tfa {
    display: flex;
    font-size: 14px;
    line-height: 19px;
    margin-bottom: 50px;
  }
  &__tfaEnabled {
    font-weight: 700;
    cursor: default;
    border: none;
  }
  &__disable {
    margin-left: 30px;
  }
  &__tfaMethod {
    margin-left: 5px;
    padding-top: 3px;
    font-weight: 700;
    color: #fff;
    text-decoration: none;
  }
  &__tfaOption {
    &:not(:first-of-type){
      margin-left: 28px;
    }
  }
  &__tfaOptionName {
    margin-left: 18px;
  }
  &__osIcon {
    $size: 24px;
    height: $size;
    width: $size;
  }
  &__instruction {
    font-size: 12px;
    line-height: 24px;
  }
  &__code {
    margin-left: 28px;
  }
  &__dropdown {
    width: 40px;
    margin: 0 10px 0;
  }
  &__input {
    width: 120px;
  }
  &__qr {
    margin-top: 36px;
  }
}
</style>
