// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.pageNav
  .pageNav__dashboard(@click="getOpenPage('')")
    icon(id="arrow_short").pageNav__dashboardIcon
    | DASHBOARD
  ul.pageNav__list
    li.pageNav__item(
      v-for="item in items",
    )
      .pageNav__label.pageNav__label--category(v-if="item.type === 'category'" @click="setOpenCategory(item.label)") {{item.label}}
      transition(
        name="transition"
        v-on:before-enter="transitionAccordionBeforeEnter"
        v-on:enter="transitionAccordionEnter"
        v-on:before-leave="transitionAccordionBeforeLeave"
        v-on:leave="transitionAccordionLeave"
      )
        .pageNav__accordion(v-if="item.type === 'category'", v-show="openCategory == item.label")
          .pageNav__label.pageNav__label--sub(v-for="subitem in item.list" @click="getOpenPage(subitem.name)" :class="{'pageNav__label--selected': isPageOpened(subitem.name)}") {{subitem.label}}
      .pageNav__label(v-if="item.type == 'route'" @click="getOpenPage(item.name)" :class="{'pageNav__label--selected': isPageOpened(item.name)}") {{item.label}}
      a.pageNav__label(v-else-if="item.type == 'globalLink'" :href="item.href" target="_blank") {{item.label}}
        icon.pageNav__icon(v-if="item.icon" :id="item.icon")
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import {profileSections} from '@/store/staticData/navigation.js';

export default {
  data() {
    return {
      openCategory: '',
      items: [],
      showNav: true,
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
    setOpenCategory(cat) {
      this.openCategory = (this.openCategory == cat) ? '' : cat;
    },
  },
  mounted() {
    // open active section
    profileSections.forEach((el) => {
      if (el.list !== undefined) {
        let list = el;
        el.list.forEach((el) => {
          if (el.name == this.pageName) this.openCategory = list.label;
        });
      }
    });
  },
  created() {
    this.items = profileSections;
  },
};
</script>

<style lang="scss">
@import 'variables';

.pageNav {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 255px;
  height: 100%;
  padding-right: 47px;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 47px;
    background: linear-gradient(to right, rgba(229,229,229,0.6) 0%,rgba(255,255,255,0) 100%);
  }
  &__dashboard {
    cursor: pointer;
    margin: 21px 0 55px 26px;
    font-weight: 700;
    font-size: 16px;
    color: $color__blue;
  }
  &__dashboardIcon {
    display: inline-block;
    width: 12px;
    height: 10px;
    transform: rotate(180deg);
    margin-right: 23px;
    fill: $background__blue;
  }
  &__list {
    list-style: none;
  }
  &__accordion {
    height: 0;
    overflow: hidden;
    transition: height .5s;
    &--open {
      height: auto;
    }
  }
  &__label {
    display: block;
    cursor: pointer;
    white-space: nowrap;
    font-size: 14px;
    color: $color__black;
    line-height: 57px;
    padding-left: 26px;
    text-decoration: none;
    transition: color .3s, background .3s;
    fill: $background__blue;
    &--sub {
      padding-left: 50px;
    }
    &--selected {
      transition: background .3s;
      background: $background__blue;
      color: $color__white;
      transition: color .3s, background .3s;
    }
    &:hover {
      transition: background .3s;
      background: $background__blue;
      color: $color__white;
      fill: $background__white;
      transition: color .3s, background .3s, fill .1s;
    }
  }
  &__icon {
    display: inline-block;
    vertical-align: middle;
    width: 24px;
    height: 14px;
    fill: inherit;
    margin-left: 16px;
    transition: fill .1s;
  }
}
</style>

