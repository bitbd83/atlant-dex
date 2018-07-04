<template lang='pug'>
header.header
  .header__pair
    TheHeaderPair
  .header__stats
    TheHeaderPairInfo(:pairInfoItems='infoItems')
  .header__right
    .header__widgets
      TheHeaderWidgets
    .header__userbar
      TheHeaderLogout
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import {profileSections} from '@/config';
import BButton from './BButton';
import TheHeaderPair from './TheHeaderPair';
import TheHeaderPairInfo from './TheHeaderPairInfo';
import TheHeaderLogout from './TheHeaderLogout';
import TheHeaderWidgets from './TheHeaderWidgets';
import elementResizeDetectorMaker from 'element-resize-detector';

export default {
  data() {
    return {
      infoItems: 4,
    };
  },
  computed: {
    ...mapState('page', {
      pageName: 'name',
    }),
    ...mapGetters('page', {
      isProfileOpened: 'isProfileOpened',
    }),
    openProfilePage() {
      return profileSections.find((item) => item.name == this.pageName).label;
    },
  },
  methods: {
    ...mapActions('user', {
      getEthBalance: 'getEthBalance',
    }),
  },
  mounted() {
    let erd = elementResizeDetectorMaker({
      strategy: 'scroll',
    });
    erd.listenTo(document.getElementsByClassName('header__stats'), (el) => {
      let width = el.offsetWidth;
      switch (true) {
        case (width < 200):
          this.infoItems = 0; break;
        case (width < 750):
          this.infoItems = 1; break;
        case (width < 1000):
          this.infoItems = 3; break;
        default:
          this.infoItems = 4; break;
       }
    });
  },
  components: {
    BButton,
    TheHeaderPair,
    TheHeaderPairInfo,
    TheHeaderLogout,
    TheHeaderWidgets,
  },
};
</script>

<style lang='scss'>
@import 'variables';

.header {
  position: relative;
  padding: 12px 25px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000000;
  &__pair {
    min-width: 400px;
    height: 35px;
  }
  &__stats {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    width: 100%;
    position: relative;
    // overflow: hidden;
    margin: 0 45px;
  }
  &__right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: 40px;
  }
  &__widgets {
    margin-right: 60px;
    min-width: 180px;
  }
  &__userbar {
    width: 23px;
    display: flex;
  }
  &__profileTitle {
    width: 100%;
    line-height: 25px;
    text-align: center;
    font-size: 16px;
    font-weight: 900;
    text-transform: uppercase;
  }
}
</style>
