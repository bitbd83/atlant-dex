// Copyright 2017, 2018 Tensigma Ltd.

// Licensed under the Microsoft Reference Source License (MS-RSL)

// This license governs use of the accompanying software. If you use the software, you accept this license.
// If you do not accept the license, do not use the software.

// 1. Definitions
// The terms "reproduce," "reproduction," and "distribution" have the same meaning here as under U.S. copyright law.
// "You" means the licensee of the software.
// "Your company" means the company you worked for when you downloaded the software.
// "Reference use" means use of the software within your company as a reference, in read only form, for the sole purposes
// of debugging your products, maintaining your products, or enhancing the interoperability of your products with the
// software, and specifically excludes the right to distribute the software outside of your company.
// "Licensed patents" means any Licensor patent claims which read directly on the software as distributed by the Licensor
// under this license.

// 2. Grant of Rights
// (A) Copyright Grant- Subject to the terms of this license, the Licensor grants you a non-transferable, non-exclusive,
// worldwide, royalty-free copyright license to reproduce the software for reference use.
// (B) Patent Grant- Subject to the terms of this license, the Licensor grants you a non-transferable, non-exclusive,
// worldwide, royalty-free patent license under licensed patents for reference use.

// 3. Limitations
// (A) No Trademark License- This license does not grant you any rights to use the Licensor’s name, logo, or trademarks.
// (B) If you begin patent litigation against the Licensor over patents that you think may apply to the software
// (including a cross-claim or counterclaim in a lawsuit), your license to the software ends automatically.
// (C) The software is licensed "as-is." You bear the risk of using it. The Licensor gives no express warranties,
// guarantees or conditions. You may have additional consumer rights under your local laws which this license cannot
// change. To the extent permitted under your local laws, the Licensor excludes the implied warranties of merchantability,
// fitness for a particular purpose and non-infringement.

<template lang="pug">
PageLayout(title="Security log", title2="Authorization sheet", :sidebar="true")
  .securityLog
    .table
      table.table__body
        thead
          tr
            th IP address
            th Date
            th Type
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
