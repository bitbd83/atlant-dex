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
TablePageLayout(
  title="NOTIFICATION_HISTORY",
  :data="data",
  :pageCount='setPagesCount',
  :page="page",
  :changeActivePage="changeActivePage",
  :checkedArray.sync='checkedArray',
  :getDelete="true",
)
  .notificationHistory.table
    table.table__body
      thead
        tr
          th
          th.table__sortable(:class="{'table__sortable--active': sortBy==='datetime'}" @click="sortNotifications('datetime')") Time & Date
          th.table__sortable(:class="{'table__sortable--active': sortBy==='level'}" @click="sortNotifications('level')") Type
          th Description
      tbody
        tr(v-for="(item, index) in data")
          td
            Checkbox(color="yellow", :value="isChecked(item.id)" @change="setCheckedArray(item.id)")
          td {{formatTime(item.dateTime)}}
          td.notificationHistory__capital(:class="{'notificationHistory__redText' : getNotificationType(item.level) === 'Warning' || getNotificationType(item.level) === 'Error'}") {{getNotificationType(item.level)}}
          td {{$t('notifications.' + getStatus(item), item.arguments)}}
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import {DateTime} from 'luxon';
import {notificationType, getSignalRNotification} from 'services/notification';
import Checkbox from 'components/Checkbox';
import TablePageLayout from 'layouts/TablePageLayout';

export default {
  data() {
    return {
      checkedArray: [],
      page: 1,
      sortBy: 'datetime',
      asc: false,
    };
  },
  computed: {
    ...mapState('user', {
      notificationsCounter: 'notificationsCounter',
    }),
    ...mapGetters('user', {
      data: 'getNotifications',
      totalItems: 'getNotificationItems',
      itemsOnPage: 'getNotificationsOnPage',
    }),
    setPagesCount() {
      return Math.ceil(this.totalItems / this.itemsOnPage);
    },
  },
  methods: {
    ...mapMutations('user', {
      setNotificationsCounter: 'setNotificationsCounter',
    }),
    ...mapActions('user', [
      'getNotificationHistory',
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
    getNotificationType(level) {
      return notificationType(level);
    },
    getStatus(notification) {
      return getSignalRNotification(notification.type);
    },
    getNotifications() {
      this.getNotificationHistory({
        page: this.page,
        sortBy: this.sortBy,
        ascending: this.asc,
      });
    },
    sortNotifications(column) {
      if (this.sortBy === column) {
        this.asc = !this.asc;
      } else {
        this.sortBy = column;
        this.asc = false;
      };
      this.getNotifications();
    },
    changeActivePage(num) {
      this.page = num;
      this.getNotifications();
    },
  },
  watch: {
    notificationsCounter() {
      if (this.notificationsCounter > 0) {
        this.setNotificationsCounter(0);
        this.getNotifications();
      }
    },
  },
  created() {
    this.setNotificationsCounter(0);
    this.getNotifications();
  },
  components: {
    TablePageLayout,
    Checkbox,
  },
};
</script>


<style lang="scss" scoped>
@import 'variables';

.notificationHistory {
  &__redText {
    color: $color_red;
  }
  &__capital {
    text-transform: capitalize;
  }
}
</style>
