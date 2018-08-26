// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.changeEmail
  .changeEmail__container
    .changeEmail__title {{isAdditionalEmail ? 'Additional e-mail:' : 'Current e-mail:'}}
    .changeEmail__content(v-if="step === 0")
      .changeEmail__value(v-if="!isEmpty") {{hiddenEmail}} #[Icon.changeEmail__icon(v-if="setEmailData.verified" id="icon-form-check")]
      .link.changeEmail__action(v-if="security.tfa.enabled && isAdditionalEmail" :class="{'changeEmail__action--empty' : isEmpty}" @click="changeEmail") {{(isEmpty) ? 'Add' : 'Change'}}
    .changeEmail__content(v-if="step === 1")
      input.input.changeEmail__input(v-model="email" autofocus="")
      .link.changeEmail__action(@click="setExtraEmail") Save
      .link.changeEmail__action(@click="setStep(0)") Cancel
</template>

<script>
import {mapState, mapActions} from 'vuex';
import {notification} from 'services/notification';

export default {
  data() {
    return {
      email: '',
      step: 0,
    };
  },
  computed: {
    isEmpty() {
      return (this.setEmailData.value == 'null' && this.step === 0);
    },
    ...mapState('user', ['security', 'account']),
    setEmailData() {
      return this.isAdditionalEmail ? this.security.additionalEmail : this.account.email;
    },
    hiddenEmail() {
      let split = this.setEmailData.value.split('@');
      let letter1 = split[0].substring(0, 1);
      let letter2 = split[0].substring(split[0].length - 1, split[0].length);
      let newFirst = letter1;
      for (let i = 0; i < split[0].length - 2; i++) {
          newFirst += '*';
      }
      newFirst += letter2;

      let letter3 = split[1].substring(0, 1);
      let extension = letter3;
      for (let i = 0; i < split[1].split('.')[0].length - 1; i++) {
          extension += '*';
      }
      extension += '.' + split[1].split('.')[1];
      let result = newFirst + '@' + extension;

      return result;
      },
  },
  methods: {
    ...mapActions('user', {
      setAdditionalEmail: 'setAdditionalEmail',
    }),
    setStep(step) {
      this.step = step;
    },
    changeEmail() {
      // this.email = this.security.additionalEmail.value;
      this.setStep(1);
    },
    setExtraEmail() {
      this.setAdditionalEmail(this.email).then(() => {
        notification({
          text: i18n.t('emailSent', i18n.locale, [this.email]),
          type: 'info',
        });
        this.security.additionalEmail.verified = false;
        this.setStep(0);
      });
    },
  },
  props: {
    isAdditionalEmail: Boolean,
  },
};
</script>


<style lang="scss">
@import "variables";

.changeEmail {
  min-width: 270px;
  margin-right: 37px;

  &:last-of-type {
    min-width: 100%;
    margin-right: 0;
  }

  &__title {
    font-weight: 700;
    font-size: 12px;
    line-height: 19px;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  &__icon {
    display: inline-block;
    vertical-align: middle;
    margin-left: 16px;
    width: 10px;
    height: 8.75px;
    fill: $fill__green;
  }

  &__content {
    display: flex;
    align-items: center;
    min-height: 33px;
  }

  &__value {
    font-family: CenturyGothic;
    font-size: 14px;
    letter-spacing: 0.5px;
    line-height: 19px;
  }

  &__action {
    margin-left: 25px;
    &:first-of-type {
      margin-left: 0;
    }
  }

  &__input {
    margin-right: 25px;
  }
}
</style>
