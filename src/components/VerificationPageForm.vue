<template lang="pug">
table
  tr
    td
      .verificationForm__label First Name:
    td
      input.input.verificationForm__input.verificationForm__rowPaddings(
        type="text",
        :value="verification.firstName",
        @input="(val) => updateverification(val.target.value, 'firstName')",
        :class="{'input--error' : validations.verification.firstName.$error}",
      )
      icon.verificationForm__iconCheck(id="icon-form-check" :class="{'verificationForm__iconCheck--done': !validations.verification.firstName.$invalid}")
  tr
    td
      .verificationForm__label Last Name:
    td
      input.input.verificationForm__input.verificationForm__rowPaddings(
        type="text"
        :value="verification.lastName",
        @input="(val) => updateverification(val.target.value, 'lastName')",
        :class="{'input--error' : validations.verification.lastName.$error}",
      )
      icon.verificationForm__iconCheck(id="icon-form-check" :class="{'verificationForm__iconCheck--done': !validations.verification.lastName.$invalid}")
  tr
    td
      .verificationForm__label Country:
    td
      VerificationPageFormCustomInput.verificationForm__rowPaddings(
        :value="verification.country",
        @change="(val) => updateverification(val, 'country')",
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
        :value="verification.city",
        @change="(val) => updateverification(val, 'city')",
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
        :value="verification.address",
        @input="(val) => updateverification(val.target.value, 'address')",
        :class="{'input--error' : validations.verification.address.$error}",
      )
      icon.verificationForm__iconCheck(id="icon-form-check" :class="{'verificationForm__iconCheck--done': !validations.verification.address.$invalid}")
  tr
    td
      .verificationForm__label Postcode:
    td
      input.input.verificationForm__input.verificationForm__rowPaddings(
        type="text"
        :value="verification.postCode",
        @input="(val) => updateverification(val.target.value, 'postCode')",
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
          input(type="text"
                :value="verification.phoneNumber",
                @input="(val) => updateverification(val.target.value, 'phoneNumber')",
                style="width: 100%"
          )
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
            :value="verification.day",
            @input="(val) => updateverification(val, 'day')",
            isColorBlack="",
            searchable="",
            isSmallTriangle="",
            :preselectFirs="false",
            no-border="",
            no-padding="",
          )
        .input.verificationForm__dataInput.verificationForm__dataInput--month(:class="{'input--error' : validations.verification.month.$error}")
          Dropdown.verificationForm__dropdown--month(
            placeholder="Month",
            :options="birthdayMonths",
            :value="verification.month",
            @input="(val) => updateverification(val, 'month')",
            isColorBlack="",
            searchable="",
            :preselectFirs="false",
            isSmallTriangle="",
          )
        .input.verificationForm__dataInput.verificationForm__dataInput--year(:class="{'input--error' : validations.verification.year.$error}")
          Dropdown.verificationForm__dropdown--year(
            placeholder="Year",
            :options="birthdayYears",
            :value="verification.year",
            @input="(val) => updateverification(val, 'year')",
            isColorBlack="",
            searchable="",
            :preselectFirs="false",
            isSmallTriangle="",
          )
      icon.verificationForm__iconCheck(id="icon-form-check" :class="{'verificationForm__iconCheck--done': !validations.verification.dateOfBirth.$invalid}")
    tr
      td
        .verificationForm__label ID or Passport #:
      td
        input.input.verificationForm__input.verificationForm__rowPaddings(
          type="text",
          :value="verification.passportId",
          @input="(val) => updateverification(val.target.value, 'passportId')",
          :class="{'input--error' : validations.verification.passportId.$error}",
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
    ...mapState('verify',
      ['verification']
    ),
    ...mapState('geo', [
      'countries',
      'cities',
      'countriesLoading',
      'citiesLoading',
    ]),
    dateOfBirth() {
      let year = this.verification.year;
      let month = this.verification.month;
      let day = this.verification.day;

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
    ...mapActions('geo', [
      'getCountries',
      'getCities',
    ]),
    updateverification(val, section) {
      this.updateVerificationData({val, section});
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
      width: 55px;
    }
    &--year {
      width: 50px;
    }
  }
  &__button {
    margin-top: 50px;
  }
}
</style>
