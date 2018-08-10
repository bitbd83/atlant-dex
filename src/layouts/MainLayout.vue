// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
  .mainLayout(:class="{'mainLayout--activeSidebar': showSidebar}")
    Grid
</template>

<script>
import {mapState} from 'vuex';
import Grid from 'components/grid/Grid';

export default {
  computed: {
    ...mapState('misc', {
      showSidebar: 'showSidebar',
    }),
  },
  components: {
    Grid,
  },
};
</script>

<style lang="scss">
@import 'variables';

.mainLayout {
  display: flex;
  position: relative;
  flex: 1;
  margin-left: 0;
  transition: $transition__sidebarAction;
  z-index: 1;

  &--activeSidebar {
    margin-left: -300px;
    transition: $transition__sidebarAction;
  }
}
</style>
