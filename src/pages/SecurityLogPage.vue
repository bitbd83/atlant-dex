// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
TableLayout(
  title="Security log",
  :data="data.logs",
  :pageCount="pageCount",
  :changeActivePage="changeActivePage",
  :page="page",
)
  .securityLog
    .table
      table.table__body
        thead
          tr
            th.securityLog__radio
            th.securityLog__cell Date
            th.securityLog__cell Type
            th.securityLog__location IP Address
            th.securityLog__cell Location
    .table.securityLog__table(v-scrollbar="")
      table.table__body
        tbody
          tr(v-for="(item, index) in data.logs")
            td.securityLog__radio
              Radio(size="16", :name="item", :value="item", v-model="checked")
            td.securityLog__cell {{getLogTime(item.dateTime)}}
            td.securityLog__cell {{item.description}}
            td.securityLog__location {{item.ipAddress}}
            td.securityLog__cell {{item.country}}
</template>

<script>
import * as User from 'services/api/user';
import {scrollbar} from '@/directives';
import {DateTime} from 'luxon';
import TableLayout from 'layouts/TableLayout';
import Pagination from 'components/Pagination';
import Radio from 'components/Radio';

export default {
  data() {
    return {
      data: {
        logs: [],
        totalItems: 0,
      },
      limit: 12,
      page: 1,
      checked: {},
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.data.totalItems / this.limit);
    },
  },
  methods: {
    getLogTime(isoTime) {
      return DateTime.fromISO(isoTime).toFormat('dd.LL.yyyy HH:mm');
    },
    changeActivePage(num) {
      this.page = num;
      this.getSecurityLog();
    },
    getSecurityLog() {
      User.getSecurityLog({
        page: this.page,
        limit: this.limit,
      }).then((response) => {
        this.data = response.data;
      });
    },
  },
  created() {
    this.getSecurityLog();
  },
  directives: {
    scrollbar,
  },
  components: {
    TableLayout,
    Pagination,
    Radio,
  },
};
</script>

<style lang="scss" scoped>
.securityLog {
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  width: 100%;
  padding-right: 15px;
  td {
    white-space: normal;
  }
  &__cell {
    width: 20%;
  }
  &__location {
    width: 30%;
  }
  &__radio {
    width: 80px;
    padding-left: 10px;
  }
  &__table {
    position: relative;
  }
}
</style>
