// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
ModalLayout(:step="step", :isSuccess="isSuccess",  title="Add alert")
  .addAlert
    form.addAlert__content(v-if="step == 0" @submit.prevent="")
      .addAlert__row
        .addAlert__block
          .addAlert__text Allert me If the
          Dropdown.addAlert__dropdown(
            :options="valueOptions",
            :value="valueSelected",
            @input="changeSelectedValue",
            no-border,
            no-padding,
            underline,
          )
            template(slot="singleLabel", slot-scope="props")
              .addAlert__selected {{props.option}}
          .addAlert__text Price
      .addAlert__block
        .addAlert__text for
        Dropdown.addAlert__dropdown(
          :options="userCurrencies",
          :value="currencySelected",
          @input="changeSelectedCurrency",
          no-border,
          no-padding,
          underline,
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
          underline,
        )
          template(slot="singleLabel", slot-scope="props")
              .addAlert__selected {{props.option}}
      .addAlert__block
        .addAlert__text the value of &nbsp;
        Dropdown.addAlert__dropdown.addAlert__dropdown--baseCur(
          :options="baseCurrencyOptions",
          :value="baseCurrencySelected",
          @input="changeSelectedBaseCurrency",
          no-border,
          no-padding,
          underline,
        )
          template(slot="singleLabel", slot-scope="props")
            .addAlert__selected {{props.option}}
        IInput(v-model="price" type="number").addAlert__input
      Checkbox.addAlert__checkbox(name="acknowledged", color="white", :value="true", v-model="autoDisable")
        .addAlert__checkboxTittle Disable this allert after 1 month from now
      BButton.addAlert__button(color="malachite" rounded type="submit" @click="getApiRequestForCreateAlert") Add alert
    Status.addAlert__status(v-if="step == 1", :isSuccess="isSuccess", v-on:getBack="step--")
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex';
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
      valueOptions: ['Bid', 'Ask'],
      valueSelected: 'Bid',
      currencySelected: '',
      eventOptions: ['exceeded', 'reached', 'fallen below'],
      eventSelected: 'exceeded',
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
  },
  methods: {
    ...mapMutations('modal', {
      open: 'open',
    }),
    ...mapMutations('user', [
      'setAlertsListChange',
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
        // this.setAlertsListChange();
      }).catch(() => {
        this.step = 1;
      });
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
  &__content {
  }
  &__blocks {
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: space-between;
    // width: 100%;
    // min-width: 500px;
    // margin-top: 56px;
  }

  &__block {
    display: flex;
    // align-items: center;
    justify-content: space-between;
    // margin-bottom: 50px;
    // font-size: 14px;
    // font-weight: 400;
    // width: 45%;
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
  }
  &__inputs {

    // display: flex;
    // flex-direction: column;
    // & > * {
    //   flex-basis: 40%;
    //   margin-bottom: 50px;
    // }
  }
  &__input {
    display: flex;
    font-size: 30px !important;
    letter-spacing: 0;
    line-height: 61px !important;
  }
  &__checkbox {
    margin-bottom: 44px;
  }

  &__checkboxTittle {
    font-family: CenturyGothic;
    font-size: 12px;
    color: $color__white;
    letter-spacing: 0.38px;
    line-height: 25px;
    margin-left: 43px;
  }
  &__button {
    color: $color__blue;
    text-transform: uppercase;
  }
}
</style>
