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

<template lang='pug'>
header.header
  .header__pair
    TheHeaderPair
  .header__stats
    TheHeaderPairInfo(:pairInfoItems='infoItems')
  .header__right
    .header__widgets
      TheHeaderWidgets
    .header__userbar
      TheHeaderLogout
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import {profileSections} from '@/config';
import BButton from './BButton';
import TheHeaderPair from './TheHeaderPair';
import TheHeaderPairInfo from './TheHeaderPairInfo';
import TheHeaderLogout from './TheHeaderLogout';
import TheHeaderWidgets from './TheHeaderWidgets';
import elementResizeDetectorMaker from 'element-resize-detector';

export default {
  data() {
    return {
      infoItems: 4,
    };
  },
  computed: {
    ...mapState('page', {
      pageName: 'name',
    }),
    ...mapGetters('page', {
      isProfileOpened: 'isProfileOpened',
    }),
    openProfilePage() {
      return profileSections.find((item) => item.name == this.pageName).label;
    },
  },
  methods: {
    ...mapActions('user', {
      getEthBalance: 'getEthBalance',
    }),
  },
  mounted() {
    let erd = elementResizeDetectorMaker({
      strategy: 'scroll',
    });
    erd.listenTo(document.getElementsByClassName('header__stats'), (el) => {
      let width = el.offsetWidth;
      switch (true) {
        case (width < 200):
          this.infoItems = 0; break;
        case (width < 750):
          this.infoItems = 1; break;
        case (width < 1000):
          this.infoItems = 3; break;
        default:
          this.infoItems = 4; break;
       }
    });
  },
  components: {
    BButton,
    TheHeaderPair,
    TheHeaderPairInfo,
    TheHeaderLogout,
    TheHeaderWidgets,
  },
};
</script>

<style lang='scss'>
@import 'variables';

.header {
  position: relative;
  padding: 12px 25px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000000;
  &__pair {
    min-width: 400px;
    height: 35px;
  }
  &__stats {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    width: 100%;
    position: relative;
    // overflow: hidden;
    margin: 0 45px;
  }
  &__right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: 40px;
  }
  &__widgets {
    margin-right: 60px;
    min-width: 180px;
  }
  &__userbar {
    width: 23px;
    display: flex;
  }
  &__profileTitle {
    width: 100%;
    line-height: 25px;
    text-align: center;
    font-size: 16px;
    font-weight: 900;
    text-transform: uppercase;
  }
}
</style>
