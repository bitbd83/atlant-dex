// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang='pug'>
.sidebar(:class="{'sidebar--visible' : showSidebar}")
  .sidebar__container
    transition-group(name="sidebar__fadeSections").sidebar__content
      .sidebar__sections(:key="section")
        SidebarPortfolio(v-if="section == 'wallet'")
        SidebarQuotes(v-if="section == 'quotes'")
        SidebarAlerts(v-if="section == 'alerts'")
    .sidebar__copyright {{$t('copyright')}}
  SidebarToolbar
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import SidebarPortfolio from './SidebarPortfolio';
import SidebarAlerts from './SidebarAlerts';
import SidebarQuotes from './SidebarQuotes';
import SidebarToolbar from 'components/SidebarToolbar';

export default {
  computed: {
    ...mapState('misc', [
      'showSidebar',
    ]),
    ...mapGetters('misc', [
      'section',
    ]),
  },
  components: {
    SidebarPortfolio,
    SidebarAlerts,
    SidebarQuotes,
    SidebarToolbar,
  },
};

</script>

<style lang="scss">
@import 'variables';

.sidebar {
  position: relative;
  display: flex;
  height: 100%;
  margin-left: -300px;
  transition: $transition__sidebarAction;

  &--visible {
    margin-left: 0;
    transition: $transition__sidebarAction;
  }

  &__container {
    position: relative;
    width: 300px;
    display: flex;
    min-height: 100%;
    flex-direction: column;
    color: $color__white;
    z-index: 1000001;
    background: $background__blue;

    &:before {
      content: "";
      position: absolute;
      right: 0;
      width: 47px;
      height: 100%;
      background: linear-gradient(to right, hsla(206,70%,70%,0) 30%,hsla(0,0%,0%,.1) 100%);
    }
  }

  &__content {
    flex: 2;
    display: flex;
    position: relative;
    flex-direction: column;
  }

  &__fadeSections {
    &-enter-active, &-leave-active {
      transition: opacity .75s;
    }

    &-enter, &-leave-to {
      opacity: 0;
    }
  }

  &__sections {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  &__item {
    padding: 32px 18px 32px 25px;
    font-size: 12px;
    position: relative;
  }

  &__copyright {
    display: block;
    margin: 19px 24px;
    font-size: 10px;
    font-weight: 400;
  }
}
.sidebarChild {

  &__headerContainer {
    padding: 20px 18px 32px 25px;
  }

  &__headerLine {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 28px;

    &:first-of-type {
      margin-bottom: 35px;
      align-items: flex-end;
    }
  }

  &__title {
    color: $color__white;
    font-family: Supply;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
  }
}
</style>
