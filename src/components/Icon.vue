// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
svg.svgIcon(v-on="$listeners")
  use(:xlink:href="`#${id}`")
</template>

<script>
export default {
  props: {
    id: {
      type: [String, Number],
      required: true,
      default: '',
    },
  },
};
</script>

