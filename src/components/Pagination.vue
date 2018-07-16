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
  .pagination(v-show="pageCount > 1")
        .pagination__container
          Icon.pagination__arrow.pagination__arrow-first(
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
          .pagination__number.pagination__number-active Page {{page}}
          .pagination__number(v-show="(page + 1) < pageCount", @click="pageAction(page+1)") {{page + 1}}
          .pagination__number(v-show="(page + 2) < pageCount", @click="pageAction(page + 2)") {{page + 2}}
          .pagination__space(v-show="(page + 3) < pageCount") ...
          .pagination__number(v-show="page < pageCount", @click="pageAction(pageCount)") {{pageCount}}
          Icon.pagination__arrow.pagination__arrow-next(
            id="icon-pagination",
            :class="{'pagination__arrow-active' : page < pageCount}",
            @click="page < pageCount ? pageAction(page + 1) : ''"
          )
          Icon.pagination__arrow.pagination__arrow-last(
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
.pagination {
  display: flex;
  justify-content: center;
  margin: 46px 0;

  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__number {
    color: #ffffff;
    font-size: 16px;
    font-weight: 400;
    margin: 0 8px;
    white-space: nowrap;
    cursor: pointer;
    &-active {
      color: #ffc600;
      font-weight: 700;
      cursor: default;
    }
  }

  &__arrow {
    height: 8px;
    fill: #ffffff;
    opacity: 0.5;
    margin: 0 18.5px;
    &-active {
      opacity: 1;
      cursor: pointer;
    }
    &-first {
      transform: rotate(180deg);
    }
    &-before {
      transform: rotate(180deg);
    }
  }

  &__space {
    margin: 0 3px;
    cursor: default;
  }
}
</style>
