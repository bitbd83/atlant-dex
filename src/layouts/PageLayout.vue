// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.page
  .page__body
    PageNavigation(v-scrollbar="")
    .page__content(v-scrollbar="")
      TransactionHistoryPage(v-if="isPageOpened('transactionHistory')")
      MyOrdersPage(v-else-if="isPageOpened('myOrders')")
      VerificationPage(v-else-if="isPageOpened('verification')")
      VerificationAdminPage(v-else-if="isPageOpened('verificationAdmin')")
      AccountInformation(v-else-if="isPageOpened('accountInformation')")
      SecuritySettingsPage(v-else-if="isPageOpened('securitySettings')")
      SecurityLogPage(v-else-if="isPageOpened('securityLog')")
      FAQ(v-else-if="isPageOpened('faq')")
      NotificationHistoryPage(v-else-if="isPageOpened('notificationHistory')")
    .page__rigthPanel
      Logout.page__logout
</template>

<script>
import {mapGetters} from 'vuex';
import {scrollbar} from '@/directives';
import PageNavigation from 'components/PageLayoutNavigation';
import TransactionHistoryPage from 'pages/TransactionHistoryPage';
import MyOrdersPage from 'pages/MyOrdersPage';
import NotificationHistoryPage from 'pages/NotificationHistoryPage';
import VerificationPage from 'pages/VerificationPage';
import VerificationAdminPage from 'pages/VerificationAdminPage';
import AccountInformation from 'pages/AccountInformationPage';
import SecuritySettingsPage from 'pages/SecuritySettingsPage';
import SecurityLogPage from 'pages/SecurityLogPage';
import Logout from 'components/Logout.vue';

export default {
  computed: {
    ...mapGetters('page', {
      isPageOpened: 'isOpened',
    }),
  },
  props: {
    title: {
      type: String,
      default: '',
      required: false,
    },
  },
  directives: {
    scrollbar,
  },
  components: {
    PageNavigation,
    TransactionHistoryPage,
    MyOrdersPage,
    NotificationHistoryPage,
    VerificationPage,
    VerificationAdminPage,
    AccountInformation,
    SecuritySettingsPage,
    SecurityLogPage,
    Logout,
  },
};
</script>

<style lang="scss">
@import 'variables';
.page {
  position: relative;
  display: flex;
  flex: 2;
  &__body {
    display: flex;
    flex: 2;
  }
  &__content {
    position: relative;
    display: flex;
    flex: 2;
  }
  &__logout {
    padding: 20px 29px;
  }
}
</style>
