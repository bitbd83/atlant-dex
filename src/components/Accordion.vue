<template lang="pug">
.accordion(@click="setShow")
  .accordion__header(:class="")
    .accordion__background(:class="{'accordion__background--sidebar' : isSidebar, 'accordion__background--active' : isShow}")
    .accordion__title(v-if="title" :class="{'accordion__title--active' : isShow, 'accordion__title--sidebar' : isSidebar}") {{title}}
    Icon(id="triangle" :class="{'accordion__icon--sidebar' : isSidebar, 'accordion__icon--active' : isShow}").accordion__icon
  transition(name="accordion__anim")
    .accordion__content(:class="{'accordion__content--active': isShow && isLoading}"  v-show="isShow && isLoading" @click.stop="()=>{}")
      slot
</template>

 <script>

 export default {
   data() {
     return {
       isShow: true,
     };
   },
   computed: {
     contentHeight() {
       return document.querySelector;
     },
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
      el.style.height = '0';
    },
    setShow() {
      this.isShow = !this.isShow;
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
    isLoading: {
      type: Boolean,
      required: false,
      default: true,
    },
   },
 };
 </script>

 <style lang="scss">
 @import 'variables';

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
  }
  &__background {
    z-index: 0;
    position: absolute;
    background: $background__blue;
    height: 100%;
    width: 100%;
    transition: width .2s ease-out;
    &--sidebar {
      background: $background__white;
    }
    &--active {
      width: 10px;
      transition: width .2s ease-out;
    }
  }
  &__title {
    position: relative;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    padding-left: 21px;
    color: $color__white;
      transition: all .3s ease-in;
    &--active {
      color: $color__blue;
      transition: all .3s ease-in;
    }
    &--sidebar {
      font-size: 14px;
      color: $color__blue;
      text-transform: none;
    }
  }
  &__icon {
    z-index: 1;
    fill: $fill__white;
    margin-right: 27px;
    width: 14px !important;
    height: 9px !important;
    transition: all .3s ease-in;
    &--active {
      transform: rotate(180deg);
      transition: all .3s ease-in;
      fill: $fill__blue;
    }
    &--sidebar {
      fill: $fill__blue;
    }
  }
  &__content {
    max-height: 0;
    transition: max-height 1s cubic-bezier(.25,.8,.5,1);
    overflow: hidden;
    &--active {
      max-height: 500px;
      transition: max-height 1s ease-in;
    }
  }
  &__anim-fade-enter-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  &__anim-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  &__anim-fade-enter, &__anim-fade-leave-to {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
}
// @keyframes triangleTransition {
//   // 10% {
//   //   background: #E55541;
//   // }
//   50% {
//     transform: scale(0);
//   }
// }
 </style>
