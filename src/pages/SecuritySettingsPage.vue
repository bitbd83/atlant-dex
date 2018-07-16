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
PageLayout(title="Security settings", :sidebar="true")
  .securitySettings
    .securitySettings__title Main
    .securitySettings__item
      SecuritySettingsPageChangePassword
    // .securitySettings__desktopRow
    .securitySettings__item
      SecuritySettingsPageChangeEmail
      //-   .securitySettings__param Current Email:
      //-   .securitySettings__value.securitySettings__value--row {{email.value}} #[Icon.securitySettings__icon(v-if="email.verified" id="verified")]
      //-     .link.securitySettings__action Change
      //- .securitySettings__item.securitySettings__item--column
      //-   .securitySettings__param Additional Email:
      //-   .securitySettings__value.securitySettings__value--row {{additionalEmail.value}} #[Icon.securitySettings__icon(v-if="security.additionalEmail.verified" id="verified")]
      //-     .link.securitySettings__action Change
    .securitySettings__title 2 factor authentication
    SecuritySettingsPageTFASettings
    .securitySettings__title Other
    .securitySettings__item.securitySettings__desktopRow
      .securitySettings__row Terminate active sessions #[Icon.securitySettings__terminateIcon(id="terminate")]
      .link.securitySettings__action.securitySettings__action--mobileLeft Terminate
    // BButton.accountInfo__button(color="malachite" rounded) Save
</template>

<script>
import {mapState, mapActions} from 'vuex';
import BButton from 'components/BButton';
import SecuritySettingsPageChangePassword from 'components/SecuritySettingsPageChangePassword';
import SecuritySettingsPageChangeEmail from 'components/SecuritySettingsPageChangeEmail';
import SecuritySettingsPageTFASettings from 'components/SecuritySettingsPageTFASettings';
// import {serverNotification} from 'services/notification';
import PageLayout from 'layouts/PageLayout';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState('user', {
      security: 'security',
    }),
  },
  methods: {
    ...mapActions('user', {
      getProfileData: 'getProfileData',
    }),
  },
  created() {
    this.getProfileData();
  },
  components: {
    PageLayout,
    BButton,
    SecuritySettingsPageChangePassword,
    SecuritySettingsPageChangeEmail,
    SecuritySettingsPageTFASettings,
  },
};
</script>

<style lang="scss">
.securitySettings {
  max-width: 600px;
  &__title {
    font-size: 16px;
    font-weight: 700;
    line-height: 25px;
    text-transform: uppercase;
    margin-bottom: 40px;
  }
  &__desktopRow {
    display: flex;
    align-items: center;
  }
  &__row {
    display: flex;
  }
  &__item {
    font-size: 14px;
    line-height: 19px;
    margin-bottom: 43px;
    &--column {
      width: 50%;
    }
  }
  &__param {
    font-weight: 700;
  }
  &__value {
    margin-top: 18px;
    font-weight: 400;
    &--row {
      display: flex;
      align-items: center;
    }
  }
  &__action {
    margin-right: 5px;
    margin-left: 19px;
  }
  &__icon{
    $size: 13px;
    height: $size;
    width: $size;
    margin-left: 14px;
  }
  &__terminateIcon {
    height: 19px;
    width: 25px;
    margin-left: 16px;
  }
  &__button {
    padding: 8px 44px;
    font-size: 16px;
    font-weight: 900;
    text-transform: uppercase;
    margin-top: 20px;
  }
}
</style>
