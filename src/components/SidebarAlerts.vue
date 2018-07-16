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
.alerts
  .alerts__item.alerts__item--header
    .sidebarChild__headerLine
      .sidebarChild__title ALLERT LIST:
    .alerts__headerDropdownContainer
      span Sort by:
      Dropdown.alerts__headerDropdown(
        :options="criteria",
        v-model="selected",
        no-border,
        no-padding,
        preselect-first,
        underline,
      )
  .alerts__content(ref="wrap" v-scrollbar="")
    Accordion(title="Tokens & Coins:" isSidebar :isHidden="isSidebarLoading")
      AlertItem(:data="alert" v-for="alert in sidebarAlerts", :key="alert.id")
      MugenScroll(:handler="getAccountAlertsList", scroll-container="wrap")
      .alerts__add(@click="open({name:'addAlert'})")
        Icon.alerts__addIcon(id="icon__add")
        .alerts__addText ADD
</template>

<script>
import MugenScroll from 'vue-mugen-scroll';
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import {scrollbar} from '@/directives';
import Icon from 'components/Icon';
import Dropdown from 'components/Dropdown';
import AlertItem from './SidebarAlertsItem';
import Accordion from 'components/Accordion';

export default {
  data() {
    return {
      selected: '',
      selectedCur: 'btc',
      percChng: 2.73,
      criteria: [
        'Price target',
        'Volume change',
      ],
    };
  },
  computed: {
    ...mapState('alerts', [
      'sidebarAlerts',
      'sidebarAlertsCount',
      'alertsLimit',
      'isSidebarLoading',
      'isSidebarLoadingError',
    ]),
    ...mapGetters('membership', {
      isLoggedIn: 'isLoggedIn',
    }),
    getPageNumber() {
      return (this.sidebarAlerts.length / this.alertsLimit + 1).toFixed(0);
    },
  },
  methods: {
    openCur(cur) {
      this.selectedCur = cur;
    },
    ...mapMutations('modal', [
      'open',
    ]),
    ...mapMutations('alerts', [
      'dropSidebarAlerts',
      'setSidebarLoading',
      'setSidebarLoadingError',
    ]),
    ...mapActions('alerts', [
      'getAlertsList',
    ]),
    getAccountAlertsList() {
      if (this.isSidebarLoading == true && this.isSidebarLoadingError == false) return false;
      if (this.sidebarAlertsCount <= this.sidebarAlerts.length) return false;
      this.setSidebarLoadingError(false);
      this.setSidebarLoading(true);
      this.getAlertsList({
        page: this.getPageNumber,
        isSidebar: true,
      }).then(() => {
        this.setSidebarLoading(false);
      }).catch(() => {
        this.setSidebarLoadingError(true);
      });
    },
  },
  created() {
    this.dropSidebarAlerts();
  },
  directives: {
    scrollbar,
  },
  components: {
    MugenScroll,
    Icon,
    Dropdown,
    AlertItem,
    Accordion,
  },
};

</script>

<style lang='scss' scoped>
@import 'variables';

.alerts {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 2;

  &__icon {
    $size: 14px;
    height: $size;
    width: $size;
    fill: #fff;
    cursor: pointer;
  }

  &__item {
    margin: 40px 18px 48px 25px;
    font-size: 12px;

    &--header {
      font-weight: 700;
    }
  }

  &__headerLine {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-transform: uppercase;
  }

  &__headerDropdownContainer {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 500;
    padding-top: 5px;
  }

  &__headerDropdown {
    width: 110px;
    text-transform: none;
  }

  &__content {
    flex: 2;
    position: relative;
  }

  &__add {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin: 32px 0 25px 24px;
  }

  &__addIcon {
    $size: 28px;
    width: $size;
    height: $size;
    fill: $fill__white;
    margin-right: 12px;
  }

  &__addText {
    font-size: 16px;
    font-weight: 700;
  }
}
</style>
