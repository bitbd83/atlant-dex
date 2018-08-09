// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang='pug'>
.index(:class="`index--${theme}`")
  .index__body
    Sidebar
    .index__content
      TheHeader
      .index__page
        MainLayout(v-if="!isPageOpened()")
        TransactionHistoryPage(v-else-if="isPageOpened('transactionHistory')")
        MyOrdersPage(v-else-if="isPageOpened('myOrders')")
        VerificationPage(v-else-if="isPageOpened('verification')")
        VerificationAdminPage(v-else-if="isPageOpened('verificationAdmin')")
        AccountInformation(v-else-if="isPageOpened('accountInformation')")
        SecuritySettingsPage(v-else-if="isPageOpened('securitySettings')")
        SecurityLogPage(v-else-if="isPageOpened('securityLog')")
        FAQ(v-else-if="isPageOpened('faq')")
        NotificationHistoryPage(v-else-if="isPageOpened('notificationHistory')")
    //- Modals
    ResetModal(v-if="isModalOpened('reset')")
    NewPasswordModal(v-else-if="isModalOpened('newPassword')")
    SignUpModal(v-else-if="isModalOpened('signUp')")
    SignInModal(v-else-if="isModalOpened('signIn')")
    CryptoDepositModal(v-else-if="isModalOpened('cryptoDeposit')")
    CryptoWithdrawModal(v-else-if="isModalOpened('cryptoWithdraw')")
    FiatModal(v-else-if="isModalOpened('fiat')")
    TFAModal(v-else-if="isModalOpened('tfaModal')")
    TFAWarningModal(v-else-if="isModalOpened('tfaWarningModal')")
    EventStatusCompletedModal(v-else-if="isModalOpened('eventStatusCompleted')")
    EventStatusFailedModal(v-else-if="isModalOpened('eventStatusFailed')")
    AddNewAlertModal(v-else-if="isModalOpened('addAlert')")
    SaveViewModal(v-else-if="isModalOpened('saveView')")
    Status(v-else-if="isModalOpened('status')")
</template>

<script>
import i18n from '@/i18n';
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import {notification} from 'services/notification';
// import * as Trade from 'services/api/trade';
import {showWelcome} from '@/config';
import TheHeader from 'components/TheHeader';
import Sidebar from 'components/Sidebar';
import TransactionHistoryPage from 'pages/TransactionHistoryPage';
import MyOrdersPage from 'pages/MyOrdersPage';
import NotificationHistoryPage from 'pages/NotificationHistoryPage';
import VerificationPage from 'pages/VerificationPage';
import VerificationAdminPage from 'pages/VerificationAdminPage';
import AccountInformation from 'pages/AccountInformationPage';
import SecuritySettingsPage from 'pages/SecuritySettingsPage';
import SecurityLogPage from 'pages/SecurityLogPage';
import MainLayout from 'layouts/MainLayout';
import ResetModal from 'modals/ResetModal';
import NewPasswordModal from 'modals/NewPasswordModal';
import SignUpModal from 'modals/SignUpModal';
import SignInModal from 'modals/SignInModal';
import CryptoDepositModal from 'modals/CryptoDepositModal';
import CryptoWithdrawModal from 'modals/CryptoWithdrawModal';
import FiatModal from 'modals/FiatModal';
import TFAModal from 'modals/TFAModal';
import TFAWarningModal from 'modals/TFAWarningModal';
import EventStatusCompletedModal from 'modals/EventStatusCompletedModal';
import EventStatusFailedModal from 'modals/EventStatusFailedModal';
import AddNewAlertModal from 'modals/AddNewAlertModal';
import SaveViewModal from 'modals/SaveViewModal';
import Status from 'components/Status';
import {signalRNotification} from '@/store/staticData/signalRNotification';

export default {
  computed: {
    ...mapState('misc', {
      showSidebar: 'showSidebar',
      currentPage: 'currentPage',
    }),
    ...mapState('tradeInfo', {
      pair: 'pair',
    }),
    ...mapState('membership', {
      token: 'token',
    }),
    ...mapState('user', {
      account: 'account',
      notificationsCounter: 'notificationsCounter',
      theme: 'theme',
    }),
    ...mapGetters('user', [
      'isTFAEnabled',
    ]),
    ...mapGetters('membership', {
      isLoggedIn: 'isLoggedIn',
    }),
    ...mapGetters('modal', {
      isModalOpened: 'isOpened',
    }),
    ...mapGetters('page', {
      isPageOpened: 'isOpened',
    }),
  },
  methods: {
    ...mapMutations('misc', {
      setSidebar: 'setSidebar',
    }),
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    ...mapMutations('tradeInfo', {
      setPair: 'setPair',
      setDesktopData: 'setDesktopData',
      setOHLC: 'setOHLC',
      addNewPrices: 'addNewPrices',
    }),
    ...mapMutations('orders', {
      addActiveOrder: 'addActiveOrder',
      changeOrderStatus: 'changeOrderStatus',
      addNewTrade: 'addNewTrade',
    }),
    ...mapMutations('user', {
      changePortfolio: 'changePortfolio',
    }),
    ...mapMutations('alerts', [
      'updateSidebarAlert',
    ]),
    ...mapActions('membership', [
      'dropUser',
      'setRefreshTimeout',
    ]),
    ...mapActions('localization', [
      'setLang',
    ]),
    ...mapActions('user', [
      'getTokens',
      'getProfileData',
      'getCurrencies',
    ]),
    ...mapActions('alerts', [
      'insertSidebarAlert',
      'resetAlertsList',
    ]),
    updateOverflow() {
      // document.querySelector('#app').style.overflow = this.showSidebar ? 'hidden' : null;
    },
    hubSubscribe() {
      // add signalR events here
      this.$hub.on('newNotification', (data) => {
        if (signalRNotification[data.notificationType]) {
          notification({
            text: i18n.t(`notifications.${signalRNotification[data.notificationType]}`, i18n.locale, data.arguments),
            type: 'info',
          });
        };
      });
      this.$hub.on('newOrder', (data) => {
        this.addActiveOrder(data);
      });
      this.$hub.on('orderChanged', (data) => {
        this.changeOrderStatus(data);
      });
      this.$hub.on('newTrade', (data) => {
        this.addNewTrade(data);
      });
      this.$hub.on('newBalance', (data) => {
        this.changePortfolio(data);
      });
      this.$hub.on('newTradeStatistic', (data) => {
      });
      this.$hub.on('orderBookChanged', (data) => {
      });
      this.$hub.on('newAlert', (data) => {
        this.insertSidebarAlert(data);
        this.resetAlertsList();
      });
      this.$hub.on('alertTriggered', (data) => {
        this.updateSidebarAlert(data);
      });
    },
  },
  watch: {
    pair() {
      this.$hub.invoke('setPair', this.pair);
    },
    token() {
      if (this.token) {
        this.$hub.invoke('authenticate', this.token);
      }
    },
    showSidebar() {
      this.updateOverflow();
    },
    isLoggedIn(isTrue) {
      if (!isTrue) {
        this.openModal({name: 'signIn'});
        notification({
          text: 'Logged out',
        });
      } else {
        this.getProfileData().then((response) => {
          if (!this.isTFAEnabled) {
            this.openModal({name: 'tfaWarningModal'});
          }
          return response;
        });
      }
    },
  },
  created() {
    this.setLang();
    this.hubSubscribe();

    if (this.isLoggedIn) {
      this.setRefreshTimeout();
      this.getProfileData();
      this.getCurrencies();
    };

    this.$hub.start().then(() => {
      // this.$hub.invoke('newNotification', 'newMessage');
      // if (this.isLoggedIn) {
      //   this.$hub.setToken(this.token);
      // }
    });
  },
  mounted() {
    if (showWelcome) {
      this.openModal('welcome');
    }
    this.updateOverflow();
  },
  components: {
    TheHeader,
    Sidebar,
    MainLayout,
    TransactionHistoryPage,
    MyOrdersPage,
    NotificationHistoryPage,
    VerificationPage,
    VerificationAdminPage,
    AccountInformation,
    SecuritySettingsPage,
    SecurityLogPage,
    Status,
    ResetModal,
    NewPasswordModal,
    SignUpModal,
    SignInModal,
    CryptoDepositModal,
    CryptoWithdrawModal,
    FiatModal,
    TFAModal,
    TFAWarningModal,
    EventStatusCompletedModal,
    EventStatusFailedModal,
    AddNewAlertModal,
    SaveViewModal,
  },
};
</script>

<style src="noty/lib/noty.css"></style>
<style lang='scss'>
@import 'perfect-scrollbar/dist/css/perfect-scrollbar';
@import 'styles/fonts';
@import 'styles/defaults';
@import 'styles/global';
@import 'styles/overrides';
@import 'variables';

.index {
  background-image: url('~assets/images/pattern.png');
  position: relative;
  display: flex;
  min-width: 1000px;
  min-height: 700px;
  height: 100vh;

  &--dark{
    background-image: none;
    background: $background__dark;
  }

  &__body {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: auto;
    margin-left: auto;
    margin-right: auto;
  }
  &__content {
    position: relative;
    display: flex;
    flex: 2;
    flex-direction: column;
    z-index: 0;
  }
  &__page {
    display: flex;
    flex: 2;
  }
}
</style>
