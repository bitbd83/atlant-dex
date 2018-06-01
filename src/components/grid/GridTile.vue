<template lang='pug'>
.gridTile
  .gridTile__header
    .title.gridTile__title {{title}}
    Icon.gridTile__icon(id="hide")
  .gridTile__content
    slot
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: '',
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'variables';
@import '~perfect-scrollbar/dist/css/perfect-scrollbar';

.gridTile {
  display: flex;
  flex-direction: column;
  width: 100%;
  &__header {
    min-height: 42px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 42px;
    border-left: 7px solid $color__blue;
    margin-bottom: 13px;
  }
  &__title {
    margin-left: 20px;
  }
  &__icon {
    fill: $fill__red;
    width: 19px;
    height: 15px;
    cursor: pointer;
  }
  &__content {
    display: flex;
    overflow: hidden;
  }
}
</style>
