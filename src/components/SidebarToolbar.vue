// Copyright 2017, 2018 Tensigma Ltd.

// Licensed under the Microsoft Reference Source License (MS-RSL)

// This license governs use of the accompanying software. If you use the software, you accept this license.
// If you do not accept the license, do not use the software.

// 1. Definitions
// The terms "reproduce," "reproduction," and "distribution" have the same meaning here as under U.S. copyright law.
// "You" means the licensee of the software.
// "Your company" means the company you worked for when you downloaded the software.
// "Reference use" means use of the software within your company as a reference, in read only form, for the sole purposes
// of debugging your products, maintaining your products, or enhancing the interoperability of your products with the
// software, and specifically excludes the right to distribute the software outside of your company.
// "Licensed patents" means any Licensor patent claims which read directly on the software as distributed by the Licensor
// under this license.

// 2. Grant of Rights
// (A) Copyright Grant- Subject to the terms of this license, the Licensor grants you a non-transferable, non-exclusive,
// worldwide, royalty-free copyright license to reproduce the software for reference use.
// (B) Patent Grant- Subject to the terms of this license, the Licensor grants you a non-transferable, non-exclusive,
// worldwide, royalty-free patent license under licensed patents for reference use.

// 3. Limitations
// (A) No Trademark License- This license does not grant you any rights to use the Licensor’s name, logo, or trademarks.
// (B) If you begin patent litigation against the Licensor over patents that you think may apply to the software
// (including a cross-claim or counterclaim in a lawsuit), your license to the software ends automatically.
// (C) The software is licensed "as-is." You bear the risk of using it. The Licensor gives no express warranties,
// guarantees or conditions. You may have additional consumer rights under your local laws which this license cannot
// change. To the extent permitted under your local laws, the Licensor excludes the implied warranties of merchantability,
// fitness for a particular purpose and non-infringement.

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
  width: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 15px 0;
  padding-top: 33px;
  background-color: $background__blue;
  flex-shrink: 0;

  &__logo {
    width: 27px;
    height: 29px;
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
