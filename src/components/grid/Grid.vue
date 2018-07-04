<template lang="pug">
.grid(v-scrollbar="")
  // UserVisibility(hide-on-logout)
  //  .grid__edit(@click="setIsEdit") Edit
  // GridPanel(:data="getHiddenLayout", :isEdit="isEdit")
  GridTile(v-for="item in visibleGrid", :key="item.name", :data="item")
  // AddTile
</template>

<script>
import {mapState, mapActions} from 'vuex';
import Draggable from 'gsap/Draggable';
import {scrollbar} from '@/directives';
import UserVisibility from 'components/UserVisibility';
import GridTile from './GridTile';
import GridPanel from './GridPanel';
import AddTile from './AddTile';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState('grid', [
      'gridData',
    ]),
    visibleGrid() {
      return this.gridData.filter((item) => item.isHidden === false);
    },
  },
  methods: {
    ...mapActions('grid', [
      'setupDashboard',
    ]),
  },
  mounted() {
    this.setupDashboard();
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
  }
</style>
