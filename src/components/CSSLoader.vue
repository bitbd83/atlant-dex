// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
  .loader
    .loader__body(:class="{'loader__body--white' : isWhite}")
    .loader__body(:class="{'loader__body--white' : isWhite}")
</template>
<script>
export default {
  props: {
    isWhite: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
  $size: 64px;
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -$size / 2;
    margin-top: -$size / 2;

    &__body {
      position: absolute;
      border: 4px solid #004dff;
      opacity: 1;
      width: $size;
      height: $size;
      border-radius: 50%;
      animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
      &--white {
        border-color: #fff;
      }
      &:nth-child(2) {
        animation-delay: -1s;
      }
    }
  }

  @keyframes lds-ripple {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
</style>
