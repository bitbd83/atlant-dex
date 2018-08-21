// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang='pug'>
.ordersHeader
  .ordersHeader__text {{$t('show')}}:
  .ordersHeader__buttons
    .ordersHeader__buttonTxt(v-for="type in types", :class="{'ordersHeader__buttonTxt--active' : isCurrentType(type)}", @click="setDashboardOrdersType(type)") {{type}}
</template>

<script>
import {mapState, mapMutations} from 'vuex';

export default {
  data() {
    return {
      types: ['open', 'completed'],
    };
  },
  computed: {
    ...mapState('orders', [
      'dashboardOrdersType',
    ]),
  },
  methods: {
    ...mapMutations('orders', [
      'setDashboardOrdersType',
    ]),
    isCurrentType(type) {
      return this.dashboardOrdersType === type;
    },
  },
};

</script>

<style lang='scss'>
@import 'variables';
.ordersHeader {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 61px;
  &__text {
    margin-right: 23px;
  }
  &__buttons {
    display: flex;
    align-items: center;
  }
  &__buttonTxt {
    cursor: pointer;
    font-size: 14px;
    text-transform: uppercase;
    border-bottom: 3px solid transparent;
    &:not(:last-child) {
      margin-right: 27px;
    }
    &--active {
      color: $color__blue;
      border-color: $color__blue;
    }
  }
}
</style>
