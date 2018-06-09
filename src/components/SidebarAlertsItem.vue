<template lang='pug'>
.alert
  .alert__main
    .alert__currency
      Icon.alert__currencyIcon(:id="'cur_'+ setBaseCurrency.toLowerCase()")
      .alert__currencyName {{setBaseCurrency}}
    Icon.alert__icon(:class="data.activationDate ? 'alert__icon--activeAlert' : 'alert__icon--alert'", :id="data.activationDate ? 'alert-active' : 'alert-inactive'")
    .alert__date {{getDate}}
  .alert__textContainer
    //- .alert__text Target price for #[span.alert__textCurrency {{setBaseCurrency}}] #[span.alert__textTarget ] ...
    .alert__text {{getMessage}} .
    Icon.alert__removeIcon(:class="{'alert__removeIcon--inactive' : isDeleting}", id="remove" @click.native="deleteSidebarAlert")
</template>

<script>
import {mapActions} from 'vuex';
import {getCryptoName} from 'services/misc';
import Icon from './Icon';

export default {
  data() {
    return {
      isDeleting: false,
      priceType: ['exceeded', 'reached', 'fallen below'],
    };
  },
  computed: {
    getMessage() {
      return (this.data.arguments[4] ? 'Target ' : 'Current ') + 'price for ' + this.setBaseCurrency + ' has ' + this.priceType[this.data.arguments[1]] + ' ' + (this.data.arguments[4] ? 'the value of ' : 'below ') + this.data.arguments[2] + ' ' + (this.data.arguments[4] ? this.data.arguments[3] : '%');
    },
    setBaseCurrency() {
      return this.data.arguments[0];
    },
    getDate() {
      return new Date(this.data.creationDate).toLocaleDateString('ru-RU', {day: '2-digit', month: '2-digit'}) + ' / ' + new Date(this.data.creationDate).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false}); ;
    },
  },
  methods: {
    ...mapActions('alerts', [
      'deleteAlert',
    ]),
    fullCurrencyName() {
      const name = this.data.arguments[0].toUpperCase();
      return getCryptoName(name);
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
  &__main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 17px;
  }
  &__currency{
    display: flex;
    align-items: center;
  }
  &__currencyIcon {
    $size: 25px;
    width: $size;
    height: $size;
    margin-right: 13px;
  }
  &__currencyName {
    font-size: 12px;
    font-weight: bold;
    margin-right: 5px;
    text-transform: uppercase;
  }
  &__icon{
    $size: 12px;
    width: $size;
    height: $size;
    &--alert {
      fill: #044669;
    }
    &--activeAlert {
      fill: $color_green;
    }
  }
  &__date{
    font-size: 11px;
    color: #5b87a0;
  }
  &__textContainer{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  &__text{
    line-height: 19px;
  }
  &__textCurrency{
    color: #6ece1a;
    text-transform: capitalize;
    &:hover{
      cursor: pointer;
    }
  }
  &__textTarget {
    color: #febc09;
  }
  &__removeIcon {
    transform: rotate(45deg);
    $size: 14px;
    width: $size;
    height: $size;
    fill: $color_red;
    cursor: pointer;
    &--inactive {
      fill: $color_grey;
      cursor: default;
    }
    margin-top: 2px;
    margin-left: 32px;
  }
}
</style>
