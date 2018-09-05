// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
TableLayout(
  title="Alert list",
  :data="alertsList",
  :pageCount='setPagesCount',
  :page="page",
  :changeActivePage="changeActivePage",
  :checked='checked',
  :isLoading="loadingContent",
  :isLoadingError="isLoadingError",
  :getDelete="getDeleteAlerts",
)
  .myAlerts.table
    table.table__body
      thead
        tr.myAlerts__row
          th
          th.table__sortable(:class="{'table__sortable--desc': sortBy==='added' && !asc}" @click="sortAlerts('added')") Added
          th Description
          //- th.table__sortable(:class="{'table__sortable--desc': sortBy==='type' && !asc}" @click="sortAlerts('type')") Type
          th.table__sortable(:class="{'table__sortable--desc': sortBy==='lifetime' && !asc}" @click="sortAlerts('lifetime')") Lifetime remaining
          th.table__sortable(:class="{'table__sortable--desc': sortBy==='activationDate' && !asc}" @click="sortAlerts('activationDate')") Activation date
    Loader(v-if="loadingContent")
    .myAlerts__table(v-else v-scrollbar="")
      table.table
        tbody
          tr.myAlerts__row(v-for="(item, index) in alertsList")
            td
              Radio.myAlerts__radio(isTable="", :name="item", :value="item", v-model="checked")
            td {{formatTime(item.creationDate)}}
            td {{priceType[item.arguments[5]]}} price of {{item.arguments[0]}} to {{targetType[item.arguments[1]]}} {{item.arguments[4] ? 'the value of ' : ' '}} {{item.arguments[2]}} {{item.arguments[4] ? item.arguments[3] : '%'}}
            //- td {{item.arguments[4] ? 'Target ' : 'Change '}}
            td
              .myAlerts__daysLeft(:class="'myAlerts__daysLeft--' + status[item.status]") {{item.daysLeft === null ? '&#8734;' : alertLifetime(item.daysLeft)}}
            td {{formatTime(item.activationDate)}}
</template>

<script>
import {DateTime} from 'luxon';
import {scrollbar} from '@/directives';
import TableLayout from 'layouts/TableLayout';
import Radio from 'components/Radio';
import Loader from 'components/Loader';
import * as Alerts from 'services/api/alerts';

export default {
  data() {
    return {
      alertsList: [],
      alertsCount: 0,
      checked: undefined,
      sortBy: 'added',
      asc: false,
      targetType: ['exceed', 'reach', 'fall'],
      priceType: ['Bid', 'Ask'],
      status: ['active', 'triggered', 'expired'],
      loadingContent: false,
      isLoadingError: false,
      page: 1,
      limit: 10,
    };
  },
  computed: {
    setPagesCount() {
      return Math.ceil(this.alertsCount / this.limit);
    },
  },
  methods: {
    formatTime(isoTime) {
      return isoTime ? DateTime.fromISO(isoTime).toFormat('dd.LL.yyyy HH:mm') : '';
    },
    alertLifetime(daysLeft) {
      switch (daysLeft) {
        case -1: return this.status[1];
        case 0: return this.status[2];
        default: return `${daysLeft} days`;
      }
    },
    getAlerts() {
      if (this.loadingContent == true && this.isLoadingError == false) return false;
      this.isLoadingError = false;
      this.loadingContent = true;
      Alerts.getAlerts({
        page: this.page,
        sortBy: this.sortBy,
        isSortAscending: this.asc,
        limit: this.limit,
        // statuses: '0,1,2',
      }).then((alerts) => {
        this.alertsList = alerts.data.data;
        this.alertsCount = alerts.data.totalItems;
        this.loadingContent = false;
      }).catch(() => {
        this.loadingContent = false;
        this.isLoadingError = true;
      });
    },
    updateAlert(alert) {
      let alertIndex = this.alertsList.findIndex((item) => item.id === alert.id);
      this.alertsList.splice(alertIndex, 1, alert);
    },
    getDeleteAlerts() {
      this.loadingContent = true;
      Alerts.deleteAlert({
        alertId: this.checked.id,
      }).then(() => {
        this.loadingContent = false;
        if (this.alertsList.length === 1) this.page -= 1;
        this.getAlerts();
        this.checked = undefined;
      });
    },
    sortAlerts(column) {
      if (this.sortBy === column) {
        this.asc = !this.asc;
      } else {
        this.sortBy = column;
        this.asc = false;
      };
      this.getAlerts();
    },
    changeActivePage(num) {
      this.page = num;
      this.getAlerts();
    },
  },
  created() {
    this.getAlerts();
    EventHub.$on('appendAlertsList', () => {
      this.getAlerts();
    });
    EventHub.$on('updateAlertsList', (alert) => {
      this.updateAlert(alert);
    });
  },
  destroyed() {
    EventHub.$off('appendAlertsList');
    EventHub.$off('updateAlertsList');
  },
  directives: {
    scrollbar,
  },
  components: {
    TableLayout,
    Loader,
    Radio,
  },
};
</script>


<style lang="scss" scoped>
@import "~variables";
.myAlerts {
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  &__table {
    position: relative;
  }
  &__row {
    & > td, th {
      width: 20%;
      &:nth-child(1) {
        width: 50px;
        padding-left: 10px;
      }
      &:nth-child(3) {
        width: 30%;
      }
      &:nth-child(5) {
        width: 180px;
      }
    }
  }
  &__daysLeft {
    width: 82px;
    padding: 8px 10px;
    margin-left: 40px;
    border-radius: 2px;
    border: 1px solid $color__blue;
    text-align: center;
    text-transform: capitalize;
    &--triggered {
      border-color: $color__green;
      background-color: $color__green;
      color: $color__white;
    }
    &--expired {
      border-color: $color__grey;
      color: $color__grey;
    }
  }
}
</style>
