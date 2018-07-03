<template lang="pug">
.grid(v-scrollbar="")
  // UserVisibility(hide-on-logout)
  //  .grid__edit(@click="setIsEdit") Edit
  // GridPanel(:data="getHiddenLayout", :isEdit="isEdit")
  GridTile(v-for="item in gridData", :key="item.name", :data="item")
  // AddTile
</template>

<script>
import {mapState, mapMutations, mapGetters} from 'vuex';
import Draggable from 'gsap/Draggable';
import elementResizeDetectorMaker from 'element-resize-detector';
import {scrollbar} from '@/directives';
import UserVisibility from 'components/UserVisibility';
import GridTile from './GridTile';
import GridPanel from './GridPanel';
import AddTile from './AddTile';
import _ from 'lodash';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState('grid', [
      'allGridLayout',
      'gridData',
      'isEdit',
    ]),
    ...mapGetters('grid', [
      'getTileHeight',
    ]),
  },
  methods: {
    ...mapMutations('grid', [
      'changeGrid',
      'setIsEdit',
      'setTileSize',
      'setTilePosition',
    ]),
  },
  mounted() {
    let that = this;
    let erd = elementResizeDetectorMaker({
      strategy: 'scroll',
    });
    for (let i of this.gridData) {
      Draggable.create(document.getElementsByClassName('gridTile--' + i.name)[0], {
        type: 'top,left',
        // bounds: '.grid',
        trigger: '.gridTile__header--' + i.name,
        liveSnap: true,
        snap: {
          x: (endValue) => {
            return Math.round(endValue / 20) * 20;
          },
          y: (endValue) => {
            return Math.round(endValue / 20) * 20;
          },
        },
        onDragEnd: function() {
          that.setTilePosition({
            name: this.vars.trigger.split('--')[1],
            x: this.x,
            y: this.y,
          });
          // console.log(this.vars.trigger.split('--')[1], this.x, this.y);
        },
      });

      erd.listenTo(document.getElementsByClassName('gridTile__content--' + i.name)[0], _.debounce((el) => {
        document.getElementsByClassName('gridTile__content--' + i.name)[0].style.height = Math.round(el.offsetHeight / 20) * 20 + 'px';
        document.getElementsByClassName('gridTile__content--' + i.name)[0].style.width = Math.round(el.offsetWidth / 20) * 20 + 'px';
        this.setTileSize({
          name: i.name,
          height: el.offsetHeight,
          width: el.offsetWidth,
        });
      }, 100));
    }
  },
  components: {
    GridPanel,
    UserVisibility,
    Draggable,
    GridTile,
    AddTile,
  },
  directives: {
    scrollbar,
  },
};
</script>

<style lang="scss">
  @import 'variables';
  .grid {
    position: relative;
    display: flex;
    overflow: scroll;
    flex: 1;
    &__draggable {
      flex: 1;
    }
    &__edit {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      border: 1px solid rgb(24, 34, 53);
      border-radius: 50%;
      margin-bottom: 5px;
      &:hover {
        background: rgb(24, 34, 53);
      }
    }
  }
</style>
