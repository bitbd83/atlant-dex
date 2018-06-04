<template lang='pug'>
.sidebar(:class="{'sidebar--visible' : showSidebar}")
  .sidebar__content
    SidebarPortfolio(v-if="section == 'wallet'")
    SidebarQuotes(v-if="section == 'charts'")
    SidebarAlerts(v-if="section == 'alert'")
  SidebarToolbar
</template>

<script>
import {mapMutations, mapState, mapGetters} from 'vuex';
import SidebarPortfolio from './SidebarPortfolio';
import SidebarAlerts from './SidebarAlerts';
import SidebarQuotes from './SidebarQuotes';
import SidebarToolbar from 'components/SidebarToolbar';

export default {
  computed: {
    ...mapState('misc', [
      'showSidebar',

    ]),
    ...mapGetters('misc', [
      'section',
    ]),
  },
  methods: {
    ...mapMutations('page', {
      openPage: 'open',
    }),
    getOpenPage() {
      this.openPage({
        name: '',
      });
    },
  },
  components: {
    SidebarPortfolio,
    SidebarAlerts,
    SidebarQuotes,
    SidebarToolbar,
  },
};

</script>

<style lang="scss">
@import 'variables';

.sidebar {
  position: relative;
  display: flex;
  height: 100%;
  margin-left: -270px;
  transition: $transition__sidebarAction;
  &--visible {
    margin-left: 0;
    transition: $transition__sidebarAction;
  }
  &__content {
    position: relative;
    width: 270px;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    background: $background__blue;

    color: $color__white;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      right: 0;
      width: 47px;
      height: 100%;
      background-image: linear-gradient(270deg, rgba(0, 0, 0, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
    }
  }

  &__item {
    padding: 32px 18px 32px 25px;
    font-size: 12px;
    position: relative;
  }
}
</style>
