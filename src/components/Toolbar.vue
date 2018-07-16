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
    Icon.toolbar__icon(
      :id="(showSidebar) ? 'cross' : 'hamburger'",
      @click='toggleSidebar',
    )
    UserVisibility(
      v-for="section in sidebarSections",
      :key="section.name",
      :hide-on-logout="!section.isShowOnLogout"
    )
      Icon.toolbar__icon(
        :id="section.name",
        :class="isActive(section.name)",
        @click="setSection(section.name)",
      )
  .toolbar__group
    UserVisibility(
      hide-on-logout,
      :onLoginClick="() => getOpenPage('notificationHistory')"
    )
      .toolbar__iconWrap
        Icon.toolbar__icon(
          id='icon-notification',
          :class="{'toolbar__icon--active': (currentPage === 'notificationHistory')}",
        )
        .toolbar__notifications(v-show="notificationsCounter > 0") {{(notificationsCounter > 10) ? '9+' : notificationsCounter}}
    UserVisibility(
      hide-on-logout,
      :onLoginClick="() => getOpenPage('accountInformation')"
    )
      Icon.toolbar__icon(
        id='user',
        :class="{'toolbar__icon--active': isProfilePageOpened}"
      )
    //- UserVisibility(:onLoginClick="() => getOpenPage('securitySettings')")
    //-   Icon.toolbar__icon(
    //-     id='settings',
    //-     :class="{'toolbar__icon--active': isSettingPageOpened}",
    //-   )
    Icon.toolbar__icon(
      id='info',
      @click="getOpenPage('transactionHistory')",
      :class="{'toolbar__icon--active': isPageHistoryOpened}",
    )
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex';
import {sidebarSections} from '@/config';
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
    ...mapState('user', [
      'notificationsCounter',
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
    ...mapMutations('page', {
      openPage: 'open',
    }),
    ...mapMutations('modal', {
      openModal: 'open',
    }),
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
    getOpenPage(name) {
      this.openPage({name});
    },
  },
  components: {
    UserVisibility,
  },
};

</script>

<style lang='scss'>
@import 'variables';

.toolbar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 15px 0;
  background-color: $color_blue;
  background-image: linear-gradient(to top, #01253A 0%, #03354F 100%);
  border-left: 1px solid $color_tangaroa;
  z-index: 1;
  flex-shrink: 0;
  &__iconWrap {
    cursor: pointer;
    position: relative;
    margin-bottom: 32px;
  }
  &__icon {
    $size: 20px;
    height: $size;
    width: $size;
    fill: #fff;
    &--active {
      fill: #e9bd24;
    }
    &:not(:last-of-type) {
      margin-bottom: 32px;
    }
    &:hover {
      cursor: pointer;
      fill: #e9bd24;
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
}
</style>
