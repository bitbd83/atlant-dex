// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.pageHeader
  // BackToDashboard
  .pageHeader__title {{title}} :
</template>

<script>
import BackToDashboard from 'components/PageLayoutBackToDashboard';

export default {
  props: {
    title: {
      type: String,
      default: '',
      required: false,
    },
  },
  components: {
    BackToDashboard,
  },
};
</script>

<style lang="scss">
@import 'variables';

.pageHeader {
  display: flex;
  align-items: center;
  padding: 36px;
  border-top: 1px solid $color_tangaroa;
  &__title {
    font-weight: 700;
    text-transform: uppercase;
    margin-left: 148px;
  }
}
</style>
