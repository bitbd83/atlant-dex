// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang='pug'>
  //- PageLayout(title='Verification management', :sidebar='true')
  .verification
    div(v-if='!isAdminLoggedIn')
      .verification__label {{$t('pages.email')}}:
      input.input.verification__input(v-model='email')
      .verification__label {{$t('pages.password')}}:
      input.input.verification__input(v-model='password' type='password')
      BButton.verification__button(color='malachite' rounded @click='loginAsAdmin()') {{$t('pages.log_in_as_admin')}}
    .verification__section(v-else)
      .verification__block.verification__block--left
        .verification__title {{$t('pages.user_accounts')}}:
        .verification__users
          .verification__user(v-for='acc in users.accounts' @click='getUserAccount(acc.id)') {{acc.email}}
        Pagination.verification__pagination(v-show="pageCount > 1", :page="page", :pageCount="pageCount", :pageAction="changeActivePage")
      .verification__block
        .verification__title {{$t('pages.user_aplication')}}:
        div.verification__application(v-if="latestRequest")
          .verification__field {{$t('pages.status')}}: {{verificationStatus}}
          .verification__field {{latestRequest.firstName}} {{latestRequest.lastName}}
          .verification__field {{birthDate}}
          .verification__field {{latestRequest.address}}, {{latestRequest.city}}, {{latestRequest.country}}, {{latestRequest.postcode}}
          .verification__field {{latestRequest.phoneNumber}}
          .verification__field {{latestRequest.passportId}}
          .verification__field #[a.link(:href="latestRequest.passportScanUrl" target="_blank" rel="noopener noreferrer") {{$t('pages.passport_scan')}}]
          .verification__field #[a.link(:href="latestRequest.selfieUrl" target="_blank" rel="noopener noreferrer") {{$t('pages.selfie')}}]
          .verification__field #[a.link(:href="latestRequest.proofOfResidenceUrl" target="_blank" rel="noopener noreferrer") {{$t('pages.proof_of_residence')}}]
          BButton.verification__button(color='green' rounded @click='approve()') {{$t('pages.approve')}}
          textarea.verification__rejectReason.input(placeholder="Reason for rejection" v-model="reason")
          BButton.verification__button(color='red' rounded @click='reject()') {{$t('pages.reject')}}
        div(v-else) {{$t('pages.choose_a_different_user')}}
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import {DateTime} from 'luxon';
import BButton from 'components/BButton';
import PageLayout from 'layouts/PageLayout';
import Pagination from 'components/Pagination';

export default {
  data() {
    return {
      email: '',
      password: '',
      page: 1,
      reason: '',
    };
  },
  computed: {
    ...mapGetters('membership', [
      'isLoggedIn',
    ]),
    ...mapGetters('verify', [
      'isAdmin',
      'users',
      'limit',
      'latestRequest',
    ]),
    isAdminLoggedIn() {
      return this.isLoggedIn && this.isAdmin;
    },
    pageCount() {
      return Math.ceil(this.users.totalItems / this.limit);
    },
    birthDate() {
      return this.latestRequest.dateOfBirth ? DateTime.fromISO(this.latestRequest.dateOfBirth).toFormat('dd.LL.yyyy') : '';
    },
    verificationStatus() {
      switch (this.latestRequest.status) {
        case 0: return 'Not reviewed';
        case 1: return 'Approved';
        case 2: return 'Rejected';
      };
    },
  },
  methods: {
    ...mapActions('verify', [
      'adminLogin',
      'getUserList',
      'getUserApplication',
      'approveVerification',
      'rejectVerification',
    ]),
    loginAsAdmin() {
      this.adminLogin({
        login: this.email,
        password: this.password,
      });
    },
    changeActivePage(num) {
      this.page = num;
      this.getUserList(this.page);
    },
    getUserAccount(id) {
      this.getUserApplication(id);
    },
    approve() {
      this.approveVerification(this.latestRequest.id);
    },
    reject() {
      this.rejectVerification({
        verificationId: this.latestRequest.id,
        reason: this.reason,
      });
    },
  },
  mounted() {
  },
  components: {
    PageLayout,
    BButton,
    Pagination,
  },
};
</script>


<style lang='scss'>
.verification {
  &__block{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  &__label {
    margin-bottom: 10px;
  }
  &__input {
    display: block;
    margin-bottom: 10px;
  }
  &__button {
    display: block;
    margin-top: 20px;
    width: 150px;
  }
  &__title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  &__users {
    height: 230px;
  }
  &__user {
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  &__pagination {
    align-self: center;
  }
  // &__application{
  //   display: flex;
  //   flex-direction: column;
  // }
  &__field {
    margin-bottom: 10px;
  }
  &__rejectReason {
    margin-top: 30px;
    width: 100%;
    resize: none;
  }
}
</style>
