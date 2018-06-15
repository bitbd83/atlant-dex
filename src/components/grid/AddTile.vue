<template lang='pug'>
.addTile
  Icon(id="plus")
  .addTile__text Add new block
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

export default {
  computed: {
    ...mapGetters('grid', [
      'getTileHeight',
    ]),
  },
  methods: {
    ...mapMutations('grid', [
    ]),
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
@import 'variables';

.addTile {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: $default_spacing;
  &__text {
    color: #004dff;
    line-height: 25px;
    font-weight: 500;
    text-transform: uppercase;
  }
  &__icon {
    fill: $fill__red;
    width: 19px;
    height: 15px;
    cursor: pointer;
  }
}
</style>
