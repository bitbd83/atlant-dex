// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.tfa
  form.tfa__content(v-if="isModal" @submit.prevent="onConfirm(secureCode)")
    .tfa__title
      icon.tfa__icon(id='icon-modal-confirm-dialog')
      span.tfa__text {{setTextMessage}}
    .tfa__inputContainer
      IInput.tfa__input(v-model="secureCode", label="Code")
    BButton.tfa__button(color="malachite" rounded) Confirm
    .tfa__repeatContainer
      .tfa__repeatText(v-if="!isLinkAviable && security.tfa.method != 2") The new code will be available in #[span.link.link--white {{timer}}] seconds
      .link.link--white(v-if="isLinkAviable && security.tfa.method != 2" @click="getCountDown(); onResend()") Send new code
    .tfa__cancelContainer(@click="onCancel()")
      icon.tfa__cancelIcon(id="arrow_short")
      .link.link--white Cancel
  form(v-else)
    .tfa__title.tfa__row
        icon.tfa__icon.tfa__icon--dark(id='icon-modal-confirm-dialog')
        span.tfa__text.tfa__text--dark  {{setTextMessage}}
    .tfa__row.tfa__row--desktop
      input.input(placeholder="Enter security code" v-model="secureCode")
      .tfa__row.tfa__row--mobileMargin
        .link.link.tfa__link(@click="onConfirm(secureCode)") Confirm
        .link.link.tfa__link(@click="onCancel()") Cancel
    .tfa__row(v-if="isLinkAviable && security.tfa.method != 2")
      Icon.tfa__iconResend(id="icon-resend" @click="getCountDown(); onResend()")
      .link.tfa__link(@click="getCountDown(); onResend()") Resend
      | confirmation code
    .tfa__row(v-if="!isLinkAviable && security.tfa.method != 2")
      .tfa__repeatText.tfa__repeatText--dark The new code will be available in #[span.link {{timer}}] seconds
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import i18n from '@/i18n';
import BButton from 'components/BButton';
import IInput from 'components/IInput';

export default {
  data() {
    return {
      secureCode: '',
      timer: 20,
      isLinkAviable: false,
      isSuccess: false,
    };
  },
  computed: {
    ...mapState('user', {
      security: 'security',
    }),
    setTextMessage() {
      let confirmMethod = (this.confirmType) ? this.confirmType : this.security.tfa.method;
      return (this.text === false) ? i18n.t(`sent2FA.${confirmMethod}`) : this.text;
    },
  },
  methods: {
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    getCountDown() {
      this.isLinkAviable = false;
      if (this.timer) {
        setTimeout(() => {
          this.timer--;
          this.getCountDown();
        }, 1000);
      };
      if (this.timer <= 0) {
        this.isLinkAviable = true;
        this.timer = 20;
      };
    },
  },
  created() {
    this.getCountDown();
  },
  props: {
    text: {
      type: [String, Boolean],
      default: false,
      required: false,
    },
    confirmType: {
      type: [String, Boolean],
      default: false,
      required: false,
    },
    onConfirm: {
      type: Function,
      required: true,
    },
    onCancel: {
      type: Function,
      required: true,
    },
    onResend: {
      type: Function,
      required: false,
    },
    isModal: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {
    BButton,
    IInput,
  },
};
</script>

<style lang="scss">
@import 'variables';

.tfa {
  &__title {
    display: flex;
    margin-bottom: 67px;
  }

  &__icon {
    margin-right: 27px;
    display: inline-block;
    width: 24px;
    height: 23px;
    fill: $fill__white;
    &--dark {
      fill: $fill__black;
    }
  }

  &__text {
    margin-top: -6px;
    max-width: 269px;
    color: $color__white;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 0.38px;
    line-height: 25px;
    &--dark {
      color: $color__black;
    }
  }

  &__inputContainer {
    margin-bottom: 70px;
  }

  &__input {
    display: inline-block;
    font-size: 14px;
    font-weight: 400;
  }

  &__button {
    width: 184px;
    margin-bottom: 62px;
  }

  &__repeatContainer {
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 40px;
  }

  &__repeatText {
    color: $color__white;
    font-family: CenturyGothic;
    font-size: 12px;
    letter-spacing: 0.38px;
    line-height: 25px;
    &--dark {
      color: $color__black;
    }
  }

  &__cancelIcon{
    display: inline-block;
    transform: rotate(180deg);
    fill: $fill__white;
    width: 12px;
    height: 10px;
    margin-right: 20px;
    margin-top: 6px;
  }

  &__row {
    margin-top: 18px;
    margin-bottom: 0;
    min-height: 25px;
    display: flex;
    align-items: center;
    &--mobileMargin {
      margin: 0;
    }
  }

  &__iconResend {
    width: 16px;
    height: 16px;
    fill: $fill__blue;
  }

  &__link {
    margin: 0 17px;
  }
}

</style>
