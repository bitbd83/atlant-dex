// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.pageSidebar
  .pageSidebar__shadow
  .pageSidebar__dashboard(@click="getOpenPage('')")
    icon.pageSidebar__dashboardIcon(id="arrow_short")
    | DASHBOARD
  .pageSidebar__list
    nav.pageSidebar__item(
      v-for="item in items",
    )
      .pageSidebar__label(v-if="item.type == 'category'" @click="setActiveSection(item.label)") {{item.label}}
      transition(
        name="transition"
        v-on:before-enter="transitionAccordionBeforeEnter"
        v-on:enter="transitionAccordionEnter"
        v-on:before-leave="transitionAccordionBeforeLeave"
        v-on:leave="transitionAccordionLeave"
      )
        .pageSidebar__accordion(v-show="activeSection == item.label" v-if="item.type == 'category'")
          .pageSidebar__label.pageSidebar__label--sub(v-for="sub in item.list" @click="getOpenPage(sub.name)" :class="{'pageSidebar__label--selected': isPageOpened(sub.name)}") {{sub.label}}
      .pageSidebar__label(v-if="item.type == 'route'"  @click="getOpenPage(item.name)" :class="{'pageSidebar__label--selected': isPageOpened(item.name)}") {{item.label}}
      a.pageSidebar__label.pageSidebar__label--link( v-if="item.type == 'link'"  :href="item.link" target="_blank") {{item.label}}
        icon(id="icon-link").pageSidebar__icon
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import {profileSections} from '@/store/staticData/navigation.js';

export default {
  data() {
    return {
      activeSection: '',
    };
  },
  computed: {
    ...mapState('page', {
      pageName: 'name',
    }),
    ...mapGetters('page', {
      isPageOpened: 'isOpened',
    }),
  },
  methods: {
    ...mapActions('page', [
      'getOpenPage',
    ]),
    scrollToMethods() {
      this.$nextTick(() => {
        const headerHeight = document.querySelector('.header').getBoundingClientRect().height;
        const scrollY = document.querySelector('.page__content').getBoundingClientRect().top;
        window.scrollTo(0, scrollY - headerHeight);
      });
    },
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
    setActiveSection(sec) {
      this.activeSection = this.activeSection == sec ? '' : sec;
    },
  },
  created() {
    this.items = profileSections;

    // open category
    this.items.forEach((list) => {
      if (list.type == 'category') {
        list.list.forEach((el) => {
          if (el.name == this.pageName) {
            this.activeSection = list.label;
          };
        });
      }
    });
  },
};
</script>


<style lang="scss">
@import 'variables';

.pageSidebar {
  $shadowWidth: 47px;
  position: relative;
  margin-right: 5px;
  width: 254px;
  padding-right: $shadowWidth;

  &__dashboard {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 16px;
    color: #004DFF;
    margin-left: 25px;
    margin-top: 19px;
    margin-bottom: 55px;
  }
  &__dashboardIcon {
    transform: rotate(180deg);
    width: 12px;
    height: 10px;
    fill: $background__blue;
    margin-right: 23px;
  }
  &__list {
    list-style: none;
  }
  &__label {
    position: relative;
    display: block;
    font-size: 14px;
    color: $color__black;
    line-height: 57px;
    padding-left: 25px;
    cursor: pointer;
    white-space: nowrap;
    fill: $background__blue;
    &--sub {
      padding-left: 48px;
    }
    &--link {
      display: inline-block;
      width: 100%;
    }
    &--selected, &:hover {
      background: $background__blue;
      color: $color__white;
      fill: $background__white;
    }
  }
  &__accordion {
    transition: height .5s;
    overflow: hidden;
  }
  &__icon {
    fill: inherit;
    display: inline-block;
    vertical-align: middle;
    width: 24px;
    height: 14px;
    margin-left: 11px;
  }
  &__shadow {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: $shadowWidth;
    background-image: linear-gradient(90deg, rgba(0,0,0,0.10) 2%, rgba(255,255,255,0.00) 100%);
  }
}
</style>
