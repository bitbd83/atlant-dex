// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
PageLayout(title="Account information", :sidebar="true")
  .accountInfo
    .accountInfo__title {{$t('pages.general_information')}}
    .accountInfo__content
      Icon.accountInfo__iconMain(id="account")
      .accountInfo__main
        .accountInfo__item
          .accountInfo__param {{$t('pages.account_id')}}:
          .accountInfo__value.accountInfo__value--fullWidth
            .accountInfo__value--half {{account.id}}
            span.accountInfo__registration {{$t('pages.registration_date')}}: {{regdate}}
        .accountInfo__item(v-if="account.fullName.value")
          .accountInfo__param {{$t('pages.full_name')}}:
          .accountInfo__value.accountInfo__value--fullWidth
            .accountInfo__value {{account.fullName.value}}
        .accountInfo__item
          .accountInfo__param {{$t('pages.verification_status')}}:
          .accountInfo__value.accountInfo__value--inline
            .accountInfo__rating(v-show="account.verificationRating") {{$t('pages.tier')}} {{account.verificationRating}}
            .link.accountInfo__action(v-show="account.verificationRating < 3 || typeof account.verificationRating == 'undefined'" @click="getOpenPage('verification')") {{$t('pages.upgrade')}}
        .accountInfo__item
          .accountInfo__param {{$t('pages.email')}}:
          .accountInfo__value.accountInfo__value--inline {{account.email.value}} #[Icon.accountInfo__icon(v-if="account.email.verified" id="verified")]
        .accountInfo__item
          .accountInfo__param {{$t('pages.theme')}}:
          .accountInfo__value.accountInfo__value--inline
            select(v-model="appTheme")
              option(value="default") {{$t('pages.default')}}
              option(value="dark") {{$t('pages.dark')}}
        .accountInfo__item
          AccountInformationPageChangePhone
        .accountInfo__title {{$t('pages.other')}}
        .accountInfo__other
          .accountInfo__item.accountInfo__item--other
            .accountInfo__param {{$t('pages.i_would_like_to_receive')}}:
            Checkbox.accountInfo__checkbox(
              :value="account.subscribe.newsletter",
              @change="setNewsletterSubscription"
            ) #[.accountInfo__text {{$t('pages.email_newsletter')}}]
            Checkbox.accountInfo__checkbox(v-model="account.subscribe.email") #[.accountInfo__text {{$t('pages.email_notification')}}]
            Checkbox.accountInfo__checkbox(v-model="account.subscribe.sms") #[.accountInfo__text {{$t('pages.s_m_s_notification')}}]
          .accountInfo__item.accountInfo__item--other
            .accountInfo__param {{$t('pages.preferred_currency')}}:
            .accountInfo__value.accountInfo__value--inline
              FlagSwitch.accountInfo__dropdown(
                type="currency",
                :value="getCurrencyCountry",
                @input="setPrefCurrencyFromFlag"
              )
        // BButton.accountInfo__button(color="malachite" rounded) Save
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex';
import {DateTime} from 'luxon';
import {getCountryByCurrency, getCountryCurrency} from 'services/countries';
import Checkbox from 'components/Checkbox';
import BButton from 'components/BButton';
import FlagSwitch from 'components/FlagSwitch';
import AccountInformationPageChangePhone from 'components/AccountInformationPageChangePhone';
import PageLayout from 'layouts/PageLayout';

export default {
  computed: {
    ...mapState('user', {
      account: 'account',
      theme: 'theme',
    }),
    regdate() {
      return DateTime.fromISO(this.account.regDate).toFormat('dd.LL.yyyy');
    },
    getCurrencyCountry() {
      return getCountryByCurrency(this.account.currency);
    },
    getCountryCurrency() {
      return getCountryCurrency(this.getCurrencyCountry);
    },
    appTheme: {
      get() {
        return this.theme;
      },
      set(val) {
        this.setTheme(val);
      },
    },
  },
  methods: {
    ...mapMutations(
      'user',
      ['setTheme']
    ),
    ...mapActions('user', [
      'setPreferredCurrency',
      'setNewsletterSubscription',
    ]),
    ...mapActions('user', [
      'getProfileData',
    ]),
    ...mapActions('page', [
      'getOpenPage',
    ]),
    setPrefCurrencyFromFlag(value) {
      this.setPreferredCurrency(getCountryCurrency(value));
    },
  },
  created() {
    this.getProfileData();
  },
  components: {
    PageLayout,
    Checkbox,
    BButton,
    FlagSwitch,
    AccountInformationPageChangePhone,
  },
};
</script>


<style lang="scss">

.accountInfo {
  max-width: 600px;
  &__title {
    font-size: 16px;
    font-weight: 700;
    line-height: 25px;
    text-transform: uppercase;
    margin-bottom: 40px;
  }
  &__content {
    display: flex;
  }
  &__main {
    width: 100%;
  }
  &__item {
    font-size: 14px;
    line-height: 19px;
    margin-bottom: 43px;
    &--other {
      width: 50%;
    }
  }
  &__param {
    font-weight: 700;
  }
  &__value {
    margin-top: 18px;
    font-weight: 400;
    &--inline {
      display: flex;
      align-items: center;
    }
    &--fullWidth {
      display: flex;
      align-items: center;
    }
    &--half{
      width: 50%;
    }
  }
  &__registration {
    color: #fff; // #054465;
  }
  &__action {
    margin-left: 19px;
  }
  &__icon{
    $size: 13px;
    height: $size;
    width: $size;
    margin-left: 14px;
  }
  &__iconMain {
    $size: 44px;
    height: $size;
    width: $size;
    margin-right: 38px;
    margin-bottom: 40px;
  }
  &__rating {
    min-width: 60px;
    border-radius: 2px;
    padding: 3px 8px;
    background-color: #ffc600;
    color: #032f47;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 900;
    line-height: 19px;
    text-transform: uppercase;
  }
  &__checkbox {
    margin-top: 20px;
  }
  &__text {
    margin-left: 15px;
  }
  &__other {
    display: flex;
    align-items: flex-start;
  }
  &__button {
    padding: 8px 44px;
    font-size: 16px;
    font-weight: 900;
    text-transform: uppercase;
    margin-top: 20px;
  }
  &__dropdown {
    width: 40px;
    margin-left: 10px;
  }
}
</style>
