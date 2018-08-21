// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
  .pagination(v-show="pageCount > 1")
        .pagination__container
          Icon.pagination__arrow.pagination__arrow--double.pagination__arrow-first(
            id="icon-pagination-global",
            :class="{'pagination__arrow-active' : page > 1}",
            @click="page > 1 ? pageAction(1) : ''"
          )
          Icon.pagination__arrow.pagination__arrow-before(
            id="icon-pagination",
            :class="{'pagination__arrow-active' : page > 1}",
            @click="page > 1 ? pageAction(page - 1) : ''"
          )
          .pagination__number(v-show="page > 3" , @click="pageAction(1)") 1
          .pagination__space(v-show="page > 4") ...
          .pagination__number(v-show="(page - 2) > 0", @click="pageAction(page - 2)") {{page - 2}}
          .pagination__number(v-show="(page - 1) > 0", @click="pageAction(page - 1)") {{page - 1}}
          .pagination__number.pagination__number-active {{page}} page
          .pagination__number(v-show="(page + 1) < pageCount", @click="pageAction(page+1)") {{page + 1}}
          .pagination__number(v-show="(page + 2) < pageCount", @click="pageAction(page + 2)") {{page + 2}}
          .pagination__space(v-show="(page + 3) < pageCount") ...
          .pagination__number(v-show="page < pageCount", @click="pageAction(pageCount)") {{pageCount}}
          Icon.pagination__arrow.pagination__arrow-next(
            id="icon-pagination",
            :class="{'pagination__arrow-active' : page < pageCount}",
            @click="page < pageCount ? pageAction(page + 1) : ''"
          )
          Icon.pagination__arrow.pagination__arrow-last.pagination__arrow--double(
            id="icon-pagination-global",
            :class="{'pagination__arrow-active' : page < pageCount}",
            @click="page < pageCount ? pageAction(pageCount) : '' "
          )
</template>

<script>

export default {
  props: {
    page: {
      type: Number,
    },
    pageCount: {
      type: Number,
    },
    pageAction: {
      type: Function,
    },
  },
};
</script>

<style lang="scss">
@import 'variables';

.pagination {
  display: flex;
  // justify-content: center;
  margin: 46px 0;

  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__number {
    position: relative;
    color: $color__black;
    font-size: 16px;
    text-align: center;
    margin: 0 16px;
    white-space: nowrap;
    cursor: pointer;

    &-active {
      color: $color__blue;
      font-weight: 700;
      cursor: default;
      margin: 0 30px;

      &:after {
        content: "";
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 100%;
        height: 3px;
        background: $background__blue;
      }
    }
    &:first-of-type {
      margin-right: 0;
      margin-left: 35.5px;
    }

    &:last-of-type {
      margin-right: 23px;
    }
  }

  &__arrow {
    width: 5px;
    height: 8px;
    fill: $background__dark;
    opacity: 0.5;
    // margin: 0 18.5px;
    &-active {
      opacity: 1;
      cursor: pointer;
      fill: $background__blue;
    }
    &-first {
      transform: rotate(180deg);
    }
    &-before {
      transform: rotate(180deg);
    }
    &--double {
      width: 16px;
      &:first-of-type {
        margin-left: 0;
        margin-right: 35.5px;
      }

      &:last-of-type {
        margin-right: 0;
        margin-left: 35.5px;
      }
    }
  }

  &__space {
    margin: 0 20px;
    cursor: default;
  }
}
</style>
