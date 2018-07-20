<template lang='pug'>
Tile(
  :name="data.name"
  :left="data.x"
  :top="data.y"
)
  TileHeader(
    :name="data.name"
    :title="data.title"
  )

  TileContent(
    :height="data.height"
    :width="data.width"
  ) Hellll yeah!
</template>

<script>
import Tile from './Tile';
import TileHeader from './TileHeader';
import TileContent from './TileContent';

export default {
  components: {
    Tile,
    TileHeader,
    TileContent,
  },
  data() {
    return {
      data: {name: 'test', title: 'Test title', height: 400, width: 740, x: 0, y: 0, isHidden: false},
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
