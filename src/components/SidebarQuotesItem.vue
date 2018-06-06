<template lang='pug'>
.quoteItem
  Icon.quoteItem__currencyIcon(:id="'cur_'+ currency")
  .quoteItem__currencyContainer
    .quoteItem__main
      .quoteItem__row
        .quoteItem__currencyName() {{currency}}
        .quoteItem__price ${{price}}
      .quoteItem__row
        .quoteItem__change
          Icon.quoteItem__chngIcon(id="arrow", :class="{'.quoteItem__chngIcon--neg': priceChng < 0}")
          .quoteItem__changeAmt {{absPriceChng}}%
    .quoteItem__additional(v-if="isActive")
      .quoteItem__details #[.quoteItem__detail Market Cap] #[span.quoteItem__number ${{toCurrencyFormat(cap)}}]
      .quoteItem__details #[.quoteItem__detail Volume] #[span.quoteItem__number ${{toCurrencyFormat(volume)}}]
  Icon.quoteItem__icon.quoteItem__icon--alert(id="alert-inactive")
  Icon.quoteItem__icon.quoteItem__icon--triagle(id="triangle2" v-show="isActive")
</template>

<script>

export default {
  data() {
    return {
    };
  },
  computed: {
    absPriceChng() {
      return Math.abs(this.priceChng);
    },
  },
  methods: {
    toCurrencyFormat(amount) {
      return amount.replace(/(\d)(?=(\d{3})+\.)/g, '$1 ');
    },
  },
  props: {
    currency: {
      type: String,
      required: true,
    },
    price: {
      type: [Number, String],
      required: true,
    },
    priceChng: {
      type: [Number, String],
      required: true,
    },
    cap: {
      type: [Number, String],
      default: 0,
      required: false,
    },
    volume: {
      type: [Number, String],
      default: 0,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
};

</script>

<style lang="scss">
@import 'variables';

.quoteItem {
  display: flex;
  align-items: flex-start;
  margin-top: 25px;
  position: relative;
  &__currencyContainer {
    width: 100%;
  }
  &__main {
    &:hover {
      cursor: pointer;
      color: #ffc600;
    }
  }
  &__row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  &__currencyIcon {
    $size: 27px;
    width: $size;
    height: $size;
    margin-top: -5px;
    margin-right: 12px;
  }
  &__currencyName {
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
  }
  &__price {
    font-size: 16px;
    font-weight: 400;
  }
  &__icon{
    $size: 12px;
    width: $size;
    height: $size;
    &--alert {
      fill: #044669;
      margin-top: 3px;
      margin-left: 14px;
    }
    &--triagle {
      fill: #ffc600;
      position: absolute;
      top: 6px;
      left: -29px;
      transform: rotate(-90deg);
    }
  }
  &__change {
    display: flex;
    flex: 2;
    justify-content: flex-end;
    align-items: flex-end;
  }
  &__chngIcon {
    width: 7px;
    height: 6px;
    margin-right: 9px;
    fill: $color_green;
    &--neg {
      fill: $color_red;
      transform: rotate(180deg);
    }
  }
  &__changeAmt {
    font-size: 12px;
    line-height: 9px;
    font-weight: 400;
    color: $color_white;
  }
  &__deposit {
    margin: 18px 0;
    display: flex;
  }
  &__actionText {
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  &__depositIcon {
    $size: 14px;
    width: $size;
    height: $size;
    margin-right: 11px;
  }
  &__details {
    display: flex;
    justify-content: space-between;
    display: flex;
    font-size: 12px;
    font-weight: 400;
    line-height: 30px;
  }
  &__detail {
    width: 70px;
    margin-right: 14px;
  }
  &__number {
    white-space: nowrap;
  }
}
</style>
