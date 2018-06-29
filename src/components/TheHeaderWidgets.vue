<template lang="pug">
.widgets
  .widgets__button(:class="buttonClass" @click="toggleDropdown()")
    Icon.widgets__icon(:class="iconClass" id="plus")
    // transition(name="widgets__transition" @enter="transitionEnter" @leave="transitionLeave")
    .widgets__dropdowns(ref="widget__drops", :class="dropdownClass", @click="transitionEnter")
      TheHeaderWidgetsDropdown
  .title.widgets__label Widgets
</template>

<script>
import TheHeaderWidgetsDropdown from './TheHeaderWidgetsDropdown';

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
    transitionEnter(el) {
      console.log(this.$refs.widget__drops.style);
    },
  },
  components: {
    TheHeaderWidgetsDropdown,
  },
};
</script>

<style lang="scss">
@import 'variables';

.widgets {
  min-width: 120px;
  margin-right: 57px;
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
    transition: width 1s ease-out;
    &--active {
      width: 360px;
      transition: width 1s ease-out;
    }
  }
  &__icon {
    width: 9px;
    height: 9px;
    fill: $fill__white;;
    transition: margin 1s ease-out;
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
    transition: opacity 1s 1s linear;
    &--open {
      //overflow: visible;
      opacity: 1;
      transition: opacity 1s 1s linear;
    }
  }
  &__label {
    margin-left: 40px;
  }
}
</style>
