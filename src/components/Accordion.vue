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
    .accordion__content(v-if="isShow" @click.stop="()=>{}")
      slot
</template>

 <script>
import smoothHeight from 'vue-smooth-height';

export default {
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    transitionAccordionBeforeEnter(el) {
      el.style.height = '0';
    },
    transitionAccordionEnter(el) {
      el.style.height = el.scrollHeight + 'px';
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
  },
  mixins: [smoothHeight],
  mounted() {
    this.$smoothElement({
      el: this.$el.lastChild,
      transition: 'height .5s',
    });
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
     display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: height 0.5s;
  }
}
</style>
