// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.pageContent
  Header(:title="title")
  .pageContent__body(v-scrollbar="")
    slot
</template>

<script>
import Header from 'components/Header.vue';
import {scrollbar} from '@/directives';

export default {
  directives: {
    scrollbar,
  },
  props: {
    title: String,
  },
  components: {
    Header,
  },
};
</script>

<style lang="scss">
.pageContent {
  display: flex;
  flex-direction: column;
  flex-grow: 2;

  &__body {
    position: relative;
    padding-right: 20px;
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    max-width: 794px;
  }
}
</style>
