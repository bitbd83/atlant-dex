<template lang='pug'>
.gridTile__content(
  :class="`gridTile__content--${ name }`"
  :style="style"
)
  slot
</template>

<script>
export default {
  computed: {
    style() {
      return {
        height: this.height + 'px',
        width: this.width + 'px',
      };
    },
  },
  props: {
    height: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'variables';

.gridTile__content {
  position: relative;
  display: flex;
  overflow: hidden;
  resize: both;
  &::before,
  &::after {
    content: '';
    position: absolute;
    bottom: 0px;
    right: 0px;
    border-color: transparent;
    border-style: solid;
  }
  &::after {
    border-width: 6.5px;
    border-right-color: $color__blue;
    border-bottom-color: $color__blue;
    cursor: nw-resize;
  }
}
</style>
