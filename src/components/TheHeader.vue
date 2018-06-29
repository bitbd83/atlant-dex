<template lang="pug">
header.header
  .header__pair
    TheHeaderPair
  .header__stats
    TheHeaderPairInfo
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

export default {
  data() {
    return {
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
  components: {
    BButton,
    TheHeaderPair,
    TheHeaderPairInfo,
    TheHeaderLogout,
    TheHeaderWidgets,
  },
};
</script>

<style lang="scss">
@import 'variables';

.header {
  padding: 12px 28px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__pair {
    margin-right: 45px;
    min-width: 400px;
    height: 35px;
  }
  &__stats {
    display: flex;
    align-items: center;
    height: 35px;
    width: 100%;
  }
  &__right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: 45px;
  }
  &__widgets {
    margin-right: 57px;
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
