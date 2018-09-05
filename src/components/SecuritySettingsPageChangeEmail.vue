// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.changeEmail
  .changeEmail__container
    .changeEmail__title {{isAdditionalEmail ? $t('additional_email') : 'Current e-mail:'}}
    .changeEmail__content(v-if="step === 0")
      .changeEmail__value(v-if="!isEmpty") {{setEmailData.value}} #[Icon.changeEmail__icon(v-if="setEmailData.verified" id="icon-form-check")]
      .link.changeEmail__action(v-if="isAdditionalEmail" :class="{'changeEmail__action--empty' : isEmpty}" @click="changeEmail") {{(isEmpty) ? 'Add' : $t('change')}}
    .changeEmail__content(v-if="step === 1")
      input.input.changeEmail__input(v-model="email" autofocus="")
      .link.changeEmail__action(@click="setExtraEmail") {{$t('save')}}
      .link.changeEmail__action(@click="setStep(0)") {{$t('cancel')}}
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
    font-family: "Century Gothic";
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
