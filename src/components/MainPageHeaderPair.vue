// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.pair
  .title.pair__title Current pair:
  TheHeaderPairDropdown(:isBase="true", :showOptions="currentDropdown === 'base'", @setShow="toggleShow")
  Icon.pair__exchange(id="exchange")
  TheHeaderPairDropdown(:isBase="false", :showOptions="currentDropdown === 'quote'", @setShow="toggleShow")
</template>

<script>
import TheHeaderPairDropdown from './TheHeaderPairDropdown';

export default {
  data() {
    return {
      currentDropdown: 'base',
    };
  },
  methods: {
    toggleShow(curType) {
      this.currentDropdown = curType;
    },
  },
  components: {
    TheHeaderPairDropdown,
  },
};
</script>

<style lang="scss">
@import 'variables';
.pair {
  display: flex;
  align-items: center;
  background-color: transparent;
  z-index: 1000001;
  &__title {
    position: relative;
    white-space: nowrap;
    margin-right: 30px;
  }
  &__exchange {
    $size: 16px;
    height: $size;
    width: $size;
    margin: 0 18px 0 50px;
  }
}
</style>
