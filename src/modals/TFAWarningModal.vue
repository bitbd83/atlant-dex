// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
  ModalLayout(isAttention="true", title="ATTENTION")
    .tfaWarning
      icon.tfaWarning__angle(id="angle-top-left")
      Icon.tfaWarning__icon(id="icon-2fa")
      .tfaWarning__text {{$t('tfaSecureWarning.text')}}
      BButton.tfaWarning__button(caps, color="white", @click="onYesClick") {{$t('tfaSecureWarning.yesButton')}}
      .link.link--white(
        role="button",
        @click="onNoClick",
      ) {{$t('tfaSecureWarning.noButton')}}
</template>

<script>
import {mapMutations, mapActions} from 'vuex';
import ModalLayout from '@/layouts/ModalLayout';
import BButton from 'components/BButton';

export default {
  name: 'TFAWarningModal',
  methods: {
    ...mapMutations('modal', {
      closeModal: 'close',
    }),
    ...mapActions('page', [
      'getOpenPage',
    ]),
    onYesClick() {
      this.closeModal();
      this.getOpenPage('securitySettings');
    },
    onNoClick() {
      this.closeModal();
    },
  },
  components: {
    ModalLayout,
    BButton,
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import 'variables';
.tfaWarning {
  position: relative;
  align-items: center;
  display: flex;
  flex-direction: column;

  &__angle {
    position: absolute;
    top: 0;
    left: 0;
    width: 17px;
    height: 16.26px;
    fill: $fill__white;
  }

  &__icon {
    display: inline-block;
    height: 97px;
    width: 111px;
    margin: 80px auto;
    fill: $fill__white;
  }

  &__text {
    font-weight: 700;
    font-size: 20px;
    color: $color__white;
    text-align: center;
    line-height: 39px;
    max-width: 400px;
    margin: auto;
    margin-bottom: 44px;
    max-width: 288px;
    text-transform: uppercase;
  }

  &__button {
    color: $color__red;
    margin-bottom: 63px;
  }
}
</style>
