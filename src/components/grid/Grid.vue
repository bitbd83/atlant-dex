<template lang="pug">
.grid
  // UserVisibility(hide-on-logout)
  //  .grid__edit(@click="setIsEdit") Edit
  // GridPanel(:data="getHiddenLayout", :isEdit="isEdit")
  Draggable.grid__draggable(v-model="grid", :options="{handle: '.gridTile__header'}")
    GridTile(v-for="item in grid", :key="item.order", :data="item")
</template>

<script>
import {mapState, mapMutations, mapGetters} from 'vuex';
import Draggable from 'vuedraggable';
import UserVisibility from 'components/UserVisibility';
import GridTile from './GridTile';
import GridPanel from './GridPanel';

export default {
  data() {
    return {
      resizeSensor: {},
    };
  },
  computed: {
    ...mapState('grid', [
      'allGridLayout',
      'gridData',
      'isEdit',
    ]),
    ...mapGetters('grid', {
      // getHiddenLayout: 'getHiddenLayout',
    }),
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
    ...mapMutations('grid', {
      changeGrid: 'changeGrid',
      setIsEdit: 'setIsEdit',
    }),

    // layoutUpdatedEvent(newLayout) {
    //   this.changeGrid(newLayout);
    // },
  },
  mounted() {
  },
  components: {
    GridPanel,
    UserVisibility,
    Draggable,
    GridTile,
  },
};
</script>

<style lang="scss">
  .grid {
    margin: 0 1px;
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
