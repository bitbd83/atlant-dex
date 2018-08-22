// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.tablePage
  TableHeader
  .tablePage__body
    .tablePage__content
      slot(v-if="!isLoading")
      EmptyPlaceholder(v-if="isShowEmptyPlaceholder", :content="getTableContent")
      Loader(:isLoading="isLoading" :isLoadingError="isLoadingError" :getRequest="getApiRequest").tablePage__loader
      Pagination(v-show="pageCount > 1", :page="page", :pageCount="pageCount", :pageAction="changeActivePage")
      .tablePage__panel(:class="{'tablePage__panel--active': isShowPanelInMobileVersion, 'tablePage__panelScrollbarOpened' : showSidebar}")
        .tablePage__panelActions.panel__checkbox(v-if="isCheckbox")
          Checkbox.tHistory__checkbox(color="yellow", :value="isAllChecked" @change="toggleCheckboxes")
        .tablePage__panelActions(v-if="getRepeat" @click="getRepeat") {{$t('repeat')}}
        .tablePage__panelActions(v-if="getCancel" @click="getCancel") {{$t('cancel')}}
        .tablePage__panelActions(v-if="getDelete" @click="getDelete") {{$t('delete')}}
        .tablePage__panelActions(v-if="getExport" @click="getExport") {{$t('export')}}
</template>

<script>
import {mapState} from 'vuex';
import Checkbox from 'components/Checkbox';
import Loader from 'components/Loader';
import Icon from 'components/Icon';
import EmptyPlaceholder from 'components/TablePageLayoutEmptyPlaceholder';
import Pagination from 'components/Pagination';
import TableHeader from 'components/TablePageLayoutHeader';

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
      return (this.isCheckbox) ? Boolean(this.checkedArray.length) : Boolean(Object.keys(this.checkedArray).length);
    },
    getTableContent() {
      switch (this.content) {
        case 'myOrders': return 'orders';
        case 'transactionHistory': return 'transactions';
      };
    },
    isShowEmptyPlaceholder() {
      return this.isLoading ? false : this.data.length == 0;
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
  props: {
    title: {
      type: String,
      default: '',
      required: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
      required: false,
    },
    isLoadingError: {
      type: Boolean,
      default: false,
      required: false,
    },
    getApiRequest: {
      type: Function,
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
      type: [Array, String, Object],
      default: Array,
      required: false,
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
    isCheckbox: {
      type: [Boolean],
      default: true,
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
    TableHeader,
    EmptyPlaceholder,
    Loader,
    Checkbox,
    Icon,
    Pagination,
  },
};
</script>

<style lang="scss">
@import "variables";

$panelHeight: 58px;
.tablePage {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 2;

  &__body {
    height: 100%;
    display: flex;
  }
  &__content {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 36px;
    border-top: 1px solid $color_tangaroa;
  }
  &__loader {
    margin-top: 50px;
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
    &:hover {
      color: $color_yellow;
    }
  }
  &__panelScrollbarOpened {
    transition: left .15s;
    left: 335px;
  }
}
</style>
