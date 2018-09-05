// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
ContentLayout(title="Profile")
  .profile
      Accordion(title="Main").profile__accordion
        .profile__content
          .profile__item
            .profile__param Account ID:
            .profile__value.profile__value--fullWidth
              .profile__value--half {{account.id}}
          .profile__itemRow
            .profile__item.profile__item--other
              .profile__param Full Name:
              .profile__value.profile__value--fullWidth
                .profile__value(v-if="account.fullName.value") {{account.fullName.value}}
            .profile__item.profile__item--other
              .profile__param Registration date:
              .profile__value.profile__value--half
                .profile__value {{regdate}}
          .profile__item.profile__item--other
            .profile__param Email:
            .profile__value.profile__value--inline {{account.email.value}} #[Icon.profile__iconVerified(v-if="account.email.verified" id="icon-status-verified")]
          .profile__item
            .profile__param Verification status:
            .profile__value.profile__value--inline
              .profile__rating(:class="`profile__rating--${account.verificationRating}`") Tier {{account.verificationRating}}
              //- .profile__rating(v-show="account.verificationRating") Tier {{account.verificationRating}}
              .link.profile__action(v-show="account.verificationRating < 3 || typeof account.verificationRating == 'undefined'" @click="getOpenPage('verification')") Upgrade
          .profile__item.profile__item--other
            ProfilePageChangePhone
          //- .profile__item
          //-   .profile__param Theme:
          //-   .profile__value.profile__value--inline
          //-     select(v-model="appTheme")
          //-       option(value="default") Default
          //-       option(value="dark") Dark
      Accordion(title="Other").profile__accordion
        .profile__content
          .profile__other
            .profile__item.profile__item--other
              .profile__param I would like to receive:
              Checkbox.profile__checkbox(
                :value="account.subscribe.newsletter",
                @change="setNewsletterSubscription"
              ) #[.profile__text Email newsletter]
              Checkbox.profile__checkbox(v-model="account.subscribe.email") #[.profile__text Email notification]
              Checkbox.profile__checkbox(v-model="account.subscribe.sms") #[.profile__text SMS notification]
            .profile__item.profile__item--other
              .profile__param Preferred currency:
              .profile__value.profile__value--inline
                FlagSwitch.profile__dropdown(
                  type="currency",
                  :value="getCurrencyCountry",
                  @input="setPrefCurrencyFromFlag",
                  isColorBlack=""
                )
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex';
import {DateTime} from 'luxon';
import {getCountryByCurrency, getCountryCurrency} from 'services/countries';
import ContentLayout from 'layouts/ContentLayout';
import Accordion from 'components/Accordion';
import Checkbox from 'components/Checkbox';
import BButton from 'components/BButton';
import FlagSwitch from 'components/FlagSwitch';
import ProfilePageChangePhone from 'components/ProfilePageChangePhone';

export default {
  computed: {
    ...mapState('user', {
      account: 'account',
      theme: 'theme',
    }),
    ...mapState('geo', {
      countries: 'countries',
    }),
    regdate() {
      return DateTime.fromISO(this.account.regDate).toFormat('dd LLL. yyyy');
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
    ContentLayout,
    Accordion,
    Checkbox,
    BButton,
    FlagSwitch,
    ProfilePageChangePhone,
  },
};
</script>


<style lang="scss">
@import 'variables';

.profile {
  &__accordion {
    margin-bottom: 56px;
  }
  &__content {
    margin-top: 46px;
  }
  &__main {
    width: 100%;
  }
  &__itemRow {
    display: flex;
  }
  &__item {
    font-size: 14px;
    line-height: 19px;
    margin-bottom: 50px;

    &--other {
      min-width: 310px;
    }
  }
  &__param {
    font-weight: 700;
    font-size: 12px;
    color: $color__black;
    line-height: 19px;
    text-transform: uppercase;
    margin-bottom: 23px;
  }
  &__value {
    font-family: "Century Gothic";
    font-size: 14px;
    color: $color__black;
    letter-spacing: 0.5px;
    line-height: 19px;
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
  &__action {
    margin-left: 19px;
  }
  &__iconMain {
    $size: 44px;
    height: $size;
    width: $size;
    margin-right: 38px;
    margin-bottom: 40px;
  }
  &__iconVerified {
    width: 10px;
    height: 9px;
    margin: 0 20px;
  }
  &__rating {
    min-width: 101px;
    border-radius: 2px;
    padding: 6px;
    font-weight: 700;
    font-size: 14px;
    color: $color__white;
    letter-spacing: 6px;
    text-align: center;
    text-transform: uppercase;
    background: $background__blue;
    &--2 {
      background: $background__green;
    }
    &--3 {
      background: $background__orange;
    }
  }
  &__checkbox {
    margin-bottom: 51px;
    &:first-of-type {
      margin-top: 30px;
    }
  }
  &__text {
    margin-left: 15px;
  }
  &__other {
    display: flex;
    align-items: flex-start;
  }
  // &__button {
  //   padding: 8px 44px;
  //   font-size: 16px;
  //   font-weight: 900;
  //   text-transform: uppercase;
  //   margin-top: 20px;
  // }
  &__dropdown {
    // width: 40px;
    margin-top: 5px;
  }
}
</style>
