// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
TableLayout(
  title= "ALLERTS LIST",
  :data="data",
  :pageCount='setPagesCount',
  :page="page",
  :changeActivePage="changeActivePage",
  :checkedArray.sync='checkedArray',
  :isLoading="loadingContent",
  :isLoadingError="isLoadingError",
  :getApiRequest="getAlerts"
  :getDelete="getDeleteAlerts"
)
  .myAlerts.table
    table.myAlerts__body.table__body
      thead
        tr.myAlerts__row
          th
          th.table__sortable(:class="{'table__sortable--active': sortBy==='added'}" @click="sortAlerts('added')") Added
          th Description
          th.table__sortable(:class="{'table__sortable--active': sortBy==='type'}" @click="sortAlerts('type')") Type
          th.table__sortable(:class="{'table__sortable--active': sortBy==='lifetime'}" @click="sortAlerts('lifetime')") Lifetime
      tbody
        tr.myAlerts__row(v-for="(item, index) in data")
          td
            Checkbox(color="yellow", :value="isChecked(item.id)" @change="setCheckedArray(item.id)")
          td {{formatTime(item.creationDate)}}
          td {{item.arguments[4] ? 'Target ' : 'Current '}} price for {{item.arguments[0]}} has {{priceType[item.arguments[1]]}} {{item.arguments[4] ? 'the value of ' : 'below '}} {{item.arguments[2]}} {{item.arguments[4] ? item.arguments[3] : '%'}}
          td {{item.arguments[4] ? 'Target ' : 'Change '}}
          td
            .myAlerts__lifetimeInDays {{item.lifetimeInDays}} days
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import {getAlerts, deleteAlert} from 'services/api/alerts';
import {DateTime} from 'luxon';
import {notification} from 'services/notification';
import TableLayout from 'layouts/TableLayout';
import Checkbox from 'components/Checkbox';
import Dropdown from 'components/Dropdown';

export default {
  data() {
    return {
      checkedArray: [],
      page: 1,
      limit: 10,
      totalItems: 1,
      sortBy: 'added',
      asc: false,
      data: [],
      priceType: ['growth', 'reached', 'fall'],
      loadingContent: false,
      isLoadingError: false,
    };
  },
  computed: {
    ...mapState('user', [
      'alertsListChanged',
    ]),
    setPagesCount() {
      return Math.ceil(this.totalItems / this.limit);
    },
  },
  methods: {
    ...mapMutations('user', [
      'setAlertsListChange',
    ]),
    isChecked(id) {
      return Boolean(this.checkedArray.indexOf(id) != -1);
    },
    setCheckedArray(id) {
      this.isChecked(id) ? this.checkedArray = this.checkedArray.filter((item) => item != id) : this.checkedArray.push(id);
    },
    formatTime(isoTime) {
      return DateTime.fromISO(isoTime).toFormat('dd.LL.yyyy HH:mm');
    },
    getAlerts() {
      if (this.loadingContent == true && this.isLoadingError == false) return false;
      this.isLoadingError = false;
      this.loadingContent = true;
      return getAlerts({
        page: this.page,
        limit: this.limit,
        isSortAscending: 1,
        sortBy: this.sortBy,
      }).then((response) => {
        this.data = response.data.data;
        this.totalItems = response.data.totalItems;
        this.loadingContent = false;
      }).catch(() => {
        this.isLoadingError = true;
      });
    },
    getDeleteAlerts() {
      for (let i = 0; i < this.checkedArray.length; i++) {
        deleteAlert(this.checkedArray[i]).then(() => {
          notification({
            title: 'Alerts event:',
            text: `Alert №${this.checkedArray[i]} deleted`,
            type: 'info',
          });
        });
        this.setAlertsListChange();
      };
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
  watch: {
    alertsListChanged() {
      this.data = [];
      this.totalItems = 1;
      this.getAlerts();
    },
  },
  created() {
    this.getAlerts();
  },
  components: {
    TableLayout,
    Checkbox,
    Dropdown,
  },
};
</script>


<style lang="scss" scoped>
@import "variables";
.myAlerts {
  overflow: visible;
  &__row {
    & > td {
      width: 15%;
      &:nth-child(1) {
        width: 60px;
      }
      &:nth-child(3) {
        width: 300px;
      }
    }
  }
  &__dropdown {
    max-width: 110px;
  }
  &__lifetimeInDays {
    width: 82px;
    padding: 8px 13px;
    border-radius: 2px;
    border: 1px solid #ffffff;
  }
}
</style>
