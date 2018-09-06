// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
ModalLayout(:step="step", :isSuccess="isSuccess",  title="Add alert")
  .addAlert
    form.addAlert__content(v-if="step == 0" @submit.prevent="")
      .addAlert__quote "
      .addAlert__block
        span.addAlert__text Alert &nbsp;
        span.addAlert__text me &nbsp;
        span.addAlert__text If &nbsp;
        span.addAlert__text the &nbsp;
        Dropdown.addAlert__dropdown(
          :options="valueOptions",
          :value="valueSelected",
          @input="changeSelectedValue",
          no-border,
          no-padding,
          noTriangle,
        )
          template(slot="singleLabel", slot-scope="props")
            .addAlert__selected {{props.option}}
        .addAlert__text &nbsp; Price
      .addAlert__block
        .addAlert__text for
        Dropdown.addAlert__dropdown(
          :options="userCurrencies",
          :value="currencySelected",
          @input="changeSelectedCurrency",
          no-border,
          no-padding,
          noTriangle,
        )
          template(slot="singleLabel", slot-scope="props")
            .addAlert__selected {{props.option}}
        .addAlert__text has
        Dropdown.addAlert__dropdown(
          :options="eventOptions",
          :value="eventSelected",
          @input="changeSelectedEvent",
          no-border,
          no-padding,
          noTriangle,
        )
          template(slot="singleLabel", slot-scope="props")
              .addAlert__selected {{props.option}}
      .addAlert__block
        .addAlert__text the
        .addAlert__text value
        .addAlert__text of
        Dropdown.addAlert__dropdown.addAlert__dropdown--baseCur(
          :options="baseCurrencyOptions",
          :value="baseCurrencySelected",
          @input="changeSelectedBaseCurrency",
          no-border,
          no-padding,
          noTriangle,
        )
          template(slot="singleLabel", slot-scope="props")
            .addAlert__selected {{props.option}}
        IInput(v-model="price" type="number" noUnderline="").addAlert__input
      .addAlert__quote.addAlert__quote--last "
      Checkbox.addAlert__checkbox(name="acknowledged", color="white", :value="true", v-model="autoDisable")
        .addAlert__checkboxTittle Disable this alert after 1 month from now
      BButton.addAlert__button(color="malachite" rounded type="submit" @click="getApiRequestForCreateAlert") Add alert
      .addAlert__linkContainer(@click="goToPage")
        .link.link--white.addAlert__link My alerts
        icon(id="arrow_short").addAlert__linkArrow
    Status.addAlert__status(v-if="step == 1", :isSuccess="isSuccess", :successText="successText", v-on:getBack="step--")
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import {notification} from 'services/notification';
import {createAlert} from 'services/api/alerts';
import Icon from 'components/Icon';
import Dropdown from 'components/Dropdown';
import IInput from 'components/IInput';
import Checkbox from 'components/Checkbox';
import BButton from 'components/BButton';
import ModalLayout from '@/layouts/ModalLayout';
import Status from 'components/Status.vue';

export default {
  data() {
    return {
      autoDisable: true,
      step: 0,
      valueOptions: ['BID', 'ASK'],
      valueSelected: 'BID',
      currencySelected: '',
      eventOptions: ['EXCEEDED', 'REACHED', 'FALLEN BELOW'],
      eventSelected: 'EXCEEDED',
      baseCurrencyOptions: ['CNY', 'EUR', 'RUB', 'USD'],
      baseCurrencySelected: 'USD',
      price: 0.00,
      isSuccess: false,
    };
  },
  computed: {
    ...mapState('user', [
      'account',
      'userCurrencies',
    ]),
    ...mapGetters('misc', {
      isMobile: 'isMobile',
    }),
    ...mapGetters('user', [
      'getUserBalanceCurrencies',
    ]),
    ...mapGetters('tradeInfo', [
      'baseCurrency',
    ]),
    getDate() {
      let date = new Date();
      date = date.setMonth(date.getMonth() + 1);

      return this.autoDisable ? new Date(date).toISOString() : null;
    },
    successText() {
      return `Price alert for ${this.currencySelected} has been successfully set`;
    },
  },
  methods: {
    ...mapMutations('modal', {
      open: 'open',
    }),
    ...mapMutations('modal', {
      closeModal: 'close',
    }),
    ...mapMutations('user', [
      'setAlertsListChange',
    ]),
    ...mapActions('page', [
      'getOpenPage',
    ]),
    openSignIn() {
      this.open({
        name: 'signIn',
      });
    },
    changeSelectedValue(val) {
      this.valueSelected = val;
    },
    changeSelectedCurrency(val) {
      this.currencySelected = val;
    },
    changeSelectedEvent(val) {
      this.eventSelected = val;
    },
    changeSelectedBaseCurrency(val) {
      this.baseCurrencySelected = val;
    },
    getApiRequestForCreateAlert() {
      if (0 === this.price) {
        notification({
          title: 'Negative or zero value:',
          text: 'Price Level Must Be Greater Than Zero',
          type: 'error',
        });
        return;
      };
      createAlert({
        currency: this.currencySelected,
        comparator: this.eventOptions.indexOf(this.eventSelected),
        neededPriceLevel: Number(this.price),
        neededPriceLevelInPercent: false,
        neededPriceLevelCurrency: this.baseCurrencySelected,
        priceSide: this.valueOptions.indexOf(this.valueSelected),
        expirationDate: this.getDate,
      }).then(() => {
        this.step = 1;
        this.isSuccess = true;
      }).catch(() => {
        this.step = 1;
      });
    },
    goToPage() {
      this.closeModal();
      this.getOpenPage('alertsList');
    },
  },
  created() {
    this.changeSelectedCurrency(this.baseCurrency);
    this.baseCurrencySelected = this.account.currency;
  },
  components: {
    ModalLayout,
    Icon,
    Dropdown,
    IInput,
    Checkbox,
    BButton,
    Status,
  },
  validations: {
  },
};
</script>

<style lang="scss">
@import "variables";

.addAlert {
  &__block {
    display: flex;
    justify-content: space-between;
  }
  &__text {
    font-size: 30px;
    color: $color__white;
    letter-spacing: 0;
    line-height: 61px;
    text-transform: uppercase;
  }
  &__selected {
    font-size: 30px;
    color: $color__white;
    letter-spacing: 0;
    line-height: 61px;
    text-transform: uppercase;
    margin: 0;
    border-bottom: 4px dashed $background__white;
  }
  &__input {
    width: 120px;
    display: flex;
    font-size: 30px !important;
    letter-spacing: 0;
    line-height: 61px !important;
    border-bottom: 4px dashed $background__white;
  }
  &__quote {
    display: block;
    font-size: 30px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 61px;

    &--last {
      margin-top: 20px;
      margin-left: calc(100% - 13px);
    }
  }

  &__checkbox {
    margin-bottom: 44px;
  }

  &__checkboxTittle {
    font-family: "Century Gothic";
    font-size: 12px;
    color: $color__white;
    letter-spacing: 0.38px;
    line-height: 25px;
    margin-left: 43px;
  }
  &__button {
    color: $color__blue;
    text-transform: uppercase;
    margin-bottom: 86px;
  }

  &__linkArrow {
    display: inline-block;
    fill: $fill__white;
    width: 12px;
    height: 10px;
    margin-left: 20px;
    margin-top: 6px;
  }

}
</style>
