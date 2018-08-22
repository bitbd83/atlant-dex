// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
PageLayout(title="Security log", :sidebar="true")
  .securityLog
    .table
      table.table__body
        thead
          tr
            th {{$t('pages.i_p_address')}}
            th {{$t('pages.date')}}
            th {{$t('pages.type')}}
        tbody
          tr(v-for="(item, index) in data.logs")
            td {{item.ipAddress}} ({{item.country}})
            td {{getLogTime(item.dateTime)}}
            td {{item.description}}
    Pagination(v-show="pageCount > 1", :page="page", :pageCount="pageCount", :pageAction="changeActivePage")
</template>

<script>
import * as User from 'services/api/user';
import {DateTime} from 'luxon';
import PageLayout from 'layouts/PageLayout';
import Pagination from 'components/Pagination';

export default {
  data() {
    return {
      data: {
        logs: [],
        totalItems: 0,
      },
      limit: 12,
      page: 1,
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
  components: {
    PageLayout,
    Pagination,
  },
};
</script>

<style lang="scss" scoped>
.securityLog {
  td {
    white-space: normal;
  }
}
</style>
