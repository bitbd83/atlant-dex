// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
  .main(:class="{'main--activeSidebar': showSidebar}")
    MainPageHeader
    Grid
</template>

<script>
import {mapState} from 'vuex';
import MainPageHeader from 'components/MainPageHeader';
import Grid from 'components/grid/Grid';

export default {
  computed: {
    ...mapState('misc', {
      showSidebar: 'showSidebar',
    }),
  },
  components: {
    MainPageHeader,
    Grid,
  },
};
</script>

<style lang="scss">
@import 'variables';

.main {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-image: url('~assets/images/pattern.png');
  margin-left: 0;
  transition: $transition__sidebarAction;
  z-index: 1;

  &--activeSidebar {
    margin-left: -300px;
    transition: $transition__sidebarAction;
  }
}
</style>
