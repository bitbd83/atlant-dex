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

