<template lang='pug'>
.main
  .main__body(v-show="modalOpenedDesktop || !isModalOpened()", :class="{'main__body--modalOpened': modalOpenedDesktop}")
    Sidebar
    .main__content
      .main__page
        MainLayout(v-if="!isPageOpened()")
        TransactionHistoryPage(v-if="isPageOpened('transactionHistory')")
        MyOrdersPage(v-if="isPageOpened('myOrders')")
        VerificationPage(v-if="isPageOpened('verification')")
        VerificationAdminPage(v-if="isPageOpened('verificationAdmin')")
        AccountInformation(v-if="isPageOpened('accountInformation')")
        SecuritySettingsPage(v-if="isPageOpened('securitySettings')")
        SecurityLogPage(v-if="isPageOpened('securityLog')")
        FAQ(v-if="isPageOpened('faq')")
        NotificationHistoryPage(v-if="isPageOpened('notificationHistory')")
      TheFooter
  //- Modals
  InDemoModal(v-if="isModalOpened('inDemo')")
  ResetModal(v-else-if="isModalOpened('reset')")
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
  Status(v-else-if="isModalOpened('status')")
</template>

<script>
import i18n from '@/i18n';
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import {notification, getSignalRNotification} from 'services/notification';
// import * as Trade from 'services/api/trade';
import {showWelcome} from '@/config';
import TheFooter from 'components/TheFooter';
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
import InDemoModal from 'modals/InDemoModal';
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
import Status from 'components/Status';

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
    modalOpenedDesktop() {
      return this.isModalOpened();
    },
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
    ...mapActions('membership', {
      dropUser: 'dropUser',
    }),
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
        if (getSignalRNotification(data.notificationType)) {
          notification({
            text: i18n.t(`notifications.${getSignalRNotification(data.notificationType)}`, i18n.locale, data.arguments),
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
    modalChangeStyleforBody() {
      document.querySelector('body').style.overflow = (this.isModalOpened()) ? 'hidden' : 'auto';
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
    modalOpenedDesktop() {
      this.modalChangeStyleforBody();
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
    TheFooter,
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
    InDemoModal,
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

.main {
  position: relative;
  display: flex;
  height: 100vh;
  &__body {
    display: flex;
    width: 100%;
    height: 100%;
    // min-width: 1250px;
    // min-height: 750px;
    overflow: auto;
    margin-left: auto;
    margin-right: auto;
    &--modalOpened {
      filter: blur(10px);
    }
  }
  &__content {
    position: relative;
    display: flex;
    flex: 2;
    flex-direction: column;
  }
  &__page {
    display: flex;
    flex: 2;
  }
}
</style>
