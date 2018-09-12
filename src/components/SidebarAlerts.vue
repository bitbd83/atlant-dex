// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
.alerts
  .alerts__item.alerts__item--header
    .sidebarChild__headerLine
      .sidebarChild__title ALERT LIST:
    .alerts__headerDropdownContainer
      span Sort by:
      Dropdown.alerts__headerDropdown(
        :options="criteria",
        v-model="selected",
        no-border,
        no-padding,
        preselect-first,
        underline,
        whiteTriangle,
      )
  .alerts__content(ref="wrap" v-scrollbar="")
    Accordion(title="Tokens & Coins:" isSidebar :isHidden="loadingContent")
      SidebarAlertsItem(:data="alert" v-for="alert in alertsList", :key="alert.id")
      MugenScroll(:handler="getAlerts", scroll-container="wrap")
      .alerts__loaderContainer
        Loader(:isLoading="loadingContent" isWhite="")
  .alerts__add(@click="open({name:'addAlert'})")
    Icon.alerts__addIcon(id="icon__add")
    .alerts__addText ADD
</template>

<script>
import MugenScroll from 'vue-mugen-scroll';
import {mapMutations} from 'vuex';
import {scrollbar} from '@/directives';
import Dropdown from 'components/Dropdown';
import Accordion from 'components/Accordion';
import SidebarAlertsItem from 'components/SidebarAlertsItem';
import Loader from 'components/Loader';
import * as Alerts from 'services/api/alerts';

export default {
  data() {
    return {
      alertsList: [],
      alertsCount: 1,
      selected: '',
      selectedCur: 'btc',
      percChng: 2.73,
      criteria: [
        'Price target',
        'Volume change',
      ],
      limit: 10,
      loadingContent: false,
      isLoadingError: false,
    };
  },
  computed: {
    getPageNumber() {
      return (this.alertsList.length / this.limit + 1).toFixed(0);
    },
  },
  methods: {
    openCur(cur) {
      this.selectedCur = cur;
    },
    ...mapMutations('modal', [
      'open',
    ]),
    getAlerts() {
      if (this.loadingContent == true && this.isLoadingError == false) return false;
      if (this.alertsCount <= this.alertsList.length) return false;
      this.isLoadingError = false;
      this.loadingContent = true;
      Alerts.getAlerts({
        page: this.getPageNumber,
        limit: this.limit,
        triggeredFirst: true,
        statuses: '0,1',
      }).then((alerts) => {
        this.alertsList.push(...alerts.data.data);
        this.alertsCount = alerts.data.totalItems;
        this.loadingContent = false;
      }).catch(() => {
        this.loadingContent = false;
        this.isLoadingError = true;
      });
    },
    dropSidebarAlerts() {
      this.alertsList = [];
      this.alertsCount = 1;
    },
    insertSidebarAlert(alert) {
      for (let i in this.alertsList) {
        if (!this.alertsList[i].activationDate) {
          this.alertsList.splice(i, 0, alert);
          this.alertsList.splice(-1, 1);
          break;
        }
      }
    },
    updateSidebarAlert(alert) {
      let alertIndex = this.alertsList.findIndex((item) => item.id === alert.id);
      this.alertsList.splice(alertIndex, 1);
      this.alertsList.unshift(alert);
    },
    deleteAlert(id) {
      let alertIndex = this.alertsList.findIndex((item) => item.id === id);
      this.alertsList.splice(alertIndex, 1);
    },
    resetSidebarAlerts() {
      this.dropSidebarAlerts();
      this.getAlerts();
    },
  },
  created() {
    this.resetSidebarAlerts();
    EventHub.$on('appendSidebarAlerts', (data) => {
      this.insertSidebarAlert(data);
    });
    EventHub.$on('updateSidebarAlerts', (alert) => {
      this.updateSidebarAlert(alert);
    });
    EventHub.$on('deleteAlert', (id) => {
      this.deleteAlert(id);
      this.resetSidebarAlerts();
    });
  },
  destroyed() {
    EventHub.$off('appendSidebarAlerts');
    EventHub.$off('updateSidebarAlerts');
    EventHub.$off('deleteAlert');
  },
  directives: {
    scrollbar,
  },
  components: {
    MugenScroll,
    Dropdown,
    Accordion,
    SidebarAlertsItem,
    Loader,
  },
};

</script>

<style lang='scss' scoped>
@import 'variables';

.alerts {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 2;

  &__icon {
    $size: 14px;
    height: $size;
    width: $size;
    fill: #fff;
    cursor: pointer;
  }

  &__item {
    margin: 20px 18px 48px 25px;
    font-size: 12px;

    &--header {
      font-weight: 700;
    }
  }

  &__headerLine {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-transform: uppercase;
  }

  &__headerDropdownContainer {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 500;
    padding-top: 5px;
  }

  &__headerDropdown {
    width: 110px;
    text-transform: none;
  }

  &__content {
    flex-grow: 2;
    position: relative;
  }

  &__add {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin: 32px 0 25px 24px;
  }

  &__addIcon {
    $size: 28px;
    width: $size;
    height: $size;
    fill: $fill__white;
    margin-right: 12px;
  }

  &__loaderContainer {
    position: relative;
    height: 20px;
  }

  &__addText {
    font-size: 16px;
    font-weight: 700;
  }
}
</style>
