<template lang='pug'>
.gridTile__headerContainer(:class="`gridTile__headerContainer--${ name }`")
    .gridTile__header
      .title.gridTile__title {{$t(`widgetTitles.${ name }`)}}:
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

.index--dark{
  & .gridTile__header{
    border-color: $border__color_dark;
  }

  & .gridTile__title{
    color: $color_white;
  }
}

.gridTile {
  &__headerContainer {
    padding: 5px 0;
    border-radius: 8px 8px 0 0;
  }
  &__header {
    min-height: 20px;
    max-height: 20px;
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
