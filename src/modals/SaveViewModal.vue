// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
ModalLayout(:step="step", isSuccess="true", title="Save View")
  .saveView
    Icon.saveView__icon(id="pass")
    form.saveView__content(v-if="step == 0" @submit.prevent="saveView()")
      .saveView__headerContent
        .saveView__title Save View
      IInput.saveView__input(placeholder="View name" label="View name" v-model="viewName")
      BButton.saveView__button(color="malachite" rounded type="submit") Save
    Status.saveView__status(v-if="step == 1")
</template>

<script>
import {mapState} from 'vuex';
// import {serverNotification} from 'services/notification';
import Checkbox from 'components/Checkbox';
import BButton from 'components/BButton';
import ModalLayout from '@/layouts/ModalLayout';
import IInput from 'components/IInput';
import Status from 'components/Status.vue';

export default {
  data() {
    return {
      viewName: '',
      step: 0,
    };
  },
  computed: {
    ...mapState('modal', {
      data: 'data',
    }),
  },
  methods: {
    saveView() {
    //   Grid.addCustomView({
    //   }).then(() => {
           this.data.saveView(this.viewName);
           this.step = 1;
    //   }).catch((res) => {
    //     serverNotification(res);
    //   });
    },
  },
  components: {
    Checkbox,
    ModalLayout,
    BButton,
    IInput,
    Status,
  },
};
</script>

<style lang="scss">
@import 'variables';

.saveView{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  &__content {
    width: 100%;
  }
  &__icon {
    $size: 77px;
    width: $size;
    height: $size;
    fill: $color_yellow;
    margin-bottom: 50px;
  }
  &__headerContent {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 50px;
  }
  &__title {
    font-size: 18px;
    font-weight: 900;
    text-transform: uppercase;
  }
  &__inputs {
    width: 100%;
    & > * {
      margin-bottom: 35px;
    }
  }
  &__checkbox {
    align-items: flex-start !important;
  }
  &__checkboxText {
    margin-left: 20px;
  }
  &__button {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    font-size: 16px;
    font-weight: 900px;
    text-transform: uppercase;
  }
}
</style>
