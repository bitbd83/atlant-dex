<template lang='pug'>
.toolbar
  .toolbar__group
    Icon.toolbar__logo(id="logo"
                      @click="getOpenPage('')",
    )
    UserVisibility(
      v-for="sect in sidebarSections",
      :key="sect.name",
      :hide-on-logout="!sect.isShowOnLogout"
    )
      .toolbar__iconWrap(:class="{'toolbar__iconWrap--active' : sect.name == section}",
                        @click="setSection(sect.name)"
      )
        Icon.toolbar__icon(
          :id="sect.name",
          :class="isActive(sect.name)",
        )
        .toolbar__title(:class="{'toolbar__title--active' : (sect.name == section)}") {{sect.title}}
    UserVisibility(
      hide-on-logout,
      :onLoginClick="() => getOpenPage('map')"
    )
      .toolbar__iconWrap(:class="{'toolbar__iconWrap--active' : (currentPage === 'map')}")
          Icon.toolbar__icon(id="map" :class="{'toolbar__icon--active' : (currentPage === 'map')}")
          .toolbar__title(:class="{'toolbar__title--active' : (currentPage == 'map')}") Map
  .toolbar__group
    UserVisibility(
      hide-on-logout,
      :onLoginClick="() => getOpenPage('accountInformation')"
    )
      .toolbar__bottomWrap
        Icon.toolbar__icon(
          :id="(currentPage === 'accountInformation') ? 'user-active' : 'user'",
        )
        .toolbar__notifications(v-show="notificationsCounter > 0") {{(notificationsCounter > 10) ? '9+' : notificationsCounter}}
    UserVisibility(
      hide-on-logout,
      :onLoginClick="() => getOpenPage('transactionHistory')"
    )
      .toolbar__bottomWrap
        Icon.toolbar__icon(
          :id="(currentPage === 'transactionHistory') ? 'history-active' : 'history'",
        )
    .toolbar__bottomWrap
      a(
        href="https://medium.com/@atlantio"
        target="_blank"
      )
        Icon.toolbar__icon(
          id='info',
        )
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import {sidebarSections} from '@/config';
import UserVisibility from './UserVisibility';

export default {
  data() {
    return {
      sidebarSections,
    };
  },
  computed: {
    ...mapState('misc', [
      'showSidebar',
    ]),
    ...mapState('user', [
      'notificationsCounter',
    ]),
    ...mapGetters('misc', [
      'section',
    ]),
    ...mapGetters('membership', [
      'isLoggedIn',
    ]),
    ...mapGetters('page', [
      'currentPage',
      'isProfilePageOpened',
      'isSettingPageOpened',
      'isPageHistoryOpened',
    ]),
  },
  methods: {
    ...mapMutations('misc', [
      'toggleSidebar',
      'setSection',
    ]),
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    ...mapActions('page', [
      'getOpenPage',
    ]),
    isActive(section) {
      return (section === this.section) ? 'toolbar__icon--active' : '';
    },
    checkBeforeOpenPage(pageName) {
      if (!this.isLoggedIn) {
        this.openModal({name: 'signIn'});
        return false;
      }
      this.getOpenPage(pageName);
    },
  },
  components: {
    UserVisibility,
  },
};

</script>

<style lang='scss'>
@import 'variables';

.toolbar {
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 15px 0;
  padding-top: 30px;
  background-color: $background__blue;
  z-index: 1;
  flex-shrink: 0;

  &__logo {
    width: 38px;
    height: 39px;
    fill: $fill__white;
    cursor: pointer;
    margin: auto;
    margin-bottom: 75px;
  }
  &__iconWrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    background: transparent;
    box-shadow: 0 5px 4px transparent;
    border-radius: 5px;
    width: 56px;
    height: 58px;
    transition: all .5s;
    border: 1px solid transparent;
    margin: 45px auto;
    cursor: pointer;
    &--active {
      transition: background .5s, box-shadow .5s;
      background: #ffffff;
      box-shadow: 0 5px 4px rgba(13, 16, 89, 0.28);
      width: 73px;
      height: 75px;
    }
    &:hover {
      border: 1px solid white;
      transition: all .5s;
      width: 73px;
      height: 75px;
    }
  }
  &__icon {
    height: 26px;
    width: 24px;
    fill: #fff;
    margin-bottom: 9px;
    &--active {
      fill: $fill__blue;
    }
    &:not(:last-of-type) {
      margin-bottom: 32px;
    }
  }
  &__title {
    color: #004dff;
    font-family: Supply;
    font-size: 16px;
    line-height: 15px;
    font-weight: 400;
    letter-spacing: -0.3px;
    height: 0px;
    overflow: hidden;
    transition: height .5s;
    &--active {
      height: 15px;
      overflow: visible;
      transition: height .5s;
    }
  }
  &__notifications {
    position: absolute;
    top: -2px;
    right: -5px;
    background-color: #f33a3a;
    border-radius: 10px;
    padding: 1px 4px;
    color: #ffffff;
    font-family: Roboto;
    font-size: 11px;
    font-weight: 900;
  }
}
</style>
