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

<template lang='pug'>
.photos
  .photos__container
    .gallery-info
      span.current {{ active + 1 }}
      span.length  / {{ length }}
    .gallery
      .gallery-cell(
        v-for="(el, index) in preparedImages"
        :style="{ backgroundImage: 'url(' + el.src + ')' }"
        @click="setActive(el)"
      )
    .gallery-bottom
      span.left(@click="prev()")
      span.address {{ address }}
      span.right(@click="next()")
</template>

<script>
// import {mapState, mapGetters, mapActions} from 'vuex';
import {scrollbar} from '@/directives';

export default {
  data() {
    return {
      active: 0,
      images: [
        '/static/test_images/1.jpg',
        '/static/test_images/2.jpg',
        '/static/test_images/3.jpg',
        '/static/test_images/4.jpg',
        '/static/test_images/5.jpg',
      ],
      address: '42 E 12th St, New York',
    };
  },
  computed: {
    preparedImages() {
      let imgs = this.images
        .map(
          (el, index) => {
            return {
              index: index,
              src: el,
            };
          }
        );
      return imgs.concat(imgs)
        .concat(imgs)
        .slice(this.active)
        .slice(0, 3);
    },
    length() {
      return this.images.length;
    },
  },
  directives: {
    scrollbar,
  },
  methods: {
    setActive(el) {
      this.active = el.index;
    },
    prev() {
      if (this.active <= 0) {
        this.active = this.length - 1;
      } else {
        this.active--;
      }
    },
    next() {
      if (this.active >= this.length - 1) {
        this.active = 0;
      } else {
        this.active++;
      }
    },
  },
};
</script>

<style lang="scss">
@import 'variables';
.photos {
  display: flex;
  width: 100%;
  background-color: $background__white;
  padding: 35px 45px;
  border-radius: 8px;
  border: 1px solid $color__grey_border;

  &__container {
    position: relative;
    overflow: hidden;
    width: 100%;
  }

  & .gallery-info{
    position: absolute;
    right: 0;
  }

  & .gallery-info span:first-child{
    font-size: 18px;
    color: $color__blue;
  }

  & .gallery-info span:last-child{
    font-size: 12px;
  }

  & .gallery{
    display: flex;
    align-items: center;
  }

  & .gallery-cell {
    width: 207px;
    height: 137px;
    margin-right: 16px;
    background: #8C8;
    counter-increment: gallery-cell;
    background-size: cover;
    opacity: 0.5;
    cursor: pointer;
  }

  & .gallery-cell:first-child {
    width: 312px;
    height: 194px;
    transition: all 0.2s;
    opacity: 1;
  }

  & .gallery-cell:last-child{
    margin-right: 0;
  }

  & .gallery-bottom{
    display: flex;
    justify-content: space-between;
    margin-top: 32px;
    align-items: center;

    & .address{
      color: $color__grey;
      font-size: 12px;
      font-weight: 100;
    }

    & .right,
    & .left{
      display: block;
      width: 11px;
      height: 19px;
      background-repeat: no-repeat;
      cursor: pointer;
    }

    & .left{
      background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIxMXB4IiBoZWlnaHQ9IjE4cHgiIHZpZXdCb3g9IjAgMCAxMSAxOCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5QYXRoIDY8L3RpdGxlPiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4gICAgPGRlZnM+PC9kZWZzPiAgICA8ZyBpZD0iTUFJTiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+ICAgICAgICA8ZyBpZD0iV0lER0VUUyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzMC4wMDAwMDAsIC00OTg2LjAwMDAwMCkiPiAgICAgICAgICAgIDxyZWN0IGZpbGw9IiNGRkYiIHg9IjAiIHk9IjAiIHdpZHRoPSIyNTA2IiBoZWlnaHQ9IjYyNDgiPjwvcmVjdD4gICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIzMi4wMDAwMDAsIDQ5ODAuMDAwMDAwKSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiPiAgICAgICAgICAgICAgICA8cG9seWxpbmUgaWQ9IlBhdGgtNiIgcG9pbnRzPSI4LjIxNzQ4OTAyIDcgMS40MjEwODU0N2UtMTQgMTUgOC4yMTc0ODkwMiAyMi45ODUxMDU1Ij48L3BvbHlsaW5lPiAgICAgICAgICAgIDwvZz4gICAgICAgIDwvZz4gICAgPC9nPjwvc3ZnPg==);
    }

    & .right{
      background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIxMXB4IiBoZWlnaHQ9IjE4cHgiIHZpZXdCb3g9IjAgMCAxMSAxOCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5QYXRoIDYgQ29weTwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJNQUlOIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgICAgIDxnIGlkPSJXSURHRVRTIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtOTgwLjAwMDAwMCwgLTQ5ODYuMDAwMDAwKSI+ICAgICAgICAgICAgPHJlY3QgZmlsbD0iI0ZGRiIgeD0iMCIgeT0iMCIgd2lkdGg9IjI1MDYiIGhlaWdodD0iNjI0OCI+PC9yZWN0PiAgICAgICAgICAgIDxnIGlkPSJHcm91cC0yNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjMyLjAwMDAwMCwgNDk4MC4wMDAwMDApIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiI+ICAgICAgICAgICAgICAgIDxwb2x5bGluZSBpZD0iUGF0aC02LUNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDc1My4xMDg3NDUsIDE0Ljk5MjU1Mykgc2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtNzUzLjEwODc0NSwgLTE0Ljk5MjU1MykgIiBwb2ludHM9Ijc1Ny4yMTc0ODkgNyA3NDkgMTUgNzU3LjIxNzQ4OSAyMi45ODUxMDU1Ij48L3BvbHlsaW5lPiAgICAgICAgICAgIDwvZz4gICAgICAgIDwvZz4gICAgPC9nPjwvc3ZnPg==);
    }
  }
}
</style>
