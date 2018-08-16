// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang='pug'>
Tile(
  :name="data.name"
  :left="data.x"
  :top="data.y"
)
  TileHeader(
    :name="data.name"
  )

  TileContent(
    :height="data.height"
    :width="data.width"
    :name="data.name"
  ) Extended Info
</template>

<script>
import TileBase from '../../mixins/TileBase';
import {scrollbar} from '@/directives';

export default {
  mixins: [TileBase],
  data() {
    return {
    };
  },
  directives: {
    scrollbar,
  },
  mounted() {
  },

};
</script>

<style lang="scss">
@import 'variables';
</style>
