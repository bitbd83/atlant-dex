// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.widgetDropdown
  .widgetDropdown__group(v-for="widget in widgetsByGroup", :class="'widgetDropdown__group--' + widget.name", @mouseover="hoverEnter(widget.name)" @mouseout="hoverLeave(widget.name)") {{widget.name}}
    .widgetDropdown__list(:class="'widgetDropdown__list--' + widget.name")
      .widgetDropdown__item(
        v-for="item in widget.items",
        :class="{'widgetDropdown__item--open' : item.isHidden === false}"
        @click.stop="widgetAction(item)"
        )
          <div v-if="item.type != 'custom'">{{$t(`widgetTitles.${item.name}`)}}</div>
          <div v-if="item.type == 'custom'">{{item.name}}</div>
</template>

<script>
import {mapMutations, mapGetters, mapActions} from 'vuex';
import {setupDashboard, addTileToDashboard} from 'services/grid';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters('grid', ['widgetsByGroup']),
  },
  methods: {
    ...mapMutations(
      'modal',
      [
        'open',
      ]
    ),
    ...mapMutations(
      'grid',
      [
        'addTile',
        'setGrid',
        'addView',
      ]
    ),
    ...mapActions(
      'grid',
      [
        'removeTileFromDashboard',
        'removeAllTiles',
      ]
    ),
    widgetAction(obj) {
      if (obj.name === 'saveView') {
        this.open({
          name: 'saveView',
          data: {
            saveView: (name) => {
              this.addView(name);
            },
          },
        });
      } else if (obj.grid) {
        this.setGrid(obj.grid);
        this.$nextTick(() => {
          setupDashboard(this.$store);
        });
      } else {
        this.toggleTile(obj);
      }
    },
    toggleTile(tile) {
      if (!tile.isHidden) {
        this.removeTileFromDashboard(tile.name);
      } else {
        this.addTile(tile.name);
        this.$nextTick(
          () => {
            addTileToDashboard(
              this.$store,
              {
                name: tile.name,
                target: document.getElementsByClassName('gridTile--' + tile.name)[0],
                trigger: '.gridTile__headerContainer--' + tile.name,
                container: document.getElementsByClassName('gridTile__content--' + tile.name)[0],
                isHideable: true,
                isResizeable: true,
                ...tile,
              }
            );
          }
        );
      };
    },
    hoverEnter(name) {
      let listHeight = 0;
      for (let item of document.querySelector('.widgetDropdown__list--' + name).children) {
        listHeight += item.offsetHeight + 7; // TODO: remove hardcode for margin height
      };
      document.querySelector('.widgetDropdown__list--' + name).style.height = `${listHeight}px`;
    },
    hoverLeave(name) {
      document.querySelector('.widgetDropdown__list--' + name).style.height = 0;
    },
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
      border-right: 2px solid $color__white;
    }
  }
  &__list {
    position: absolute;
    overflow: hidden;
    height: 0;
    width: 100%;
    margin-top: 35px;
    background-color: $background__grey_white;
    border-radius: 3px;
    top: -10px;
    left: 0;
    z-index: 1000000;
    transition: height 0.5s ease-out;
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
    &--open {
      background-color: $color__green;
    }
  }
}
</style>
