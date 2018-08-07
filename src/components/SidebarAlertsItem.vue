// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang='pug'>
.alert
  .alert__main
    .alert__currency
      Icon.alert__currencyIcon(:id="'cur_'+ setBaseCurrency.toLowerCase()")
      .alert__currencyName {{setBaseCurrency}}
    .alert__date {{getDate}}
    Icon.alert__icon(:class="data.activationDate ? 'alert__icon--activeAlert' : 'alert__icon--alert'", :id="data.activationDate ? 'alert-fulfilled' : 'alert-inactive'" @click="removeAlert()")
  .alert__textContainer
    p.alert__text {{this.data.arguments[4] ? 'Target ' : 'Current '}} price for #[span.alert__text--bold {{this.setBaseCurrency}}] has {{this.priceType[this.data.arguments[1]]}} {{this.data.arguments[4] ? 'the value of ' : 'below '}}
      span.alert__text--bold {{this.data.arguments[2]}} {{this.data.arguments[4] ? this.data.arguments[3] : '%'}}
      | ...
</template>

<script>
import {mapActions} from 'vuex';
import {cryptoName} from '@/store/staticData/cryptoName';
import Icon from './Icon';

export default {
  data() {
    return {
      isDeleting: false,
      priceType: ['exceeded', 'reached', 'fallen below'],
    };
  },
  computed: {
    setBaseCurrency() {
      return this.data.arguments[0];
    },
    getDate() {
      return new Date(this.data.creationDate).toLocaleDateString('ru-RU', {day: '2-digit', month: '2-digit'}) + ' / ' + new Date(this.data.creationDate).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false}); ;
    },
  },
  methods: {
    ...mapActions('alerts', [
      'disableAlertInSidebar',
    ]),
    fullCurrencyName() {
      const name = this.data.arguments[0].toUpperCase();
      return cryptoName[name];
    },
    deleteSidebarAlert() {
      if (!this.isDeleting) {
        this.isDeleting = true;
        this.deleteAlert({
          alertId: this.data.id,
        }).catch(() => {
          this.isDeleting = false;
        });
      };
    },
    removeAlert() {
      if (this.data.activationDate) {
        this.disableAlertInSidebar(this.data.id);
      }
    },
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  components: {
    Icon,
  },
};

</script>

<style lang="scss">
@import "variables";

.alert {
  display: flex;
  flex-direction: column;
  padding: 19px 21px 19px 24px;
  background: transparent;
  transition: background .5s;
  margin: 5px 0;

  &:first-of-type {
    margin-top: 17px;
  }

  &:hover {
    background: $background__blue_white;
    transition: background .5s;
  }

  &__main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  &__currency{
    display: flex;
    align-items: center;
  }

  &__currencyIcon {
    $size: 27px;
    width: $size;
    height: $size;
    margin-right: 13px;
  }

  &__currencyName {
    margin-right: 5px;
    width: 31px;
    height: 20px;
    color: $color__white;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
  }

  &__icon{
    $size: 17px;
    width: $size;
    height: $size;

    &--alert {
      fill: $fill__white;
    }

    &--activeAlert {
      fill: $fill__yellow;
      cursor: pointer;
    }
  }

  &__date{
    color: $color__white;
    font-size: 12px;
    font-weight: 400;
  }

  &__textContainer{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__text {
    font-family: "Century Gothic";
    font-size: 12px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0.5px;
    margin: 0 40px;
    margin-right: 50px;
    text-align: justify;

    &--bold {
      font-family: "Century Gothic";
      font-weight: 700;
    }
  }
}
</style>
