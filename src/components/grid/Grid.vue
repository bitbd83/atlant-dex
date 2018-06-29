<template lang="pug">
.grid(v-scrollbar="")
  // UserVisibility(hide-on-logout)
  //  .grid__edit(@click="setIsEdit") Edit
  // GridPanel(:data="getHiddenLayout", :isEdit="isEdit")
  Draggable.grid__draggable(v-model="grid", :options="{handle: '.gridTile__header'}")
    GridTile(v-for="item in grid", :key="item.order", :data="item")
  // AddTile
</template>

<script>
import {mapState, mapMutations, mapGetters} from 'vuex';
import Draggable from 'vuedraggable';
import elementResizeDetectorMaker from 'element-resize-detector';
import {scrollbar} from '@/directives';
import UserVisibility from 'components/UserVisibility';
import GridTile from './GridTile';
import GridPanel from './GridPanel';
import AddTile from './AddTile';

export default {
  data() {
    return {
      erd: {},
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
    grid: {
      get() {
        return this.gridData;
      },
      set(value) {
        this.changeGrid(value);
      },
    },
  },
  methods: {
    ...mapMutations('grid', [
      'changeGrid',
      'setIsEdit',
      'setTileHeight',
    ]),
  },
  mounted() {
    let erd = elementResizeDetectorMaker({
      strategy: 'scroll',
    });
    for (let i of this.grid) {
      erd.listenTo(document.getElementsByClassName('gridTile__content--' + i.name)[0], (element) => {
        this.setTileHeight({name: i.name, height: element.offsetHeight + 'px'});
      });
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
  .grid {
    position: relative;
    display: flex;
    overflow: auto;
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
