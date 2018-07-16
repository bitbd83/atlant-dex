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
ModalLayout
  .cryptoDeposit
    .cryptoDeposit__title Deposit {{data.currency}}
    QR.cryptoDeposit__qr(:text='address' size='148')
    .cryptoDeposit__addressText Your deposit address:
    .cryptoDeposit__address {{address}}
    BButton.cryptoDeposit__button(color="malachite" rounded v-clipboard='address' @click="makeDeposit()") Copy
    .cryptoDeposit__confirmations Funds will be deposited automatically after 3 confirmations
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import * as User from 'services/api/user';
import clipboard from '@/directives/clipboard';
import ModalLayout from '@/layouts/ModalLayout';
import BButton from 'components/BButton';
import QR from 'components/QR';

export default {
  data() {
    return {
      address: '',
    };
  },
  computed: {
    ...mapState('modal', {
      data: 'data',
    }),
    ...mapGetters('user', [
      'getCurrencyTransFees',
    ]),
    fee() {
      return this.getCurrencyTransFees.find((item) => item.name === this.data.currency).depositFee;
    },
  },
  methods: {
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    ...mapActions('user', {
      deposit: 'deposit',
    }),
    makeDeposit() {
      this.deposit({
        currency: (this.data.currency).toUpperCase(),
        amount: 100000,
      });
    },
  },
  created() {
    User.getDepositAddress({
      currency: this.data.currency,
    }).then((response) => {
      this.address = response.data.address;
    });
  },
  directives: {
    clipboard,
  },
  components: {
    ModalLayout,
    BButton,
    QR,
  },
};
</script>

<style lang='scss'>
.cryptoDeposit {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__title{
    font-size: 18px;
    font-weight: 900;
    text-transform: uppercase;
    color: #ffc600;
    margin-bottom: 57px;
  }
  &__qr {
    margin-bottom: 46px;
  }
  &__addressText {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 37px;
  }
  &__address {
    color: #ffc600;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 53px;
  }
  &__button {
    padding: 8px 45px;
    border-radius: 3px;
    font-size: 16px;
    font-weight: 900;
    text-transform: uppercase;
  }
  &__confirmations {
    font-size: 10px;
    font-weight: 400;
    text-align: center;
    margin-top: 45px;
  }
}
</style>
