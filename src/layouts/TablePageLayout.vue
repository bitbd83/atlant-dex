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
.tablePage
  TablePageLayoutHeader
  .tablePage__body
    .tablePage__content(v-scrollbar="")
      slot
      TablePageLayoutEmptyPlaceholder(v-if="data.length == 0", :content="getTableContent")
    Pagination(v-show="pageCount > 1", :page="page", :pageCount="pageCount", :pageAction="changeActivePage")
    //- .tablePage__panel(:class="{'tablePage__panel--active': isShowPanelInMobileVersion, 'tablePage__panelScrollbarOpened' : showSidebar}")
    //-   .tablePage__panelActions.panel__checkbox
    //-     Checkbox.tHistory__checkbox(color="yellow", :value="isAllChecked" @change="toggleCheckboxes")
    //-   .tablePage__panelActions(v-if="getRepeat") Repeat
    //-   .tablePage__panelActions(v-if="getCancel") Cancel
    //-   .tablePage__panelActions(v-if="getDelete") Delete
    //-   .tablePage__panelActions(v-if="getExport") Export
</template>

<script>
import {mapState} from 'vuex';
import {scrollbar} from '@/directives';
import Checkbox from 'components/Checkbox';
import Pagination from 'components/Pagination';
import TablePageLayoutHeader from 'components/TablePageLayoutHeader';
import TablePageLayoutEmptyPlaceholder from 'components/TablePageLayoutEmptyPlaceholder';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState('misc', {
      showSidebar: 'showSidebar',
    }),
    ...mapState('page', {
      content: 'name',
    }),
    isAllChecked() {
      return this.checkedArray.length === this.data.length;
    },
    isShowPanelInMobileVersion() {
      return Boolean(this.checkedArray.length);
    },
    getTableContent() {
      switch (this.content) {
        case 'myOrders': return 'orders';
        case 'transactionHistory': return 'transactions';
      };
    },
  },
  methods: {
    switchAllCheckboxes(val) {
      this.$emit('update:checkedArray', val ? this.data.map((item) => item.id) : []);
    },
    toggleCheckboxes() {
      this.isAllChecked ? this.switchAllCheckboxes(false) : this.switchAllCheckboxes(true);
    },
  },
  directives: {
    scrollbar,
  },
  props: {
    title: {
      type: String,
      default: '',
      required: false,
    },
    sidebar: {
      type: Boolean,
      default: false,
      required: false,
    },
    data: {
      type: Array,
      required: true,
    },
    checkedArray: {
      type: Array,
      required: true,
    },
    page: {
      type: [Number, String],
      required: false,
    },
    pageCount: {
      type: [Number, String],
      required: false,
    },
    changeActivePage: {
      type: Function,
      required: false,
    },
    getRepeat: {
      type: [Function, Boolean],
      default: false,
      required: false,
    },
    getUndo: {
      type: [Function, Boolean],
      default: false,
      required: false,
    },
    getCancel: {
      type: [Function, Boolean],
      default: false,
      required: false,
    },
    getDelete: {
      type: [Function, Boolean],
      default: false,
      required: false,
    },
    getExport: {
      type: [Function, Boolean],
      default: false,
      required: false,
    },
  },
  components: {
    TablePageLayoutHeader,
    TablePageLayoutEmptyPlaceholder,
    Checkbox,
    Pagination,
  },
};
</script>

<style lang="scss">
@import 'variables';

$panelHeight: 58px;
.tablePage {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  &__body {
    display: flex;
    flex-direction: column;

  }
  &__content {
    position: relative;
    padding: 36px;
    border-top: 1px solid $color_tangaroa;
    display: flex;
    flex-direction: column;
    flex: 2;
  }
  &__panel {
    z-index: 1.6;
    position: fixed;
    display: flex;
    align-items: center;
    padding-left: 41px;
    height: $panelHeight;
    left: 55px;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background-image: repeating-linear-gradient(
      135deg,
      #103c55,
      #103c55 25px,
      #03324c 0,
      #03324c 60px
    );
    transition: bottom .5s, left .15s;

  }
  &__panelActions {
    cursor: pointer;
    margin-right: 40px;
    color: $color_white;
    font-family: Roboto;
    font-size: 12px;
    font-weight: 700;
  }
  &__panelScrollbarOpened {
    transition: left .15s;
    left: 335px;
  }
}
</style>
