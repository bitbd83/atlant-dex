// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang='pug'>
.toolbar
  .toolbar__group
    Icon.toolbar__logo(id="logo"
                      @click="getOpenPage('')",
    )
    UserVisibility(
      v-for="sect in sidebarSections",
      :key="sect.name",
      :hide-on-logout="!sect.isShowOnLogout"
    )
      .toolbar__iconWrap(:class="{'toolbar__iconWrap--active' : sect.name == section}",
                        @click="setSection(sect.name)"
      )
        Icon.toolbar__icon(
          :id="sect.name",
          :class="isActive(sect.name)",
        )
    UserVisibility(
      hide-on-logout,
      :onLoginClick="() => getOpenPage('map')"
    )
      .toolbar__iconWrap(:class="{'toolbar__iconWrap--active' : (currentPage === 'map')}")
          Icon.toolbar__icon(id="map" :class="{'toolbar__icon--active' : (currentPage === 'map')}")
  .toolbar__group
    Accordion(isToolbar).toolbar__accordion
      UserVisibility(
        hide-on-logout,
        :onLoginClick="() => getOpenPage('accountInformation')"
      )
        .toolbar__bottomWrap
          transition(name="toolbar__iconFade")
            Icon.toolbar__icon.toolbar__icon--bottom(
              :id="(currentPage === 'accountInformation') ? 'user-active' : 'user'",
              :key="(currentPage === 'accountInformation') ? 'user-active' : 'user'"
            )
      UserVisibility(
        hide-on-logout,
        :onLoginClick="() => getOpenPage('transactionHistory')"
      )
        .toolbar__bottomWrap
          transition(name="toolbar__iconFade")
            Icon.toolbar__icon.toolbar__icon--bottom(
              :id="(currentPage === 'transactionHistory') ? 'history-active' : 'history'",
              :key="(currentPage === 'transactionHistory') ? 'history-active' : 'history'",
            )
      .toolbar__bottomWrap
        a(
          href="https://medium.com/@atlantio"
          target="_blank"
        )
          Icon.toolbar__icon.toolbar__icon--bottom(
            id='info',
          )
    Icon.toolbar__points(id="points")
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import {sidebarSections} from '@/config';
import Accordion from 'components/Accordion';
import UserVisibility from './UserVisibility';

export default {
  data() {
    return {
      sidebarSections,
    };
  },
  computed: {
    ...mapState('misc', [
      'showSidebar',
    ]),
    ...mapGetters('misc', [
      'section',
    ]),
    ...mapGetters('membership', [
      'isLoggedIn',
    ]),
    ...mapGetters('page', [
      'currentPage',
      'isProfilePageOpened',
      'isSettingPageOpened',
      'isPageHistoryOpened',
    ]),
  },
  methods: {
    ...mapMutations('misc', [
      'toggleSidebar',
      'setSection',
    ]),
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    ...mapActions('page', [
      'getOpenPage',
    ]),
    isActive(section) {
      return (section === this.section) ? 'toolbar__icon--active' : '';
    },
    checkBeforeOpenPage(pageName) {
      if (!this.isLoggedIn) {
        this.openModal({name: 'signIn'});
        return false;
      }
      this.getOpenPage(pageName);
    },
  },
  components: {
    Accordion,
    UserVisibility,
  },
};

</script>

<style lang='scss'>
@import 'variables';

.toolbar {
  width: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 15px 0;
  padding-top: 12px;
  background-color: $background__blue;
  flex-shrink: 0;

  &__logo {
    width: 34px;
    height: 36px;
    fill: $fill__white;
    cursor: pointer;
    margin: auto;
    margin-bottom: 57px;
  }

  &__iconWrap {
    $size: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    background: transparent;
    box-shadow: 0 5px 4px transparent;
    border-radius: 2px;
    width: $size;
    height: $size;
    margin: 21px auto;
    padding: 0;
    cursor: pointer;
    transition: margin .5s linear,
                background .5s linear;

    &--active {
      background: $background__white;
      box-shadow: 0 5px 4px rgba(13, 16, 89, 0.28);
      margin: 32px auto;
      transition: margin .5s linear,
                  background .5s linear;
    }
  }

  &__icon {
    height: 20px;
    width: 20px;
    fill: $fill__white;
    transition: fill .5s;
    cursor: pointer;

    &:hover {
      transition: fill .5s;
      fill: $fill__blue_sky;
    }

    &--active {
      fill: $fill__blue;

      &:hover {
        fill: $fill__blue;
      }
    }

    &:not(:last-of-type) {
      margin-bottom: 32px;
    }

    &--bottom {
      position: absolute;

      &:hover {
        fill: $fill__white;
      }
    }
  }

  &__notifications {
    position: absolute;
    top: -2px;
    right: -5px;
    background-color: #f33a3a;
    border-radius: 10px;
    padding: 1px 4px;
    color: #ffffff;
    font-family: Roboto;
    font-size: 11px;
    font-weight: 900;
  }

  &__accordion {
    margin-bottom: 29px;
  }

  &__bottomWrap {
    position: relative;
    height: 26px;

    &:first-child {
      margin-top: 28px;
    }

    &:not(:first-child):not(:last-child){
      margin: 34px auto;
    }
  }

  &__points {
    width: 22px;
    height: 4px;
    opacity: .2;
    fill: $fill__white;
    margin: auto;
  }

  &__iconFade-enter-active, &__iconFade-leave-active {
    transition: opacity .75s;
  }

  &__iconFade-enter, &__iconFade-leave-to {
    opacity: 0;
  }
}
</style>
