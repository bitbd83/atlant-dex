// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang='pug'>
ModalLayout(:title="`${$t('crypto.deposit.deposit')} ${data.currency}`")
  .cryptoDeposit(v-show="isLoading == false")
    icon.cryptoDeposit__angle(id="angle-top-left")
    QR.cryptoDeposit__qr(:text='address' size='148')
    .cryptoDeposit__addressText {{$t('crypto.deposit.title')}}
    .cryptoDeposit__address {{address ? address : '-'}}
    BButton(color="malachite" rounded v-clipboard='address' @click="makeDeposit()").cryptoDeposit__button {{$t('crypto.deposit.copy')}}
    .cryptoDeposit__confirmations {{$t('crypto.deposit.description')}}
  Loader(:isLoading="isLoading" isWhite="")
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import * as User from 'services/api/user';
import clipboard from '@/directives/clipboard';
import ModalLayout from '@/layouts/ModalLayout';
import Loader from 'components/Loader';
import BButton from 'components/BButton';
import QR from 'components/QR';

export default {
  data() {
    return {
      address: '',
      isLoading: false,
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
    getApiREquest() {
      if (this.isLoading == false) this.isLoading = true;
      User.getDepositAddress({
        currency: this.data.currency,
      }).then((response) => {
        this.address = response.data.address;
        this.isLoading = false;
      }).catch(() => {
        this.isLoading = false;
      });
    },
  },
  created() {
    this.getApiREquest();
  },
  directives: {
    clipboard,
  },
  components: {
    ModalLayout,
    Loader,
    BButton,
    QR,
  },
};
</script>

<style lang='scss'>
@import 'variables';
.cryptoDeposit {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 360px;
  margin: 0 20px;


  &__angle {
    position: absolute;
    top: 0;
    left: 0;
    width: 17px;
    height: 16.26px;
    fill: $fill__white;
  }

  &__qr {
    margin-top: 84px;
    margin-bottom: 70px;
  }

  &__addressText {
    font-family: "Century Gothic";
    font-size: 14px;
    color: $color__white;
    letter-spacing: 0.44px;
    text-align: center;
    line-height: 25px;
    margin-bottom: 50px;
  }

  &__address {
    font-weight: 700;
    font-size: 16px;
    color: $color__white;
    text-align: center;
    margin-bottom: 53px;
  }

  &__button {
    color: $color__blue !important;
    text-transform: uppercase;
    margin-bottom: 50px;
  }

  &__confirmations {
    max-width: 256px;
    font-family: "Century Gothic";
    font-size: 12px;
    color: $color__white;
    letter-spacing: 0.38px;
    text-align: center;
    line-height: 25px;
  }
}
</style>
