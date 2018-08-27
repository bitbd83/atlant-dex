// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.tfaSettings
  .tfaSettings__tfaStatusContainer
    .link.link--red(:class="{'link--green' : !security.tfa.enabled}" @click="security.tfa.enabled ? requestTFAChange() : setTFAStep(1)") {{security.tfa.enabled ? "Disable" : "Enable"}}
    .tfaSettings__status Now: #[span.tfaSettings__status--disabled(:class="{'tfaSettings__status--enabled' : security.tfa.enabled}") {{(security.tfa.enabled ? "Enabled" : "Disabled" + " ")}}] #[span(v-if="security.tfa.enabled") via {{activeTFAMethod}}]
  .tfaSettings__item(v-if="tfaStep === 2 && tfaMethod === 0")
    TFA(:onConfirm="finish2FAChange", :onResend="requestTFAChange", :onCancel="cancel2FA", :confirmType="tfaMethod")
  div(v-if="!security.tfa.enabled")
    .tfaSettings__title I would like to use:
    .tfaSettings__methodsContainer
      Radio.tfaSettings__methods(
        v-for="(tfa, index) in tfaMethods",
        :key="index", name="tFAMethod",
        :value="tfa.id",
        v-model="tfaMethod",
        :checked="tfaMethod === tfa.id"
        :label="tfa.name"
      )
    .tfaSettings__row(v-if="tfaStep === 1 && requiresNumber")
      .tfaSettings__value My phone number
      FlagSwitch.tfaSettings__dropdown(
        v-model="country",
        :max-height="200",
        type="phone"
      )
      input.input.tfaSettings__input(type="number" placeholder="" v-model="number")
      .link.tfaSettings__action.tfaSettings__action--mobileLeft.tfaSettings__value(@click="requestTFAChange()") Send
    .tfaSettings__item(v-if="tfaStep === 2 && requiresNumber")
      TFA(:onConfirm="finish2FAChange", :onResend="requestTFAChange", :onCancel="cancel2FA", :confirmType="tfaMethod")
    .tfaSettings__item(v-if="tfaStep === 1 && tfaMethod === 2")
      .tfaSettings__valueCreateKey You don't have an authentification key #[.link.tfaSettings__valueCreateKeyLink(@click="requestTFAChange()") Create key]
      .tfaSettings__paramSeparator ***
      .tfaSettings__paramTitle Please install one of the following apps to generate key:
      .tfaSettings__item.tfaSettings__desktopRow
        .tfaSettings__osContainer(v-for="os in operatingSystems")
          a(:href="os.link" target="_blank").tfaSettings__desktopRow
            Icon.tfaSettings__osIcon(:id="os.id")
            .link.tfaSettings__action {{os.name}}
      .tfaSettings__instruction After installing the app add the key by scanning the QR code or entering it manually.

    .tfaSettings__item(v-if="tfaStep === 2 && tfaMethod === 2")
      .tfaSettings__value Now scan QR-code below
      QR(:text="qrText" isWhiteBackground="")
      TFA(:onConfirm="finish2FAChange", :onCancel="cancel2FA" :confirmType="tfaMethod")
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex';
import * as User from 'services/api/user';
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
      tfaMethod: '',
      number: '',
      qr: '',
      country: 'US',
      tfaMethods,
      operatingSystems,
    };
  },
  computed: {
    ...mapState('user', {
      security: 'security',
      account: 'account',
    }),
    ...mapGetters('geo', ['getCountryPhoneCode']),
    requiresNumber() {
      return this.tfaMethod === 1 || this.tfaMethod === 3;
    },
    fullNumber() {
      return (this.number) ? this.getCountryPhoneCode(this.country) + this.number : '';
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
    tfaMethod(value) {
      this.setTFAStep(1);
    },
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
@import 'variables';

.tfaSettings {
  &__tfaStatusContainer {
    display: flex;
    margin-bottom: 62px;
  }
  &__status {
    margin-left: 50px;

    &--disabled {
      color: $color__red;
    }

    &--enabled {
      color: $color__green;
    }
  }
  &__title {
  font-weight: 700;
  font-size: 12px;
  line-height: 19px;
  text-transform: uppercase;
  margin-bottom: 31px;
  }
  &__methodsContainer {
    display: flex;
    margin-bottom: 50px;
  }
  &__methods {
    margin-right: 40px;
  }
  &__mathodsLabel {
    margin-left: 15px;
  }
  &__row{
  display: flex;
  align-items: center;
  }
  &__value {
    margin-right: 20px;
  }
  &__input {
    width: 180px;
    margin: 0 20px;
  }

  &__desktopRow {
    display: flex;
    align-items: center;
  }

  &__valueCreateKey {
    margin-bottom: 36px;
  }

  &__valueCreateKeyLink {
    margin-left: 20px;
  }

  &__paramSeparator {
    margin-bottom: 8px;
  }

  &__paramTitle {
    margin-bottom: 28px;
  }

  &__osContainer {
    margin-bottom: 46px;
    margin-right: 45px;
  }

  &__osIcon {
    $size: 24px;
    height: $size;
    width: $size;
    margin-right: 20px;
  }

  &__instruction {
    width: 444px;
    font-size: 12px;
    line-height: 19px;
  }
}
</style>
