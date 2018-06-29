<template lang="pug">
.widgetDropdown
  .widgetDropdown__group(v-for="widget in widgetGroup") {{widget.name}}
    .widgetDropdown__list
      .widgetDropdown__item(v-for="item in widget.items") {{item}}
</template>

<script>

export default {
  data() {
    return {
      widgetGroup: [
        {
          name: 'Trading',
          items: [
            'Chart',
            'Depth Chart',
            'Trade History',
            'Order Book',
            'Orders',
            'Token List',
          ],
        },
        {
          name: 'Property',
          items: [
            'Token Info',
            'Extended Info',
            'Photos',
            'Yield',
            'Documents',
          ],
        },
        {
          name: 'Personal',
          items: [
            'Trading',
            'Research',
            'Saved Views',
          ],
        },
      ],
    };
  },
  computed: {
  },
  methods: {
  },
  watch: {
  },
  created() {
  },
  components: {
  },
};
</script>

<style lang="scss">
@import 'variables';
.widgetDropdown {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 360px;
  height: 35px;
  border-radius: 3px;
  background-color: $background__blue;
  &__group {
    width: 120px;
    text-align: center;
    cursor: pointer;
    position: relative;
    color: $color__white;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    &:not(:last-of-type) {
      border-right: 1px solid $color__white;
    }
    &:hover > .widgetDropdown__list {
      height: 300px;
    }
  }
  &__list {
    position: absolute;
    overflow: hidden;
    height: 0;
    width: 100%;
    margin-top: 35px;
    background-color: $background__white;
    border-radius: 3px;
    top: -9px;
    left: 0;
    z-index: 1;
    transition: height 1s ease-out;
    &:hover {
      height: 300px;
    }
  }
  &__item {
    width: 100%;
    cursor: pointer;
    margin-top: 7px;
    padding: 12px;
    display: flex;
    text-align: center;
    justify-content: center;
    color: $color__white;
    background-color: $background__blue;
    font-size: 12px;
    font-weight: 400;
    border-radius: 3px;
    text-transform: capitalize;
    &:hover {
      opacity: 0.6;
    }
  }
}
</style>
