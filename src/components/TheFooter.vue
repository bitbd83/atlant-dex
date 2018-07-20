// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.footer
  .footer__text TEST FOOTER
  TheHeaderLogout
</template>

<script>
import TheHeaderLogout from 'components/TheHeaderLogout';

export default {
  components: {
    TheHeaderLogout,
  },
};
</script>

<style lang="scss">
  .footer {
    display: flex;
    justify-content: space-between;
    background-color: #000;
    padding: 32px;
    &__text {
      color: #fff;
    }
  }
</style>
