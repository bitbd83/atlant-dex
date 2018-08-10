// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.pageHeader
  .pageHeader__title
    Dropdown.tableHeader__dropdown(
      v-if="pageName == 'myOrders'",
      :options="sortTypes",
      v-model="sortTypeForMyOrders",
      no-border,
      no-paddding,
      preselect-first,
      underline,
    )
  | {{title}}:
</template>

<script>
import {mapState} from 'vuex';
import IInput from 'components/IInput';
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
      pageName: 'name',
    }),
  },
  props: {
    title: {
      type: String,
      default: '',
      required: false,
    },
  },
  components: {
    IInput,
  },
};
</script>

<style lang="scss">
@import 'variables';

.pageHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
  margin-bottom: 30px;

  // padding: 36px;
  &__title {
    font-weight: 700;
    font-size: 16px;
    color: #000000;
    text-transform: uppercase;
  }

  &__setDate {
    display: flex;
    align-items: center;
  }
}
</style>
