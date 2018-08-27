<template lang='pug'>
.gridTile(
  :class="`gridTile--${ name }`"
  :style="style"
)
  slot
</template>

<script>
export default {
  computed: {
    style() {
      return {
        left: this.left + 'px',
        top: this.top + 'px',
        zIndex: this.getMaxZIndex(),
      };
    },
  },
  props: {
    left: {
      type: Number,
      required: true,
    },
    top: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  methods: {
    getMaxZIndex() {
      let maxZ = 0;
      for (let tile of document.getElementsByClassName('gridTile')) {
        maxZ = Math.max(maxZ, tile.style.zIndex);
      };
      return maxZ + 1;
    },
  },
  mounted() {
    this.style.zIndex = this.getMaxZIndex();
  },
};
</script>

<style lang="scss" scoped>
@import 'variables';

.gridTile {
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: $background__grey_white;
  border-radius: 8px;
  padding: 0;
}
</style>
