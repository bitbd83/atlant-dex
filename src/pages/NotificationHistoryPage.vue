// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
TableLayout(
  title="NOTIFICATION_HISTORY",
  :data="data",
  :pageCount='setPagesCount',
  :page="page",
  :changeActivePage="changeActivePage",
  :checkedArray.sync='checkedArray',
  :isLoading="loadingContent",
  :isLoadingError="isLoadingError",
  :getApiRequest="getNotifications"
  :getExport="getExport",
)
  .notificationHistory.table
    table.table__body
      thead
        tr
          th
          th.table__sortable(:class="{'table__sortable--active': sortBy==='datetime'}" @click="sortNotifications('datetime')") {{$t('pages.time_date')}}
          th.table__sortable(:class="{'table__sortable--active': sortBy==='level'}" @click="sortNotifications('level')") {{$t('pages.type')}}
          th {{$t('pages.description')}}
      tbody
        tr(v-for="(item, index) in data")
          td
            Checkbox(:value="isChecked(item.id)" @change="setCheckedArray(item.id)" color="blue")
          td {{formatTime(item.dateTime)}}
          td.notificationHistory__capital(:class="{'notificationHistory__redText' : getNotificationType(item.level) === 'Warning' || getNotificationType(item.level) === 'Error'}") {{getNotificationType(item.level)}}
          td {{$t('notifications.' + getStatus(item), item.arguments)}}
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import {getNotificationsHistoryCSV} from 'services/api/user.js';
import {DateTime} from 'luxon';
import {signalRNotification} from '@/store/staticData/signalRNotification';
import {notificationType} from '@/store/staticData/notificationType';
import Checkbox from 'components/Checkbox';
import TableLayout from 'layouts/TableLayout';

export default {
  data() {
    return {
      checkedArray: [],
      page: 1,
      sortBy: 'datetime',
      asc: false,
      loadingContent: false,
      isLoadingError: false,
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
    ...mapGetters('membership', {
      isLoggedIn: 'isLoggedIn',
    }),
    setPagesCount() {
      return Math.ceil(this.totalItems / this.itemsOnPage);
    },
  },
  methods: {
    ...mapActions('user', ['getNotificationHistory']),

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
      return notificationType[level];
    },

    getStatus(notification) {
      return signalRNotification[notification.type];
    },

    getNotifications() {
      if (this.isLoggedIn === false) return false;

      this.isLoadingError = false;
      this.loadingContent = true;
      this.getNotificationHistory({
        page: this.page,
        sortBy: this.sortBy,
        ascending: this.asc,
      }).then((response) => {
        this.loadingContent = false;
        return response;
      }).catch((error) => {
        this.isLoadingError = true;
        return error;
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

    getExport() {
      getNotificationsHistoryCSV({
        sortBy: this.sortBy,
        ascending: this.asc,
        Ids: this.checkedArray.toString(),
      }).then((res) => {
        let blob = new Blob([res.data], {type: 'application/csv'});
        let url = window.URL.createObjectURL(blob);
        let link = document.createElement('a');
        let date = new Date().toLocaleDateString();
        link.href = url;
        link.download = `atlant-notifications-${date}.csv`;
        link.click();
        setTimeout(() => {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(url);
        }, 100);
      }).catch((res) => {
        serverNotification(res);
      });
    },
  },
  created() {
    this.getNotifications();
  },
  components: {
    TableLayout,
    Checkbox,
  },
};
</script>


<style lang="scss" scoped>
@import "variables";
.notificationHistory {
    &__redText {
      color: $color_red;
    }
    &__capital {
      text-transform: capitalize;
    }
}
</style>
