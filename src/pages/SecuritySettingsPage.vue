// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
ContentLayout(title="Security settings")
  .securitySettings
    Accordion(title="Main")
      .securitySettings__section
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
    Accordion(title="2 factor authentication")
      .securitySettings__section
        SecuritySettingsPageTFASettings
    Accordion(title="Other")
      .securitySettings__section
        .securitySettings__item.securitySettings__desktopRow
          .securitySettings__row Terminate active sessions #[Icon.securitySettings__terminateIcon(id="terminate")]
          .link.securitySettings__action.securitySettings__action--mobileLeft Terminate
</template>

<script>
import {mapState, mapActions} from 'vuex';
import Accordion from 'components/Accordion';
import SecuritySettingsPageChangePassword from 'components/SecuritySettingsPageChangePassword';
import SecuritySettingsPageChangeEmail from 'components/SecuritySettingsPageChangeEmail';
import SecuritySettingsPageTFASettings from 'components/SecuritySettingsPageTFASettings';
// import {serverNotification} from 'services/notification';
import ContentLayout from 'layouts/ContentLayout';

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
    ContentLayout,
    Accordion,
    SecuritySettingsPageChangePassword,
    SecuritySettingsPageChangeEmail,
    SecuritySettingsPageTFASettings,
  },
};
</script>

<style lang="scss">
.securitySettings {
  &__section {
    margin-top: 55px;
  }
}
</style>
