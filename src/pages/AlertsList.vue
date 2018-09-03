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
          th.table__sortable(:class="{'table__sortable--desc': sortBy==='type' && !asc}" @click="sortAlerts('type')") Type
          th.table__sortable(:class="{'table__sortable--desc': sortBy==='lifetime' && !asc}" @click="sortAlerts('lifetime')") Lifetime remaining
          th Status
    CSSLoader(v-if="loadingContent")
    .myAlerts__table(v-else v-scrollbar="")
      table.table
        tbody
          tr.myAlerts__row(v-for="(item, index) in alertsList")
            td
              Radio.myAlerts__radio(isTable="", :name="item", :value="item", v-model="checked")
            td {{formatTime(item.creationDate)}}
            td {{priceType[item.arguments[5]]}} price of {{item.arguments[0]}} to {{targetType[item.arguments[1]]}} {{item.arguments[4] ? 'the value of ' : ' '}} {{item.arguments[2]}} {{item.arguments[4] ? item.arguments[3] : '%'}}
            td {{item.arguments[4] ? 'Target ' : 'Change '}}
            td
              .myAlerts__daysLeft {{(item.daysLeft) ? item.daysLeft + ' days' : '&#8734'}}
            td {{status[item.status]}}
</template>

<script>
import {mapState, mapActions} from 'vuex';
import {DateTime} from 'luxon';
import {scrollbar} from '@/directives';
import TableLayout from 'layouts/TableLayout';
import Radio from 'components/Radio';
import CSSLoader from 'components/CSSLoader';

export default {
  data() {
    return {
      checked: undefined,
      sortBy: 'added',
      asc: false,
      targetType: ['exceed', 'reach', 'fall'],
      priceType: ['Bid', 'Ask'],
      status: ['Active', 'Triggered', 'Expired'],
      loadingContent: false,
      isLoadingError: false,
      page: 1,
    };
  },
  computed: {
    ...mapState('alerts', [
      'alertsList',
      'alertsListCount',
      'alertsLimit',
    ]),
    setPagesCount() {
      return Math.ceil(this.alertsListCount / this.alertsLimit);
    },
  },
  methods: {
    ...mapActions('alerts', [
      'getAlertsList',
      'deleteAlert',
    ]),
    formatTime(isoTime) {
      return DateTime.fromISO(isoTime).toFormat('dd.LL.yyyy HH:mm');
    },
    getAlerts() {
      if (this.loadingContent == true && this.isLoadingError == false) return false;
      this.isLoadingError = false;
      this.loadingContent = true;
      this.getAlertsList({
        page: this.page,
        sortBy: this.sortBy,
        ascending: this.asc,
      }).then(() => {
        this.loadingContent = false;
      }).catch(() => {
        this.loadingContent = false;
        this.isLoadingError = true;
      });
    },
    getDeleteAlerts() {
      this.loadingContent = true;
      this.deleteAlert({
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
    EventHub.$on('appendAlertsList', () => this.getAlerts());
  },
  destroyed() {
    EventHub.$off('appendAlertsList');
  },
  directives: {
    scrollbar,
  },
  components: {
    TableLayout,
    CSSLoader,
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
      width: 10%;
      &:nth-child(1) {
        width: 50px;
        padding-left: 10px;
      }
      &:nth-child(3) {
        width: 50%;
      }
      &:nth-child(5) {
        width: 180px;
      }
    }
  }
  &__daysLeft {
    width: 82px;
    padding: 8px 13px;
    border-radius: 2px;
    border: 1px solid $color__blue;
    text-align: center;
  }
}
</style>
