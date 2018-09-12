<template lang='pug'>
.gridTile(
  :class="`gridTile--${ name }`"
  :style="style"
)
  .gridTile__container
    slot
</template>

<script>
export default {
  data() {
    return {
      zIndex: 0,
    };
  },
  computed: {
    style() {
      return {
        left: this.left + 'px',
        top: this.top + 'px',
        zIndex: this.zIndex,
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
    this.zIndex = this.getMaxZIndex();
  },
};
</script>

<style lang="scss" scoped>
@import 'variables';

.index--dark .gridTile__container{
  background-color: $background__dark_theme;
}

.gridTile {
  position: absolute;
  padding: 20px;
  &__container {
    display: flex;
    flex-direction: column;
    background-color: $background__grey_white;
    border-radius: 8px;
  }
}
</style>
