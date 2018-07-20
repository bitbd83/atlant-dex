// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.status
  Icon.status__icon(:id="(isSuccess) ? 'statusSucceed' : 'statusFailed'")
  slot
</template>

<script>

export default {
  props: {
    isSuccess: {
      type: [Boolean, String],
      default: true,
      required: false,
    },
  },
};
</script>

<style lang="scss">
@import 'variables';
.status {
  &__icon {
    width: 150px;
    height: 150px;
    margin: 90px auto;
  }
}
</style>
