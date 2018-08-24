// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.pageHeader
  .pageHeader__content
    .pageHeader__title {{title}}
      Dropdown.pageHeader__dropdown(
        v-if="pageName == 'myOrders'",
        :options="sortTypes",
        v-model="sortTypeForMyOrders",
        no-border,
        no-paddding,
        preselect-first,
        underline,
        isColorBlue="",
      )
    BButton(v-if="btnText", @click="btnFunction", :color="isBtnCompleted ? 'green' : 'blue'") {{isBtnCompleted ? 'SENT' : btnText}}
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex';
import Dropdown from 'components/Dropdown';
import BButton from 'components/BButton';

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
    typeOfNewStatus() {
      switch (this.sortTypeForMyOrders) {
        case 'Open': return 0;
        case 'Partially filled': return 1;
        case 'Filled': return 2;
        case 'Cancelled': return 3;
        default: return '';
      };
    },
  },

  methods: {
    ...mapMutations('orders', {
      setOrderFilter: 'setOrderFilter',
    }),
    ...mapActions('page', [
      'getOpenPage',
    ]),
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
    btnText: String,
    btnFunction: {
      type: Function,
      required: false,
      default: () => {},
    },
    isBtnCompleted: Boolean,
  },
  components: {
    Dropdown,
    BButton,
  },
};
</script>

<style lang="scss">
@import 'variables';

.pageHeader {
  height: 56px;
  margin-bottom: 45px;

  &__content {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    display: flex;

    font-weight: 700;
    font-size: 16px;
    color: #000000;
    text-transform: uppercase;
  }

  &__dropdown {
    margin-left: 15px;
  }
}
</style>
