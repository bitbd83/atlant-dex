// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.accordion(@click="setShow")
  .accordion__header(:class="{'accordion__header--toolbar' : isToolbar}")
    .accordion__background(
      :class="{'accordion__background--sidebar' : isSidebar, 'accordion__background--active' : isShow, 'accordion__background--toolbar' : isToolbar}"
    )
    .accordion__title(
      v-if="title"
      :class="{'accordion__title--active' : isShow, 'accordion__title--sidebar' : isSidebar}"
    ) {{title}}
    Icon.accordion__icon(
      id="triangle"
      :class="{'accordion__icon--sidebar' : isSidebar, 'accordion__icon--active' : isShow, 'accordion__icon--toolbar' : isToolbar, 'accordion__icon--toolbarActive' : (isToolbar && isShow)}"
    )
  transition(
    name="transition"
    v-on:before-enter="transitionAccordionBeforeEnter"
    v-on:enter="transitionAccordionEnter"
    v-on:before-leave="transitionAccordionBeforeLeave"
    v-on:leave="transitionAccordionLeave"
  )
    .accordion__content(v-show="isShow" @click.stop="()=>{}")
      slot
</template>

<script>

export default {
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    transitionAccordionBeforeEnter(el) {
      el.style.height = '0';
    },
    transitionAccordionEnter(el) {
      el.style.height = el.scrollHeight + 'px';

      setTimeout(() => {
        el.style.height = 'auto';
      }, 500);
    },
    transitionAccordionBeforeLeave(el) {
      el.style.height = el.scrollHeight + 'px';
    },
    transitionAccordionLeave(el) {
      el.style.height = el.scrollHeight + 'px';
      el.style.height = '0';
    },
    setShow() {
      this.isShow = !this.isShow;
    },
    firstShowSidebar() {
      setTimeout(() => {
        this.isShow = true;
      }, 500);
    },
  },
  mounted() {
    if (this.isHidden === false) {
      this.firstShowSidebar();
    }
  },
  watch: {
    isHidden() {
      this.firstShowSidebar();
    },
  },
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    isSidebar: {
      type: [Boolean, String],
      required: false,
      default: false,
    },
    isToolbar: {
      type: [Boolean, String],
      required: false,
      default: false,
    },
    isHidden: {
      type: [Boolean, String],
      required: false,
      default: false,
    },
  },
};
</script>

 <style lang="scss">
@import "variables";

.accordion {
  display: flex;
  flex-direction: column;
  margin-bottom: 38px;

  &__header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 42px;
    background: $background__white;

    &--toolbar {
      background: transparent;
    }
  }

  &__background {
    z-index: 0;
    position: absolute;
    background: $background__blue;
    height: 100%;
    width: 100%;
    transition: width 0.2s ease-out;

    &--sidebar {
      background: $background__white;
    }

    &--active {
      width: 10px;
      transition: width 0.2s ease-out;
    }

    &--toolbar {
      background: transparent;
    }
  }

  &__title {
    position: relative;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    padding-left: 21px;
    color: $color__white;
    transition: color 0.3s ease-in;

    &--active {
      color: $color__blue;
      transition: color 0.3s ease-in;
    }

    &--sidebar {
      font-size: 14px;
      color: $color__blue;
      text-transform: none;
    }
  }

  &__icon {
    cursor: pointer;
    z-index: 1;
    fill: $fill__white;
    margin-right: 17px;
    width: 14px;
    height: 9px;
    transition: transform 0.3s ease-in;

    &--active {
      transform: rotate(180deg);
      transition: transform 0.3s ease-in;
      fill: $fill__blue;
    }

    &--sidebar {
      fill: $fill__blue;
    }

    &--toolbar {
      fill: $fill__white;
      margin: auto;
      transform: rotate(180deg);
    }

    &--toolbarActive {
      transform: rotate(0deg);
    }
  }

  &__content {
    position: relative;
    transition: height 0.5s;
    overflow: hidden;
  }
}
</style>
