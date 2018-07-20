// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
Modal
  .addAlert
    Icon.addAlert__icon(id="addAlert")
    form.addAlert__content(v-if="step == 0" @submit.prevent="")
      .addAlert__title Add alert
      .addAlert__blocks
        .addAlert__block
          .addAlert__text If the
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
        .addAlert__block
          .addAlert__text of
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
        .addAlert__block
          .addAlert__text
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
          .addAlert__text the value of
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
          IInput.addAlert__input(v-model="price" type="number")
      Checkbox.addAlert__checkbox(name="acknowledged", :value="true", v-model="autoDisable")
        .addAlert__disable Disable this alert in one month
      BButton.addAlert__button(color="malachite" rounded type="submit" @click="getApiRequestForCreateAlert") Add alert
    Status.addAlert__status(v-if="step == 1")
      .addAlert__statusMsg Alert added
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex';
import {createAlert} from 'services/api/alerts';
import Icon from 'components/Icon';
import Dropdown from 'components/Dropdown';
import IInput from 'components/IInput';
import Checkbox from 'components/Checkbox';
import BButton from 'components/BButton';
import Modal from '@/layouts/ModalLayout';
import Status from 'components/Status.vue';

export default {
  data() {
    return {
      autoDisable: true,
      step: 0,
      valueOptions: ['Bid Price', 'Ask Price'],
      valueSelected: 'Bid Price',
      currencySelected: '',
      eventOptions: ['has exceeded', 'has reached', 'has fallen below'],
      eventSelected: 'has exceeded',
      baseCurrencyOptions: ['CNY', 'EUR', 'RUB', 'USD'],
      baseCurrencySelected: 'USD',
      price: 0.00,
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
        // this.setAlertsListChange();
      });
    },
  },
  created() {
    this.changeSelectedCurrency(this.baseCurrency);
    this.baseCurrencySelected = this.account.currency;
  },
  components: {
    Icon,
    Dropdown,
    IInput,
    Checkbox,
    Modal,
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
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  max-width: 522px;
  margin: auto;
  &__icon {
    $size: 77px;
    width: $size;
    height: $size;
    fill: $color_yellow;
    margin: auto;
    margin-bottom: 50px;
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  &__title {
    font-size: 18px;
    font-weight: 900;
    text-transform: uppercase;
    text-align: center;
  }
  &__other {
    $color: #f7b933;
    color: $color;
    font-size: 14px;
    position: relative;
    font-weight: 700;
    cursor: pointer;
    &::after {
      content: "";
      height: 3px;
      width: 100%;
      bottom: -5px;
      left: 0;
      position: absolute;
      background-color: $color;
    }
  }
  &__blocks {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    min-width: 500px;
    margin-top: 56px;
  }

  &__block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50px;
    font-size: 14px;
    font-weight: 400;
    width: 45%;
  }
  &__text {
    white-space: nowrap;
    margin-right: 25px;
  }
  &__dropdown {
    max-width: 150px;
    padding-bottom: 1px;
    border-bottom: 1px solid $color_white;
    &--baseCur {
      max-width: 40px;
    }
  }
  &__selected {
    color: #f7bc34;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
  }
  &__inputs {

    display: flex;
    flex-direction: column;
    & > * {
      flex-basis: 40%;
      margin-bottom: 50px;
    }
  }
  &__input {
    color: #f7bc34;
    font-size: 14px;
    font-weight: 700;
    margin-left: 22px;
  }
  &__checkbox {
    align-items: flex-start !important;
  }

  &__disable {
    margin-left: 16px;
    margin-bottom: 42px;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
  }
  &__button {
    margin-left: auto;
    margin-right: auto;
    font-size: 16px;
    font-weight: 900;
    text-transform: uppercase;
    padding: 8px 42px;
  }
  &__statusMsg {
    text-align: center;
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 900;
  }
}
</style>
