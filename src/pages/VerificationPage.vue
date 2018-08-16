// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
ContentLayout(title="VERIFICATION")
  .verification
    Accordion(title="PERSONAL INFORMATION")
      .verification__form
        VerificationForm(:validations="this.$v")
    Accordion(title="FILES")
      .verification__title Please upload the following files in order to verify your account:
      .verification__upload
        VerificationFiles(:validations="this.$v")
    .verification__button
      BButton(
        @click="upload"
        color="blue",
        rounded,
        caps,
      ) Verify Me
</template>

<script>
import {mapState, mapActions} from 'vuex';
import {required, minLength} from 'vuelidate/lib/validators';
import Accordion from 'components/Accordion';
import BButton from 'components/BButton';
import ContentLayout from 'layouts/ContentLayout';
import VerificationForm from 'components/VerificationPageForm';
import VerificationFiles from 'components/VerificationPageFiles';

export default {
  name: 'VerificationPage',
  computed: {
    ...mapState('verify', [
      'verification',
    ]),
  },
  methods: {
    ...mapActions('verify', [
      'verifyTierOne',
      'getLastVerification',
    ]),
    upload() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      this.verifyTierOne(this.verification.getFormData());
    },
  },
  mounted() {
    this.getLastVerification();
  },
  components: {
    ContentLayout,
    Accordion,
    BButton,
    VerificationForm,
    VerificationFiles,
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
        minLength: minLength(4),
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
    birthday: ['verification.day', 'verification.month', 'verification.year'],
  },
};
</script>


<style lang="scss" scoped>
@import 'variables';
.verification {
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  &__form {
    padding: 15px 0 30px;
  }
  &__button {
    margin-top: 50px;
  }
}
</style>
