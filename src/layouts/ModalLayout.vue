// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
transition(name="modal__anim")
  .modal(v-scrollbar="")
    .modal__overlay(:class="setModalColor")
    .modal__topContainer
      .modal__title {{title}}:
      Icon.modal__closeIcon(id="icon-modal-close"  @click="closeModal()")
    .modal__main
      .modal__body
        .modal__content
          slot
</template>

<script>
import {mapMutations} from 'vuex';
import {scrollbar} from '@/directives';

export default {
  computed: {
    setModalColor() {
      if (this.step == 1 - this.isWith2fa) return this.isSuccess ? 'modal__overlay--green' : 'modal__overlay--red';
      if (this.isAttention) return 'modal__overlay--red';
    },
  },
  methods: {
    ...mapMutations('modal', ['close']),
    ...mapMutations('misc', ['hiddenSidebar']),

    closeModal() {
      this.close();
      this.onClose();
    },
  },

  props: {
    onClose: {
      type: Function,
      required: false,
      default: () => {},
    },

    title: {
      type: String,
      required: true,
    },

    step: {
      type: Number,
      required: false,
      default: 0,
    },

    isSuccess: {
      default: Boolean,
      required: false,
      default: true,
    },

    isAttention: {
      defailt: Boolean,
      required: false,
      default: false,
    },

    isWith2fa: {
      defailt: Boolean,
      required: false,
      default: false,
    },
  },

  created() {
    this.hiddenSidebar();
  },

  directives: {
    scrollbar,
  },
};
</script>

<style lang="scss" scoped>
@import "~perfect-scrollbar/dist/css/perfect-scrollbar";
@import "variables";
$padding: 40px;

.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: visible;
  z-index: 1000002;
  display: flex;
  flex-direction: column;

  &__overlay {
    position: absolute;
    background: #004dff;
    transition: background .5s;
    width: 100%;
    height: 100%;

    &--red {
      background: #f34856;
      transition: background .5s;
    }

    &--green {
      background: #2acc97;
      transition: background .5s;
    }
  }

  &__topContainer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 18px 27px 0px 110px;
    z-index: 1000003;
  }

  &__title {
    font-weight: 700;
    font-size: 20px;
    color: #FFFFFF;
    text-align: center;
    text-transform: uppercase;
  }

  &__main {
    margin: auto;
  }

  &__body {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 407px;
    padding: $padding;
    margin: auto;
    border-radius: 12px;
  }

  &__closeIcon {
    width: 22px;
    height: 22px;
    fill: #ffffff;
    cursor: pointer;
    transition: transform 0.5s;

    &:hover {
      transition: transform 0.5s;
      transform: scale(1.1);
    }
  }

  &__anim {
    &-enter,
    &-leave-active {
      opacity: 0;
    }

    &-enter-active,
    &-leave-active {
      transition: opacity 0.4s ease;
    }
  }
}
</style>
