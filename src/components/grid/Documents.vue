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
  )
    .documents
      <VueTreeExample :model="model"></VueTreeExample>
</template>

<script>
import TileBase from '../../mixins/TileBase';
import {scrollbar} from '@/directives';
import VueTreeExample from 'vue-tree-example';

export default {
  mixins: [TileBase],
  components: {
    VueTreeExample,
  },
  data() {
    return {
      model: {
        name: 'My Tree',
        children: [
          {
            name: 'hello',
          },
          {
            name: 'wat',
          },
          {
            name: 'child folder',
            children: [
              {
                name: 'child folder',
                children: [
                  {
                    name: 'hello',
                  },
                  {
                    name: 'wat',
                  },
                ],
              },
              {
                name: 'hello',
              },
              {
                name: 'wat',
              },
              {
                name: 'child folder',
                children: [
                  {
                    name: 'hello',
                  },
                  {
                    name: 'wat',
                  },
                ],
              },
            ],
          },
        ],
      },
    };
  },
  directives: {
    scrollbar,
  },
  methods: {},
};
</script>

<style lang="scss">
@import 'variables';
</style>
