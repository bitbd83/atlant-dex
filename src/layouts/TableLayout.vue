// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.table
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
import Header from 'components/Header.vue';
export default {
  components: {
    Header,
  },
  props: {
    title: String,
  },
};
</script>

<style lang="scss">
.table {
  display: flex;
  flex-direction: column;
  flex: 2;
  &__content {

  }
}
</style>
