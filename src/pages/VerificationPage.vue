// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
ContentLayout(title="VERIFICATION", btnText="VERIFY ME", :btnFunction="upload", isContentPage="", :isBtnCompleted="isDataSended")
  .verification
    Accordion(title="PERSONAL INFORMATION")
      .verification__content
        VerificationPageForm(:validations="this.$v")
    Accordion(title="FILES")
      .verification__content
        .verification__title Please upload the following files in order to verify your account:
        VerificationPageFiles(:validations="this.$v")
</template>

<script>
import {mapState, mapActions} from 'vuex';
import {required, minLength} from 'vuelidate/lib/validators';
import ContentLayout from 'layouts/ContentLayout';
import Accordion from 'components/Accordion';
import VerificationPageForm from 'components/VerificationPageForm';
import VerificationPageFiles from 'components/VerificationPageFiles';

export default {
  data() {
    return {
      isDataSended: false,
    };
  },
  computed: {
    ...mapState('verify', ['verification']),
  },
  methods: {
    ...mapActions('verify', [
      'verifyTierOne',
      'getLastVerification',
    ]),
    ...mapActions('geo', [
      'getCountries',
      'getCities',
    ]),
    upload() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      this.verifyTierOne().then(() => {
        alert('Sended');
        this.isDataSended = true;
      });
    },
  },
  created() {
    this.getLastVerification();
    this.getCountries();
  },
  components: {
    ContentLayout,
    Accordion,
    VerificationPageForm,
    VerificationPageFiles,
  },
  validations: {
    verification: {
      firstName: {
        required,
        minLength: minLength(2),
      },
      lastName: {
        required,
        minLength: minLength(2),
      },
      country: {
        required,
      },
      city: {
        required,
      },
      address: {
        required,
        minLength: minLength(2),
      },
      postCode: {
        required,
        minLength: minLength(2),
      },
      phoneNumber: {
        required,
        minLength: minLength(3),
      },
      day: {
        required,
      },
      month: {
        required,
      },
      year: {
        required,
      },
      dateOfBirth: {
        required,
      },
      passportId: {
        required,
      },
      passportScan: {
        required,
      },
      selfie: {
        required,
      },
      proofOfResidenceScan: {
        required,
      },
    },
  },
};
</script>


<style lang="scss" scoped>
@import 'variables';

.verification {
  &__content {
    margin-top: 46px;
    margin-bottom: 20px;
  }
  &__title {
    margin-bottom: 46px;
  }
}
</style>
