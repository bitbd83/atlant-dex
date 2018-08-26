// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
TableLayout(
  title="Alert list",
  :data="alertsList",
  :pageCount='setPagesCount',
  :page="alertsPage",
  :changeActivePage="changeActivePage",
  :isLoading="loadingContent",
  :isLoadingError="isLoadingError",
)
  .myAlerts.table
    table.table__body
      thead
        tr.myAlerts__row
          th.table__sortable(:class="{'table__sortable--desc': sortBy==='added' && !asc}" @click="sortAlerts('added')") Added
          th Description
          th.table__sortable(:class="{'table__sortable--desc': sortBy==='type' && !asc}" @click="sortAlerts('type')") Type
          th.table__sortable(:class="{'table__sortable--desc': sortBy==='lifetime' && !asc}" @click="sortAlerts('lifetime')") Lifetime remaining
    CSSLoader(v-if="loadingContent")
    .myAlerts__table(v-else v-scrollbar="")
      table.table
        tbody
          tr.myAlerts__row(v-for="(item, index) in alertsList")
            td {{formatTime(item.creationDate)}}
            td {{priceType[item.arguments[5]]}} price of {{item.arguments[0]}} to {{targetType[item.arguments[1]]}} {{item.arguments[4] ? 'the value of ' : ' '}} {{item.arguments[2]}} {{item.arguments[4] ? item.arguments[3] : '%'}}
            td {{item.arguments[4] ? 'Target ' : 'Change '}}
            td
              .myAlerts__daysLeft {{(item.daysLeft) ? item.daysLeft + ' days' : '&#8734'}}
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex';
import {DateTime} from 'luxon';
import {scrollbar} from '@/directives';
// import {notification} from 'services/notification';
import TableLayout from 'layouts/TableLayout';
import CSSLoader from 'components/CSSLoader';

export default {
  data() {
    return {
      checkedArray: [],
      sortBy: 'added',
      asc: false,
      targetType: ['exceed', 'reach', 'fall'],
      priceType: ['Bid', 'Ask'],
      loadingContent: false,
      isLoadingError: false,
    };
  },
  computed: {
    ...mapState('alerts', [
      'alertsList',
      'alertsListCount',
      'alertsPage',
      'alertsLimit',
    ]),
    setPagesCount() {
      return Math.ceil(this.alertsListCount / this.alertsLimit);
    },
  },
  methods: {
    ...mapMutations('alerts', [
      'setAlertsPage',
    ]),
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
        page: this.alertsPage,
        sortBy: this.sortBy,
        ascending: this.asc,
      }).then(() => {
        this.loadingContent = false;
      }).catch(() => {
        this.loadingContent = false;
        this.isLoadingError = true;
      });
    },
    // getDeleteAlerts() {
    //   this.deleteAlert({
    //     alertsDeleteModel: this.checkedArray,
    //   }).then(() => {
    //     this.getAlerts();
    //     notification({
    //       title: 'Alerts event:',
    //       text: `${this.checkedArray.length} alerts deleted`,
    //       type: 'info',
    //     });
    //     this.checkedArray = [];
    //   });
    // },
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
      this.setAlertsPage(num);
      this.getAlerts();
    },
  },
  created() {
    this.getAlerts();
  },
  directives: {
    scrollbar,
  },
  components: {
    TableLayout,
    CSSLoader,
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
        padding-left: 10px;
      }
      &:nth-child(2) {
        width: 40%;
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
