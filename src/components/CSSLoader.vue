// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template>
  <div class="lds-ripple">
    <div></div>
    <div></div>
  </div>
</template>

<style scoped>
  @import "~variables";
  .lds-ripple {
    display: inline-block;
    position: absolute;
    width: 64px;
    height: 64px;
    left: 50%;
    top: 50%;
    margin-left: -32px;
    margin-top: -32px;
  }
  .lds-ripple div {
    position: absolute;
    border: 4px solid #004dff;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .lds-ripple div:nth-child(2) {
    animation-delay: -1s;
  }
  @keyframes lds-ripple {
    0% {
      top: 28px;
      left: 28px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: -1px;
      left: -1px;
      width: 58px;
      height: 58px;
      opacity: 0;
    }
  }

</style>
