// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.widgets
  .widgets__button(:class="buttonClass" @click="toggleDropdown()")
    Icon.widgets__icon(:class="iconClass" id="plus")
    // transition(name="widgets__transition" @enter="transitionEnter" @leave="transitionLeave")
    .widgets__dropdowns(ref="widget__drops", :class="dropdownClass")
      MainPageHeaderWidgetsDropdown
  .widgets__label {{$t('widgets')}}
</template>

<script>
import MainPageHeaderWidgetsDropdown from './MainPageHeaderWidgetsDropdown';

export default {
  data() {
    return {
      showDropdown: false,
    };
  },
  computed: {
    buttonClass() {
      return (this.showDropdown) ? 'widgets__button--active' : '';
    },
    dropdownClass() {
      return (this.showDropdown) ? 'widgets__dropdowns--open' : '';
    },
    iconClass() {
      return (this.showDropdown) ? 'widgets__icon--outside' : '';
    },
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
      if (this.showDropdown) {
        setTimeout(() => {
          if (this.showDropdown) {
            this.$refs.widget__drops.style.overflow = 'visible';
          }
        }, 1000);
      } else {
        this.$refs.widget__drops.style.overflow = 'hidden';
      }
    },
  },
  components: {
    MainPageHeaderWidgetsDropdown,
  },
};
</script>

<style lang="scss">
@import 'variables';

.widgets {
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  &__button {
    display: flex;
    align-items: center;
    height: 35px;
    width: 35px;
    padding: 13px;
    border-radius: 3px;
    background-color: $background__blue;
    cursor: pointer;
    transition: width .5s ease-out;
    &--active {
      width: 360px;
      transition: width .5s ease-out;
    }
  }
  &__icon {
    width: 9px;
    height: 9px;
    fill: $fill__white;;
    transition: margin .5s ease-out;
    &--outside {
      margin-left: -50px;
      margin-right: 28px;
      fill: $fill__blue;
    }
  }
  &__dropdowns {
    width: 100%;
    opacity: 0;
    // display: none;
    overflow: hidden;
    transition: opacity .5s .5s linear;
    &--open {
      //overflow: visible;
      opacity: 1;
      transition: opacity .5s .5s linear;
    }
  }
  &__label {
    margin-left: 25px;
    text-transform: uppercase;
  }
}
</style>
