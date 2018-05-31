<template lang="pug">
  .mainLayout
    Grid.mainLayout__dashboard(v-scrollbar="")
    .mainLayout__another(:class="{'mainLayout__another--activeSidebar': showSidebar}", v-scrollbar="") Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
</template>

<script>
import {mapState} from 'vuex';
import {scrollbar} from '@/directives';
import Grid from 'components/grid/Grid';

export default {
  computed: {
    ...mapState('misc', {
      showSidebar: 'showSidebar',
    }),
  },
  directives: {
    scrollbar,
  },
  components: {
    Grid,
  },
};
</script>

<style lang="scss">
@import 'variables';

.mainLayout {
  display: flex;
  &__dashboard {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    z-index: 1;
    background: $background__white;
  }
  &__another {
    position: relative;
    display: flex;
    flex: 1;
    background: $background__grey_white;
    margin-left: 0;
    transition: $transition__sidebarAction;
    &--activeSidebar {
      margin-left: -270px;
      transition: $transition__sidebarAction;
    }
  }
}
</style>
