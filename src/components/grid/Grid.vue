// Copyright 2017, 2018 Tensigma Ltd.

// Licensed under the Microsoft Reference Source License (MS-RSL)

// This license governs use of the accompanying software. If you use the software, you accept this license.
// If you do not accept the license, do not use the software.

// 1. Definitions
// The terms "reproduce," "reproduction," and "distribution" have the same meaning here as under U.S. copyright law.
// "You" means the licensee of the software.
// "Your company" means the company you worked for when you downloaded the software.
// "Reference use" means use of the software within your company as a reference, in read only form, for the sole purposes
// of debugging your products, maintaining your products, or enhancing the interoperability of your products with the
// software, and specifically excludes the right to distribute the software outside of your company.
// "Licensed patents" means any Licensor patent claims which read directly on the software as distributed by the Licensor
// under this license.

// 2. Grant of Rights
// (A) Copyright Grant- Subject to the terms of this license, the Licensor grants you a non-transferable, non-exclusive,
// worldwide, royalty-free copyright license to reproduce the software for reference use.
// (B) Patent Grant- Subject to the terms of this license, the Licensor grants you a non-transferable, non-exclusive,
// worldwide, royalty-free patent license under licensed patents for reference use.

// 3. Limitations
// (A) No Trademark License- This license does not grant you any rights to use the Licensor’s name, logo, or trademarks.
// (B) If you begin patent litigation against the Licensor over patents that you think may apply to the software
// (including a cross-claim or counterclaim in a lawsuit), your license to the software ends automatically.
// (C) The software is licensed "as-is." You bear the risk of using it. The Licensor gives no express warranties,
// guarantees or conditions. You may have additional consumer rights under your local laws which this license cannot
// change. To the extent permitted under your local laws, the Licensor excludes the implied warranties of merchantability,
// fitness for a particular purpose and non-infringement.

<template lang="pug">
.grid
  UserVisibility(hide-on-logout)
    .grid__edit(@click="setIsEdit") Edit
  GridPanel(:data="getHiddenLayout", :isEdit="isEdit")
  GridLayout(
      :layout="(gridData)",
      :col-num="12",
      :row-height="60",
      :is-draggable="isEdit",
      :is-resizable="isEdit",
      :vertical-compact="true",
      :margin="[0, 0]",
      :use-css-transforms="true",
      @layout-updated="layoutUpdatedEvent",
    )
    GridItem(
        v-for="(item, index) in (gridData)",
        :key="index",
        :x="item.x",
        :y="item.y",
        :w="item.w",
        :h="item.h",
        :i="item.i",
        :minW="item.minW",
        :minH="item.minH",
        :maxH="item.maxH",
      )
      GridItems(
        :component="item.i",
        :index="index"
      )
</template>

<script>
import VueGridLayout from 'vue-grid-layout';
import {mapState, mapMutations, mapGetters} from 'vuex';
import UserVisibility from 'components/UserVisibility';
import GridItems from './GridItems';
import GridPanel from './GridPanel';

const GridLayout = VueGridLayout.GridLayout;
const GridItem = VueGridLayout.GridItem;

export default {
  computed: {
    ...mapState('grid', {
      allGridLayout: 'allGridLayout',
      gridData: 'gridData',
      isEdit: 'isEdit',
    }),
    ...mapGetters('grid', {
      getHiddenLayout: 'getHiddenLayout',
    }),
  },
  methods: {
    ...mapMutations('grid', {
      changeGrid: 'changeGrid',
      setIsEdit: 'setIsEdit',
    }),
    layoutUpdatedEvent(newLayout) {
      this.changeGrid(newLayout);
      // console.log('Updated layout: ', newLayout);
    },
  },
  components: {
    GridLayout,
    GridItem,
    GridItems,
    GridPanel,
    UserVisibility,
  },
};
</script>

<style lang="scss">
  .grid {
    margin: 0 1px;
    &__edit {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      border: 1px solid rgb(24, 34, 53);
      border-radius: 50%;
      margin-bottom: 5px;
      &:hover {
        background: rgb(24, 34, 53);
      }
    }
  }
</style>
