<template lang='pug'>
.gridTile__headerContainer(:class="`gridTile__headerContainer--${ name }`")
    .gridTile__header
      .title.gridTile__title {{title}}:
      slot
      Icon.gridTile__icon(id="cross" @click="removeTile(name)")
</template>

<script>
import {mapMutations} from 'vuex';
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapMutations(
      'grid',
      [
        'removeTile',
      ]
    ),
  },
};
</script>

<style lang="scss" scoped>
@import 'variables';

.gridTile {
  &__headerContainer {
    padding: 10px 0;
    border-radius: 8px 8px 0 0;
  }
  &__header {
    min-height: 28px;
    max-height: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 42px;
    border-left: 5px solid $color__blue;
    cursor: move;
  }
  &__title {
    white-space: nowrap;
    margin-left: 25px;
  }
  &__icon {
    fill: $fill__red;
    width: 12px;
    height: 12px;
    cursor: pointer;
    margin-right: 9px;
  }
}
</style>
