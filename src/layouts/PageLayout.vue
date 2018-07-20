// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.page
  PageHeader(:title="title")
  .page__body
    .page__sidebar(v-if="sidebar" v-scrollbar="")
      PageNavigation
    .page__content(v-scrollbar="")
      slot
</template>

<script>
import {scrollbar} from '@/directives';
import PageHeader from 'components/PageLayoutHeader';
import PageNavigation from 'components/PageLayoutNavigation';

export default {
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
  },
  directives: {
    scrollbar,
  },
  components: {
    PageHeader,
    PageNavigation,
  },
};
</script>

<style lang="scss">
@import 'variables';
.page {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  &__body {
    height: 100%;
    display: flex;
  }
  &__content {
    position: relative;
    width: 100%;
    padding: 36px;
    border-top: 1px solid $color_tangaroa;
  }
}
</style>
