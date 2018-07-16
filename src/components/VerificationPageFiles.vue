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
.verificationFiles
  .verificationFiles__item
    VerificationPageFormGroup(
      label="ID scan:",
      label-for="null",
    )
      VerificationPageFilesInput(
        :image-src="idImage",
        v-model="verification.passportScan",
        :validation="getFieldValidationStatus('passportScan')"
      )
  .verificationFiles__item
    VerificationPageFormGroup(
    label="Proof of address:",
    label-for="null",
    )
      VerificationPageFilesInput(
      :image-src="passportImage",
      v-model="verification.proofOfResidenceScan",
      :validation="getFieldValidationStatus('proofOfResidenceScan')",
      )
  .verificationFiles__item
    VerificationPageFormGroup(
      label="Selfie holding ID card & signed «ATLANT» paper:",
      label-for="null",
    )
      VerificationPageFilesInput(
        :image-src="selfieImage",
        v-model="verification.selfie",
        :validation="getFieldValidationStatus('selfie')",
      )
</template>

<script>
import {mapState} from 'vuex';
import idImage from 'assets/images/example-id.png';
import passportImage from 'assets/images/example-passport.png';
import selfieImage from 'assets/images/example-selfie.png';
import VerificationPageFormGroup from 'components/VerificationPageFormGroup';
import VerificationPageFilesInput from 'components/VerificationPageFilesInput';

export default {
  name: 'VerificationFiles',
  data() {
    return {
      idImage,
      passportImage,
      selfieImage,
    };
  },
  computed: {
    ...mapState('verify', [
      'verification',
    ]),
  },
  methods: {
    getFieldValidationStatus(name) {
      const $v = this.validations[name] ? this.validations : this.validations.verification;
      if ($v[name].$error) return 'error';
      return $v[name].$invalid ? 'invalid' : 'valid';
    },
  },
  props: {
    validations: Object,
  },
  components: {
    VerificationPageFormGroup,
    VerificationPageFilesInput,
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.verificationFiles {
  align-items: center;
  padding: 10px 0;
  &__item {
    position: relative;
    padding-top: 15px;
  }

  /deep/ .VerificationPageFormGroup__labelText {
    width: 150px;
  }
}
</style>
