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
        .securitySettings__emailContainer
          SecuritySettingsPageChangeEmail
          SecuritySettingsPageChangeEmail(isAdditionalEmail="")
    Accordion(title="2 factor authentification")
      .securitySettings__section
        SecuritySettingsPageTFASettings
    //- Accordion(title="Other")
    //-   .securitySettings__section
    //-     .securitySettings__other
    //-       span.securitySettings__row Terminate active sessions
    //-       Icon.securitySettings__terminateIcon(id="terminate")
    //-       span.link.link--red Terminate
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
    margin-top: 50px;
    margin-bottom: 40px;
  }

  &__item {
    margin-bottom: 60px;

    &:last-of-type {
      margin-bottom: 40px;
    }
  }

  &__emailContainer {
    display: flex;
  }

  &__other {
    display: flex;
    align-items: flex-end;
  }

  &__terminateIcon {
    width: 32px;
    height: 24px;
    margin-left: 25px;
    margin-right: 25px;
  }
}
</style>
