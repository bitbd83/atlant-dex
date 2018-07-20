// Copyright 2017, 2018 Tensigma Ltd.

// Licensed under the Microsoft Reference Source License (MS-RSL)

// This license governs use of the accompanying software. If you use the software, you accept this license.
// If you do not accept the license, do not use the software.

// 1. Definitions
// The terms "reproduce," "reproduction," and "distribution" have the same meaning here as under U.S. copyright law.
// "You" means the licensee of the software.
// "Your company" means the company you worked for when you downloaded the software.
// "Reference use" means use of the software within your company as a reference, in read only form, for the sole purposes
// of debugging your products, maintaining your products, or enhancing the interoperability of your products with the
// software, and specifically excludes the right to distribute the software outside of your company.
// "Licensed patents" means any Licensor patent claims which read directly on the software as distributed by the Licensor
// under this license.

// 2. Grant of Rights
// (A) Copyright Grant- Subject to the terms of this license, the Licensor grants you a non-transferable, non-exclusive,
// worldwide, royalty-free copyright license to reproduce the software for reference use.
// (B) Patent Grant- Subject to the terms of this license, the Licensor grants you a non-transferable, non-exclusive,
// worldwide, royalty-free patent license under licensed patents for reference use.

// 3. Limitations
// (A) No Trademark License- This license does not grant you any rights to use the Licensor’s name, logo, or trademarks.
// (B) If you begin patent litigation against the Licensor over patents that you think may apply to the software
// (including a cross-claim or counterclaim in a lawsuit), your license to the software ends automatically.
// (C) The software is licensed "as-is." You bear the risk of using it. The Licensor gives no express warranties,
// guarantees or conditions. You may have additional consumer rights under your local laws which this license cannot
// change. To the extent permitted under your local laws, the Licensor excludes the implied warranties of merchantability,
// fitness for a particular purpose and non-infringement.

<template lang="pug">
.widgetDropdown
  .widgetDropdown__group(v-for="widget in widgetGroup", :class="'widgetDropdown__group--' + widget.name", @mouseover="hoverEnter(widget.name)" @mouseout="hoverLeave(widget.name)") {{widget.name}}
    .widgetDropdown__list(:class="'widgetDropdown__list--' + widget.name")
      .widgetDropdown__item(v-for="item in widget.items", :class="{'widgetDropdown__item--open' : item.isHidden === false}" @click.stop="widgetAction(item)") {{getWidgetTitle(item.name)}}
</template>

<script>
import {mapMutations, mapActions} from 'vuex';
import {getWidgetType, getWidgetTitle, defaultViews} from 'services/grid';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters('grid', [
      'getSavedViews',
      'getGridData',
    ]),
    widgetGroup() {
      return [
        {
          name: 'trading',
          items: this.gridData.filter((item) => getWidgetType(item.name) === 'trade'),
        },
        {
          name: 'property',
          items: this.gridData.filter((item) => getWidgetType(item.name) === 'property'),
        },
        {
          name: 'views',
          items: [
            ...defaultViews,
            {
              name: 'Save Views',
            },
          ],
        },
      ];
    },
  },
  methods: {
    ...mapMutations('modal', [
      'open',
    ]),
    ...mapMutations('grid', [
      'addTile',
      'setGrid',
      'addView',
    ]),
    ...mapActions('grid', [
      'removeTileFromDashboard',
      'removeAllTiles',
      'addTileToDashboard',
      'setupDashboard',
    ]),
    getWidgetTitle(name) {
      return getWidgetTitle(name);
    },
    widgetAction(obj) {
      if (obj.type === 'saveView') {
        this.open({
          name: 'saveView',
          data: {
            saveView: (name) => {
              this.addView(name);
            },
          },
        });
      } else if (obj.grid) {
        this.removeAllTiles();
        this.$nextTick(() => {
          this.setGrid(obj.grid);
          this.$nextTick(() => {
            this.setupDashboard();
          });
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
        this.$nextTick(() => {
          this.addTileToDashboard({
            name: tile.name,
            target: document.getElementsByClassName('gridTile--' + tile.name)[0],
            trigger: '.gridTile__headerContainer--' + tile.name,
            container: document.getElementsByClassName('gridTile__content--' + tile.name)[0],
            isHideable: true,
            isResizeable: true,
          });
        });
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
