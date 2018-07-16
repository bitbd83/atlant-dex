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
.alerts
  .alerts__item.alerts__item--header
    .alerts__headerLine
      .alerts__header Alerts:
      Dropdown.alerts__headerDropdown(
        :options="criteria",
        v-model="selected",
        no-border,
        no-padding,
        preselect-first,
      )
  .alerts__item
    SidebarAlertsItem(currency='btc', level="12%", dropped)
  .alerts__item
    SidebarAlertsItem(currency='zec', level="$364.75")
  .alerts__addAllerts(:class="(showSidebar) ? '' : 'alerts__addAllerts--hidden'")
    Icon(id="alert").alerts__addAllertsIcon
    | ADD NEW ALERT
</template>

<script>
import {mapState} from 'vuex';
import Dropdown from './Dropdown';
import SidebarAlertsItem from './SidebarAlertsItem';

export default {
  data() {
    return {
      selected: '',
      selectedCur: 'btc',
      percChng: 2.73,
      criteria: [
        'Price target',
        'Volume target',
      ],
    };
  },
  computed: {
    ...mapState('misc', {
      showSidebar: 'showSidebar',
    }),
  },
  methods: {
    openCur(cur) {
      this.selectedCur = cur;
    },
  },
  components: {
    Dropdown,
    SidebarAlertsItem,
  },
};

</script>

<style lang='scss' scoped>
@import 'variables';

.alerts {
  position: relative;
  &:after {
    display: block;
    content: '';
    height: 1px;
    border-top: 1px solid #00334C;
  }
  &__icon {
    $size: 14px;
    height: $size;
    width: $size;
    fill: #fff;
    &:hover{
      cursor: pointer;
    }
  }
  &__item {
    padding: 32px 18px 32px 25px;
    border-bottom: 1px solid #032537;
    border-top: 1px solid #00334C;
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
  &__headerDropdown {
    width: 100px;
    font-size: 12px;
    text-transform: none;
  }
  &__addAllerts {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 280px;
    height: 52px;
    bottom: 0;
    font-size: 14px;
    font-weight: 700;
    background: repeating-linear-gradient(135deg,#103c55,#103c55 25px,#03324c 0,#03324c 60px);
    z-index: 1;
  }
  &__addAllertsIcon {
    fill: #E9BD24;
    margin-right: 13px;
  }
}
</style>
