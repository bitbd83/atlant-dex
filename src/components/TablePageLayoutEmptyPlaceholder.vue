// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.empty
  Icon.empty__icon(id="empty")
  .empty__text {{content}}
</template>

<script>

export default {
  props: {
    content: {
      type: String,
      required: true,
    },
  },
};
</script>


<style lang="scss" scoped>
@import 'variables';
.empty {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &__icon {
    $size: 128px;
    width: $size;
    height: $size;
    margin-bottom: 64px;
  }
  &__text {
    opacity: 0.5;
    font-size: 20px;
    font-weight: 700;
    line-height: 38px;
    text-transform: uppercase;
    text-align: center;
    color: $color__grey;
    font-family: Supply;
  }
}
</style>
