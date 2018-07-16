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
.tableHeader
  BackToPreviousPage.tableHeader__backTo
  // PageLayoutBackToDashboard.tableHeader__backTo
  .tableHeader__container(v-show="isTradeTables")
    .tableHeader__title(@click="getOpenPage('transactionHistory')", :class="(isThisPage('transactionHistory')) ? 'tableHeader__title--active' : ''") Transaction History
    .tableHeader__title(@click="getOpenPage('myOrders')", :class="(isThisPage('myOrders')) ? 'tableHeader__title--active' : ''") My Orders
      Dropdown.tableHeader__dropdown(
        v-if="isThisPage('myOrders')",
        :options="sortTypes",
        v-model="sortTypeForMyOrders",
        no-border,
        no-paddding,
        preselect-first,
      )
  .tableHeader__container(v-show="isNotifications")
    .tableHeader__title(:class="(isThisPage('notificationHistory')) ? 'tableHeader__title--active' : ''") Notification History
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import Dropdown from 'components/Dropdown';
import PageLayoutBackToDashboard from 'components/PageLayoutBackToDashboard';
import BackToPreviousPage from 'components/TablePageLayoutHeaderBackToPreviousPage';

export default {
  data() {
    return {
      sortTypeForMyOrders: '',
      sortTypes: [
        'All Orders',
        'Open',
        'Partially filled',
        'Filled',
        'Cancelled',
      ],
    };
  },
  computed: {
    ...mapState('page', {
      name: 'name',
    }),
    typeOfNewStatus() {
      switch (this.sortTypeForMyOrders) {
        case 'Open': return 0;
        case 'Partially filled': return 1;
        case 'Filled': return 2;
        case 'Cancelled': return 3;
        default: return '';
      };
    },
    isTradeTables() {
      return this.name === 'transactionHistory' || this.name === 'myOrders';
    },
    isNotifications() {
      return this.name === 'notificationHistory';
    },
  },
  methods: {
    ...mapMutations('page', {
      openPage: 'open',
    }),
    ...mapMutations('trade', {
      setOrderFilter: 'setOrderFilter',
    }),
    getOpenPage(pageName) {
      this.openPage({
        name: pageName,
      });
    },
    isThisPage(pageName) {
      return pageName == this.name;
    },
  },
  watch: {
    sortTypeForMyOrders() {
      this.setOrderFilter(this.typeOfNewStatus);
    },
  },
  props: {
    title: {
      type: String,
      default: '',
      required: false,
    },
  },
  components: {
    PageLayoutBackToDashboard,
    BackToPreviousPage,
    Dropdown,
  },
};
</script>

<style lang="scss" scoped>
@import 'variables';

.tableHeader {
  display: flex;
  padding: 0 36px;
  min-height: 73px;
  border-top: 1px solid $color_tangaroa;
  &__backTo {
    padding-right: 43px;
  }
  &__container {
    display: flex;
  }
  &__title {
    display: flex;
    align-items: center;
    font-weight: 700;
    text-transform: uppercase;
    padding: 0 43px;
    vertical-align: baseline;
    white-space: nowrap;
    &--active {
      color: $color_turquoise--light;
      font-size: 16px;
      font-weight: 700;
      border-left: 1px solid $color_tangaroa;
      border-right: 1px solid $color_tangaroa;
      border-bottom: 1px solid $color_blue;
      margin-bottom: -1px;
      z-index: 1;
    }
  }
  &__dropdown {
    color: $color_white;
    margin-left: 10px;
    font-size: 12px;
    font-weight: 700;
    min-width: 120px;
    text-transform: none;
  }
}
</style>
