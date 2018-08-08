// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.page
  PageLayoutNavigation
  .page__body
    TransactionHistoryPage(v-if="isPageOpened('transactionHistory')")
    MyOrdersPage(v-else-if="isPageOpened('myOrders')")
    VerificationPage(v-else-if="isPageOpened('verification')")
    VerificationAdminPage(v-else-if="isPageOpened('verificationAdmin')")
    AccountInformation(v-else-if="isPageOpened('accountInformation')")
    SecuritySettingsPage(v-else-if="isPageOpened('securitySettings')")
    SecurityLogPage(v-else-if="isPageOpened('securityLog')")
    AlertsList(v-else-if="isPageOpened('alertsList')")
    FAQ(v-else-if="isPageOpened('faq')")
    NotificationHistoryPage(v-else-if="isPageOpened('notificationHistory')")
  .page__leftPanel
    Logout
</template>

<script>
import {mapGetters} from 'vuex';
import {scrollbar} from '@/directives';
import Logout from 'components/Logout';
import PageLayoutNavigation from 'components/PageLayoutNavigation';
import TransactionHistoryPage from 'pages/TransactionHistoryPage';
import MyOrdersPage from 'pages/MyOrdersPage';
import NotificationHistoryPage from 'pages/NotificationHistoryPage';
import VerificationPage from 'pages/VerificationPage';
import VerificationAdminPage from 'pages/VerificationAdminPage';
import AccountInformation from 'pages/AccountInformationPage';
import SecuritySettingsPage from 'pages/SecuritySettingsPage';
import SecurityLogPage from 'pages/SecurityLogPage';
import AlertsList from 'pages/AlertsList';

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
    Logout,
    PageLayoutNavigation,
    TransactionHistoryPage,
    MyOrdersPage,
    NotificationHistoryPage,
    VerificationPage,
    VerificationAdminPage,
    AccountInformation,
    SecuritySettingsPage,
    SecurityLogPage,
    AlertsList,
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
    flex: 2;
    display: flex;
    flex-direction: column;
  }
  &__leftPanel {
    padding: 20px 29px;
  }
}
</style>
