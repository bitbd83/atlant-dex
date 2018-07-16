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
.pageSidebar
  ul.pageSidebar__list
    li.pageSidebar__item(
      v-for="{name, label} in items",
      :class="{'pageSidebar__item--selected': isPageOpened(name)}",
      @click="openPage({name})"
    )
      Icon.pageSidebar__icon(id="triangle2" v-if="isPageOpened(name)")
      span.pageSidebar__label {{label}}
  ul.pageSidebar__mobileList(
    :class="{'pageSidebar__mobileList--selected': showNav}",
    @click="toggleNav"
  )
    .pageSidebar__navHeader Profile #[Icon.pageSidebar__navIcon(:class="{'pageSidebar__navIcon--show' : showNav}" id="arrow_angle")]
    //- li.pageSidebar__mobileItem(
    //-   :class="{'pageSidebar__mobileItem--selected': selectedCat == cat}",
    //-   v-for="cat in categories"
    //-   @click="unhideCategory(cat)"
    //- ) {{cat}}
    .pageSidebar__mobileSubItem(
      v-show="showNav"
      :class="{'pageSidebar__mobileSubItem--selected': isPageOpened(name)}",
      v-for="{name, label} in items",
      @click="openMobilePage({name})"
    ) {{label}}
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex';
import {profileSections} from '@/config';

export default {
  data() {
    return {
      items: [],
      // categories: [
        // 'user info',
        // 'transaction history',
        // 'my orders',
        // 'security',
      // ],
      showNav: true,
    };
  },
  computed: {
    ...mapState('page', {
      pageName: 'name',
    }),
    ...mapGetters('page', {
      isPageOpened: 'isOpened',
    }),
    selectedCat() {
      return this.items.find((item) => item.name == this.pageName).category;
    },
  },
  methods: {
    ...mapMutations('page', {
      openPage: 'open',
    }),
    scrollToMethods() {
      this.$nextTick(() => {
        const headerHeight = document.querySelector('.header').getBoundingClientRect().height;
        const scrollY = document.querySelector('.page__content').getBoundingClientRect().top;
        window.scrollTo(0, scrollY - headerHeight);
      });
    },
    toggleNav() {
      this.showNav = !this.showNav;
    },
    openMobilePage(param) {
      this.openPage(param);
      this.scrollToMethods();
    },
  },
  created() {
    this.items = profileSections;
    this.openCat = this.selectedCat;
  },
};
</script>


<style lang="scss">
@import 'variables';

.pageSidebar {
  padding: 36px;
  height: 100%;
  border-right: 1px solid $color_tangaroa;
  &__list {
    list-style: none;
  }
  &__item {
    position: relative;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    &:not(:last-of-type) {
      margin-bottom: 24px;
    }
    &--selected, &:hover {
      color: $color_yellow;
    }
  }
  &__icon {
    $size: 16px;
    width: $size;
    height: $size;
    fill: $color_yellow;
    position: absolute;
    transform: rotate(270deg);
    left: -22px;
  }
  &__mobileList {
    display: none;
  }
}
</style>
