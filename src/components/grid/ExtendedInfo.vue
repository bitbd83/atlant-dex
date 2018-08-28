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
    .extendedInfo
      .extendedInfo__title MAIN FACTS
      .extendedInfo__container(v-scrollbar="")
        ul.extendedInfo__list
          li.extendedInfo__item Condo
          li.extendedInfo__item Built in 2003
          li.extendedInfo__item Days on Atlant: Less than 1 day on
          li.extendedInfo__item Atlant
          li.extendedInfo__item Views since listing: 25
          li.extendedInfo__item 0 shoppers saved this home
        ul.extendedInfo__list
          li.extendedInfo__item Pets: Contact manager
          li.extendedInfo__item Parking: 1 space
          li.extendedInfo__item Price/sqft: $980
          li.extendedInfo__item Built by: LandSea Homes
          li.extendedInfo__item View Interactive Floorplan
          li.extendedInfo__item Community name: Avora
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
.extendedInfo {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: $background__white;
  padding: 10px 0 10px 10px;
  border-radius: 8px;
  border: 1px solid $color__grey_border;
  padding: 28px 0 31px 0;

  &__title {
    font-family: "Century Gothic";
    font-size: 14px;
    font-weight: 700;
    line-height: 35px;
    text-transform: uppercase;
    margin-left: 65px;
    margin-bottom: 8px;
  }

  &__container {
    display: flex;
    flex-grow: 2;
  }

  &__list {
    flex-grow: 2;
    margin-left: 78px;
    list-style: square outside url('~assets/images/icon-list-point.png');
  }

  &__item {
    font-family: "Century Gothic";
    font-size: 14px;
    line-height: 35px;
    white-space: nowrap;
    padding-left: 32px;
  }
}
</style>
