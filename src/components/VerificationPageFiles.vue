// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.verificationFiles
  .verificationFiles__descContainer(v-if="activeSection")
    img.verificationFiles__descImg(:src="desc[activeSection].img")
    .verificationFiles__descTextContainer
      .verificationFiles__descSeparator ***
      .verificationFiles__descText {{desc[activeSection].desc}}
  .verificationFiles__fromContainer
    .verificationFiles__item
      VerificationPageFilesInput(
        :value="verification.passportScan",
        @input="(val) => updateverification(val, 'passportScan')",
        :active="activeSection == 'passportScan'",
        @showDesc="showHelp('passportScan')"
        label="ID scan",
        :isError="validations.verification.passportScan.$error",
      )
    .verificationFiles__item
      VerificationPageFilesInput(
        :value="verification.proofOfResidenceScan",
        @input="(val) => updateverification(val, 'proofOfResidenceScan')",
        :active="activeSection == 'proofOfResidenceScan'",
        @showDesc="showHelp('proofOfResidenceScan')",
        label="Proof of address",
        :isError="validations.verification.proofOfResidenceScan.$error",
      )
    .verificationFiles__item
      VerificationPageFilesInput(
        :value="verification.selfie",
        @input="(val) => updateverification(val, 'selfie')",
        :active="activeSection == 'selfie'",
        @showDesc="showHelp('selfie')",
        label="Selfie holding ID card & signed «Atlant» paper",
        :isError="validations.verification.selfie.$error",
      )
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import idImage from 'assets/images/example-id.png';
import passportImage from 'assets/images/example-passport.png';
import selfieImage from 'assets/images/example-selfie.png';
import VerificationPageFilesInput from 'components/VerificationPageFilesInput';

export default {
  name: 'VerificationFiles',
  data() {
    return {
      activeSection: '',
      desc: {
        passportScan: {
          img: idImage,
          desc: 'Please use a clear and contrast photo of your document. Without any distortion and visual artifacts.',
        },
        proofOfResidenceScan: {
          img: passportImage,
          desc: 'Utility bill (electricity / water)',
        },
        selfie: {
          img: selfieImage,
          desc: 'Selfie holding ID card & signed «Atlant» paper',
        },
      },
    };
  },
  computed: {
    ...mapState('verify', ['verification']),
  },
  methods: {
    ...mapMutations('verify', [
      'updateVerificationData',
    ]),
    updateverification(val, section) {
      this.updateVerificationData({val, section});
    },
    showHelp(section) {
      this.activeSection = (this.activeSection == section) ? '' : section;
    },
  },
  props: {
    validations: Object,
  },
  components: {
    VerificationPageFilesInput,
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.verificationFiles {
  &__descContainer {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }
  &__descImg {
    height: 246px;
    margin-right: 57px;
  }
  &__descTextContainer {
    font-family: "Century Gothic";
    font-size: 12px;
    color: #AAAABA;
    letter-spacing: 0.5px;
    line-height: 19px;
  }
  &__descSeparator {
    font-family: "Century Gothic";
    font-weight: 700;
    margin-bottom: 5px;
  }
  &__descText {
    max-width: 208px;
  }
  &__fromContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
  }
  &__item {
    position: relative;
    padding-top: 15px;
    display: flex;
    align-items: center;
    flex: 2;
  }
}
</style>
