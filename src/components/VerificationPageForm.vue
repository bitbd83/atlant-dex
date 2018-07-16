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

<template lang="pug">
form.verificationForm
  VerificationPageFormGroup(
    label="First Name:",
    :validation="getFieldValidationStatus('firstName')"
  )
    VerificationPageFormInput.verificationForm__input(v-model="verification.firstName")
  VerificationPageFormGroup(
    label="Last Name:",
    :validation="getFieldValidationStatus('lastName')"
  )
    VerificationPageFormInput.verificationForm__input(v-model="verification.lastName")
  VerificationPageFormGroup(
    label="Country:",
    :validation="getFieldValidationStatus('country')",
    label-for="null",
  )
    Dropdown.verificationForm__input(
      :options="countries",
      label="name",
      track-by="code",
      v-model="verification.country",
      :loading="countriesLoading",
      searchable
    )
  VerificationPageFormGroup(
    label="City:",
    :validation="getFieldValidationStatus('city')"
    label-for="null",
  )
    Dropdown.verificationForm__input(
      :options="countryCities",
      v-model="verification.city",
      :loading="citiesLoading",
      searchable
    )
  VerificationPageFormGroup(
    label="Street Address:",
    :validation="getFieldValidationStatus('address')"
  )
    VerificationPageFormInput.verificationForm__input(v-model="verification.address")
  VerificationPageFormGroup(
    label="Postcode:",
    :validation="getFieldValidationStatus('postCode')"
  )
    VerificationPageFormInput.verificationForm__input(v-model="verification.postCode")
  VerificationPageFormGroup(
    label="Phone Number:",
    :validation="getFieldValidationStatus('phoneNumber')"
  )
    VerificationPageFormInput.verificationForm__input(
      v-model="verification.phoneNumber",
      :helper="phoneCode"
    )
  VerificationPageFormGroup(
    label="Date of Birth:",
    :validation="getFieldValidationStatus('birthday')"
    label-for="null",
  )
    .verificationForm__dataContainer
      Dropdown.verificationForm__input.verificationForm__input--small(
        placeholder="Day",
        :options="birthdayDays",
        v-model="verification.day",
        searchable,
      )
      Dropdown.verificationForm__input.verificationForm__input--small(
        placeholder="Month",
        :options="birthdayMonths",
        v-model="verification.month",
        searchable,
      )
      Dropdown.verificationForm__input.verificationForm__input--small(
        placeholder="Year",
        :options="birthdayYears",
        v-model="verification.year",
        searchable,
      )
  VerificationPageFormGroup(
    label="ID or Passport #:",
    :validation="getFieldValidationStatus('passportId')"
  )
    VerificationPageFormInput.verificationForm__input(v-model="verification.passportId")
</template>

<script>
import {mapState, mapActions} from 'vuex';
import {birthdayDays, birthdayYears, birthdayMonths} from 'services/birthday';
import Dropdown from 'components/Dropdown';
import VerificationPageFormGroup from './VerificationPageFormGroup';
import VerificationPageFormInput from './VerificationPageFormInput';

export default {
  name: 'VerificationForm',
  data() {
    return {
      birthdayDays,
      birthdayYears,
      birthdayMonths,
    };
  },
  computed: {
    ...mapState('verify', [
      'verification',
    ]),
    ...mapState('geo', [
        'countries',
        'cities',
        'countriesLoading',
        'citiesLoading',
    ]),
    selectedCountry() {
      return this.countries.find((country) => country.code === this.verification.country);
    },
    phoneCode() {
      return this.selectedCountry ? this.selectedCountry.phoneCode : null;
    },
    countryCities() {
      const cities = this.cities[this.verification.country];
      if (!cities) {
        return [];
      } else if (!cities.length) {
        return ['No City'];
      }
      return cities;
    },
  },
  methods: {
    ...mapActions('geo', [
      'getCountries',
      'getCities',
    ]),
    getFieldValidationStatus(name) {
      const $v = this.validations[name] ?
          this.validations :
          this.validations.verification;
      if ($v[name].$error) return 'error';
      return $v[name].$invalid ? 'invalid' : 'valid';
    },
  },
  watch: {
    'verification.country'(country) {
      if (country) {
        this.getCities(country);
      }
    },
    'countryCities'(cities) {
      if (cities.length && cities.indexOf(this.verification.city) === -1) {
        this.verification.city = '';
      }
    },
  },
  mounted() {
    this.getCountries();
  },
  props: {
    validations: Object,
  },
  components: {
    Dropdown,
    VerificationPageFormGroup,
    VerificationPageFormInput,
  },
};
</script>

<style lang="scss" scoped>
  .verificationForm {
    &__input {
      display: block;
      width: 191px;
      &--small {
        width: 80px;
        &:not(:last-of-type) {
          margin-right: 25px;
        }
      }
    }
    &__dataContainer {
      display: flex;
    }
  }
</style>
