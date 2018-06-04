<template lang='pug'>
.balance
  .balance__background(:style="`top: ${bgPosition}px`")
  .balance__content(
    v-for="(bal, index) in data",
    :key="bal.currency",
    v-on:mouseover="hoverEvent(index)"
  )
    Icon.balance__currencyIcon(:id="'cur_' + setCurrency(bal.currency)")
    .balance__currencyContainer
      .balance__main
        .balance__currencyName {{bal.currency}}
        .balance__changeIconContainer
          Icon.balance__changeIcon(id="triangle-up")
        .balance__amount(:class="{'balance__amount--zero': bal.availableFunds == 0}")
          .balance__currencyBalance {{toCurrencyFormat(bal.availableFunds)}}
          .balance__equivBalance ${{toCurrencyFormat(bal.balanceFiat)}}
    Icon.balance__icon.balance__icon--alert(id="alert-inactive")
</template>

<script>

export default {
  data() {
    return {
      bgPosition: -1,
    };
  },
  methods: {
    toCurrencyFormat(amount) {
      if (typeof amount == 'undefined') return false;
      return amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ');
    },
    hoverEvent(index) {
      this.bgPosition = index * 89;
    },
    setCurrency(curr) {
      if (typeof curr == 'string') {
        return curr.toLowerCase();
      }
    },
  },
  props: {
    data: {
      type: [Array, Object],
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

.balance {
  position: relative;
  margin-top: 24px;
  &:hover {
    .balance__background {
      opacity: .1;
    }
  }
  &__background {
    position: absolute;
    top: 0;
    height: 75px;
    opacity: 0;
    width: 100%;
    background: $background__white;
    transition: top .3s, opacity .3s;
    z-index: 0;
  }
  &__content {
    position: relative;
    display: flex;
    height: 75px;
    padding: 16px 16px 0 24px;
    margin-bottom: 14px;
    &:hover {
      .balance__amount--zero {
        transition: opacity 0.5s;
        opacity: 1;
      }
    }
  }
  &__currencyContainer {
    width: 100%;
  }
  &__main {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    cursor: pointer;
  }
  &__currencyIcon {
    $size: 28px;
    width: $size;
    height: $size;
    margin-top: -4px;
    margin-right: 13px;
  }
  &__changeIconContainer {
    flex: 2;
  }
  &__changeIcon {
    width: 6px;
    height: 7px;
    fill: $fill__green;
    margin-top: 10px;
    margin-left: 15px;
  }
  &__currencyName {
    color: $color__white;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    margin-top: 1px;
    margin-right: 5px;
  }
  &__amount {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 0;
    &--zero {
      opacity: 0.2;
      transition: opacity 0.5s;
    }
  }
  &__currencyBalance {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 14px;
  }
  &__equivBalance {
    font-size: 12px;
    font-weight: 400;
    white-space: nowrap;
  }
  &__icon{
    width: 16px;
    height: 17px;
    &--alert {
      fill: $fill__white;
      margin-left: 24px;
    }
  }
  &__deposit {
    margin: 18px 0;
    display: flex;
    justify-content: space-between;
  }
  &__depositIcon {
    $size: 14px;
    width: $size;
    height: $size;
  }
}
</style>
