// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.tablePage
  Header(:title="title")
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
import Header from 'components/Header.vue';
import {scrollbar} from '@/directives';
import Pagination from 'components/Pagination';
import Checkbox from 'components/Checkbox';
import TablePageLayoutEmptyPlaceholder from 'components/TablePageLayoutEmptyPlaceholder';

export default {
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
    title: String,
    data: {
      type: Array,
      required: true,
    },
    checkedArray: {
      type: Array,
      required: true,
    },
    page: [Number, String],
    pageCount: [Number, String],
    changeActivePage: Function,
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
    Header,
    Pagination,
    Checkbox,
    TablePageLayoutEmptyPlaceholder,
  },
};
</script>

<style lang="scss">
.tablePage {
  display: flex;
  flex-direction: column;
  flex-grow: 2;

  &__body {
    display: flex;
    flex-direction: column;
    flex-grow: 2;
  }

  &__content {
    display: flex;
    flex-grow: 2;
  }
}
</style>
