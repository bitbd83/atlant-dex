// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.changeEmail
  .changeEmail__param {{$t('additional_email')}}:
  .changeEmail__row(v-if="step === 0")
    .changeEmail__value {{security.additionalEmail.value}} #[Icon.changeEmail__icon(v-if="security.additionalEmail.verified" id="verified")]
    .link.changeEmail__action(v-show="security.tfa.enabled" :class="{'changeEmail__action--empty' : isEmpty}" @click="changeEmail") {{$t('change')}}
  .changeEmail__row(v-if="step === 1")
    input.input(v-model="email")
    .link.changeEmail__action(@click="setExtraEmail") {{$t('save')}}
    .link.changeEmail__action(@click="setStep(0)") {{$t('cancel')}}
</template>

<script>
import {mapState, mapActions} from 'vuex';
import {notification} from 'services/notification';

export default {
  data() {
    return {
      email: null,
      step: 0,
    };
  },
  computed: {
    isEmpty() {
      return (this.security.additionalEmail.value === null && this.step === 0);
    },
    ...mapState('user', {
      security: 'security',
    }),
  },
  methods: {
    ...mapActions('user', {
      setAdditionalEmail: 'setAdditionalEmail',
    }),
    setStep(step) {
      this.step = step;
    },
    changeEmail() {
      this.email = this.security.additionalEmail.value;
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
};
</script>


<style lang="scss">
.changeEmail {
  &__row {
    margin-top: 10px;
    height: 32px;
    display: flex;
    align-items: center;
  }
  &__param {
    font-weight: 700;
  }
  &__value {
    margin: 10px 0 10px;
    display: flex;
    align-items: center;
  }
  &__action {
    margin: 0 5px 0 19px;
    &--empty {
      margin-left: 0;
    }
  }
  &__icon{
    $size: 13px;
    height: $size;
    width: $size;
    margin-left: 14px;
  }
}
</style>
