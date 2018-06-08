<template lang='pug'>
.quoteItem
  .quoteItem__currencyContainer
    .quoteItem__main
      .quoteItem__row
        Icon.quoteItem__currencyIcon(:id="'cur_'+ currency")
        .quoteItem__currencyName() {{currency}}
        .quoteItem__price ${{changeFormat(price, 2)}}
        Icon.quoteItem__icon.quoteItem__icon--alert(id="alert-inactive" @click="")
      .quoteItem__row
        .quoteItem__change
          Icon.quoteItem__chngIcon(id="arrow", :class="{'.quoteItem__chngIcon--neg': priceChng < 0}")
          .quoteItem__changeAmt {{changeFormat(absPriceChng, 2)}}%
    transition(
      name="transition"
      v-on:before-enter="transitionAccordionBeforeEnter"
      v-on:enter="transitionAccordionEnter"
      v-on:before-leave="transitionAccordionBeforeLeave"
      v-on:leave="transitionAccordionLeave"
    )
      .quoteItem__additional(v-if="isActive")
        .quoteItem__details #[.quoteItem__detail Market Cap:] #[span.quoteItem__number ${{changeFormat(cap, 4)}}]
        .quoteItem__details #[.quoteItem__detail Volume:] #[span.quoteItem__number ${{changeFormat(volume, 4)}}]
</template>

<script>
import {mapMutations} from 'vuex';
import {toPricesFormatWitchPointsAndComma} from '@/mixins';

export default {
  computed: {
    absPriceChng() {
      return Math.abs(this.priceChng);
    },
  },
  methods: {
    ...mapMutations('modal', [
      'open',
    ]),
    transitionAccordionBeforeEnter(el) {
      el.style.height = '0';
    },
    transitionAccordionEnter(el) {
      el.style.height = el.scrollHeight + 'px';
    },
    transitionAccordionBeforeLeave(el) {
      el.style.height = el.scrollHeight + 'px';
    },
    transitionAccordionLeave(el) {
      el.style.height = '0';
    },
    changeFormat(amount, fix) {
      return toPricesFormatWitchPointsAndComma(amount, fix);
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
  position: relative;
  display: flex;
  align-items: flex-start;
  margin: 30px 0;
  margin-top: 15px;
  margin-bottom: 12px;
  padding: 22px 50px 15px 24px;
  background: transparent;
  transition: background .5s;

  &:hover {
    background: $background__blue_white;
    transition: background .5s;
  }

  &__currencyContainer {
    width: 100%;
  }

  &__main {
    cursor: pointer;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  &__currencyIcon {
    $size: 27px;
    width: $size;
    height: $size;
    margin-right: 12px;
  }

  &__currencyName {
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
  }

  &__price {
    flex: 1;
    text-align: right;
    font-size: 16px;
    font-weight: 400;
  }

  &__alertContainer {
    display: flex;
    width: 35px;
    justify-content: flex-end;
  }

  &__icon{
    width: 16px;
    height: 17px;

    &--alert {
      fill: $fill__white;
      margin-right: -35px;
      margin-left: 18px;
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

  &__additional {
    transition: height .5s;
    margin-right: -50px;
    overflow: hidden;
  }

  &__details {
    display: flex;
    justify-content: space-between;
    display: flex;
    color: $color__white;
    opacity: .7;
    margin-right: 50px;
    &:first-of-type {
      padding-top: 20px;
    }
  }

  &__detail {
    white-space: nowrap;
    width: 70px;
    margin-right: 14px;
    font-size: 11px;
    font-weight: 400;
    line-height: 30px;
  }

  &__number {
    white-space: nowrap;
    font-size: 11px;
    font-weight: 400;
    line-height: 30px;
  }
}
</style>
