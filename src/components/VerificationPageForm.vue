<template lang="pug">
table
  tr
    td
      .verificationForm__label First Name:
    td
      input.input.verificationForm__input.verificationForm__rowPaddings(
        type="text",
        v-model="verification.firstName",
        :class="{'input--error' : validations.verification.firstName.$error}",
      )
      icon.verificationForm__iconCheck(id="icon-form-check" :class="{'verificationForm__iconCheck--done': !validations.verification.firstName.$invalid}")
  tr
    td
      .verificationForm__label Last Name:
    td
      input.input.verificationForm__input.verificationForm__rowPaddings(
        type="text"
        v-model="verification.lastName"
        :class="{'input--error' : validations.verification.lastName.$error}",
      )
      icon.verificationForm__iconCheck(id="icon-form-check" :class="{'verificationForm__iconCheck--done': !validations.verification.lastName.$invalid}")
  tr
    td
      .verificationForm__label Country:
    td
      VerificationPageFormCustomInput.verificationForm__rowPaddings(
        v-model="verification.country",
        :list="getCountriesArray",
        :isError="validations.verification.country.$error",
        :isLoading="countriesLoading",
      )
      icon.verificationForm__iconCheck(id="icon-form-check" :class="{'verificationForm__iconCheck--done': !validations.verification.country.$invalid}")
  tr
    td
      .verificationForm__label City:
    td
      VerificationPageFormCustomInput.verificationForm__rowPaddings(
        v-model="verification.city",
        :list="countryCities",
        :isError="validations.verification.city.$error",
        :isLoading="citiesLoading",
      )
      icon.verificationForm__iconCheck(id="icon-form-check" :class="{'verificationForm__iconCheck--done': !validations.verification.city.$invalid}")
  tr
    td
      .verificationForm__label Street Address:
    td
      input.input.verificationForm__input.verificationForm__rowPaddings(
        type="text"
        v-model="verification.address"
        :class="{'input--error' : validations.verification.address.$error}",
      )
      icon.verificationForm__iconCheck(id="icon-form-check" :class="{'verificationForm__iconCheck--done': !validations.verification.address.$invalid}")
  tr
    td
      .verificationForm__label Postcode:
    td
      input.input.verificationForm__input.verificationForm__rowPaddings(
        type="text"
        v-model="verification.postCode"
        :class="{'input--error' : validations.verification.postCode.$error}",
      )
      icon.verificationForm__iconCheck(id="icon-form-check" :class="{'verificationForm__iconCheck--done': !validations.verification.postCode.$invalid}")
  tr
    td
      .verificationForm__label Phone Number:
    td
      .verificationForm__container.verificationForm__rowPaddings
        .input.verificationForm__input(:class="{'input--error' : validations.verification.phoneNumber.$error}")
          img.verificationForm__inputImg(v-if="getCountryCode", :src="`/static/flags/${getCountryCode}.png`")
          | {{getCountryPhoneCode}}
          input(type="text" v-model="verification.phoneNumber" style="width: 100%")
        icon.verificationForm__iconCheck(id="icon-form-check" :class="{'verificationForm__iconCheck--done': !validations.verification.phoneNumber.$invalid}")
  tr
    td
      .verificationForm__label Date of Birth:
    td
      .verificationForm__container.verificationForm__rowPaddings
        .input.verificationForm__dataInput.verificationForm__dataInput--day(:class="{'input--error' : validations.verification.day.$error}")
          Dropdown.verificationForm__dropdown--day(
            placeholder="Day",
            :options="birthdayDays",
            v-model="verification.day",
            isColorBlack="",
            searchable="",
            :preselectFirs="false"
            isSmallTriangle="",
            no-border="",
            no-padding="",
          )
        .input.verificationForm__dataInput.verificationForm__dataInput--month(:class="{'input--error' : validations.verification.month.$error}")
          Dropdown.verificationForm__dropdown--month(
            placeholder="Month",
            :options="birthdayMonths",
            v-model="verification.month",
            isColorBlack="",
            searchable=""
            :preselectFirs="false"
            isSmallTriangle=""
          )
        .input.verificationForm__dataInput.verificationForm__dataInput--year(:class="{'input--error' : validations.verification.year.$error}")
          Dropdown.verificationForm__dropdown--year(
            placeholder="Year",
            :options="birthdayYears",
            v-model="verification.year",
            isColorBlack="",
            searchable=""
            :preselectFirs="false"
            isSmallTriangle=""
          )
      icon.verificationForm__iconCheck(id="icon-form-check" :class="{'verificationForm__iconCheck--done': !validations.verification.dateOfBirth.$invalid}")
    tr
      td
        .verificationForm__label ID or Passport #:
      td
        input.input.verificationForm__input.verificationForm__rowPaddings(
          type="text"
          v-model="verification.passportId"
          :class="{'input--error' : validations.verification.passportId.$error}"
        )
        icon.verificationForm__iconCheck(id="icon-form-check" :class="{'verificationForm__iconCheck--done': !validations.verification.passportId.$invalid}")
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex';
import {birthdayMonths, birthdayDays, birthdayYears} from '@/store/staticData/birthday.js';
import VerificationPageFormCustomInput from 'components/VerificationPageFormCustomInput';
import Dropdown from 'components/Dropdown';

export default {
  data() {
    return {
      birthdayYears,
      birthdayMonths,
      birthdayDays,
    };
  },
  computed: {
    ...mapState('verify', {
      verificationState: 'verification',
    }),
    ...mapState('geo', [
      'countries',
      'cities',
      'countriesLoading',
      'citiesLoading',
    ]),
    verification: {
      get() {
        return this.verificationState;
      },
      set(value) {
        this.updateVerificationData(value);
      },
    },
    dateOfBirth() {
      let year = this.verificationState.year;
      let month = this.verificationState.month;
      let day = this.verificationState.day;

      return (year && month && day) ? `${year}-${this.birthdayMonths.indexOf(month) + 1}-${day}` : false;
    },
    getCountriesArray() {
      return this.countries.map((el) => el.name);
    },
    getCountryCode() {
      let countryObj = this.countries.find((el) => el.name == this.verification.country);
      return countryObj ? countryObj.code : '';
    },
    getCountryPhoneCode() {
      let countryObj = this.countries.find((el) => el.name == this.verification.country);
      return countryObj ? '+' + countryObj.phoneCode : '';
    },
    countryCities() {
      const cities = this.cities[this.verification.country];
      return cities ? cities : [];
    },
  },
  methods: {
    ...mapMutations('verify', [
      'updateVerificationData',
      'updateVerificationDateOfBirth',
    ]),
    ...mapActions('verify', [
      'verifyTierOne',
      'getLastVerification',
    ]),
    ...mapActions('geo', [
      'getCountries',
      'getCities',
    ]),
    upload() {
      this.verifyTierOne(this.getFormData());
    },
  },
  watch: {
    'verification.country'(country) {
      if (this.countries.find((el) => el.name == country)) {
        this.getCities(country);
      }
    },
    dateOfBirth(value) {
      if (value) this.updateVerificationDateOfBirth(value);
    },
  },
  props: {
    validations: Object,
  },
  components: {
    VerificationPageFormCustomInput,
    Dropdown,
  },
};
</script>

<style lang="scss" scoped>
@import 'variables';
.verificationForm {
  &__label {
    padding-right: 20px;
  }
  &__iconCheck {
    display: inline-block;
    width: 10px;
    height: 8.75px;
    margin-left: 16px;
    fill: $background__grey-dark;
    &--done {
      fill: $background__green;
    }
  }
  &__inputImg {
    display: inline-block;
    width: 20px;
    margin: auto;
    margin-right: 5px;
  }
  &__rowPaddings {
    margin: 6px 0;
  }
  &__input {
    display: inline-flex;
    align-items: center;
    width: 208px;
  }
  &__form {
    padding: 15px 0 30px;
  }
  &__container {
    display: inline-flex;
    align-items: center;
  }
  &__dataInput {
    padding-right: 40px;
    width: 40px;
    margin-right: 19px;
    &--day {
      width: 75px;
    }
    &--month {
      width: 90px;
    }
    &--year {
      width: 84px;
      margin-right: 0;
    }
  }
  &__dropdown {
    &--day {
      width: 40px;
    }
    &--month {
      width: 65px;
    }
    &--year {
      width: 58px;
    }
  }
  &__button {
    margin-top: 50px;
  }
}
</style>
