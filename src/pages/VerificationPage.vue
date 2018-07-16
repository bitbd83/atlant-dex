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
PageLayout(
  title="Verification",
  title2="Please upload the following files in order to verify your account:",
  :sidebar="true"
)
  .verification
    .verification__title PERSONAL INFORMATION:
    .verification__form
      VerificationForm(:validations="this.$v")
    .verification__title Please upload the following files in order to verify your account:
    .verification__upload
      VerificationFiles(:validations="this.$v")
    .verification__button
      BButton(
        @click="upload"
        color="malachite",
        rounded,
        caps,
      ) Verify Me
</template>

<script>
import {mapState, mapActions} from 'vuex';
import {required, minLength} from 'vuelidate/lib/validators';
import BButton from 'components/BButton';
import PageLayout from 'layouts/PageLayout';
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
    PageLayout,
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
  color: $color_white;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  max-width: 560px;

  &__title {
    font-size: 16px;
    font-weight: 700;
    line-height: 25px;
    margin-bottom: 20px;
    text-transform: uppercase;
  }
  &__form {
    padding: 15px 0 30px;
  }
  &__button {
    margin-top: 50px;
  }
}
</style>
