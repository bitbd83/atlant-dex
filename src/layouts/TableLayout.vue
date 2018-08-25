// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.tablePage
  Header(:title="title")
  .tablePage__body
    .tablePage__content
      TablePageLayoutEmptyPlaceholder(v-if="data.length == 0 && !isLoading", :content="getTableContent")
      slot(v-else)
    Pagination(v-show="pageCount > 1", :page="page", :pageCount="pageCount", :pageAction="changeActivePage")
    .tablePage__panel(:class="{'tablePage__panelScrollbarOpened' : showSidebar}")
      .tablePage__panelActions(v-if="getRepeat && checked" @click="getRepeat") Repeat
      .tablePage__panelActions(@click="getExport") Export
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
    getTableContent() {
      switch (this.content) {
        case 'myOrders': return `Couldn't find any orders`;
        case 'transactionHistory': return `Couldn't find any transactions`;
        case 'notificationHistory': return `Couldn't find any notifications`;
        case 'securityLog': return `Couldn't find any security logs`;
      };
    },
  },
  methods: {
    switchAllCheckboxes(val) {
      this.$emit('update:checked', val ? this.data.map((item) => item.id) : []);
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
    checked: {
      type: [Array, Object],
      required: false,
    },
    page: [Number, String],
    pageCount: [Number, String],
    changeActivePage: Function,
    getRepeat: {
      type: [Function, Boolean],
      default: false,
      required: false,
    },
    getCancel: {
      type: [Function, Boolean],
      default: false,
      required: false,
    },
    getExport: {
      type: [Function, Boolean],
      default: false,
      required: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
      required: true,
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
@import 'variables';
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
    position: relative;
    display: flex;
    flex-grow: 2;
    overflow: hidden;
    & thead {
      background-color: $background__blue;
    }

    & tr {
      border: none;
    }

    & th {
      color: $color__white;
      font-size: 14px;
      font-weight: 700;
    }

    & td {
      color: $color__black;
      font-family: "Century Gothic";
      font-size: 12px;
      font-weight: 400;
      padding: 15px 0;
      letter-spacing: 0.5px;
    }
  }
  &__panel {
    display: flex;
    align-items: center;
    height: 50px;
    background-color: $background__blue;
    z-index: 1;
  }
  &__panelActions {
    color: $color__white;
    font-family: Supply;
    font-size: 12px;
    font-weight: 400;
    cursor: pointer;
    &:not(:first-child) {
      margin-left: 40px;
    }
  }
}
</style>
