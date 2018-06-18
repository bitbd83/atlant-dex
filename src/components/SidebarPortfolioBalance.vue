<template lang='pug'>
.balance
  .balance__content(
    v-for="(bal, index) in data",
    :key="bal.currency",
  )
    Icon.balance__currencyIcon(:id="'cur_' + setCurrency(bal.currency)")
    .balance__currencyContainer
      .balance__main
        .balance__currencyName {{bal.currency}}
        .balance__changeIconContainer
          Icon.balance__changeIcon(id="triangle-up")
        .balance__amount(:class="{'balance__amount--zero': bal.availableFunds == 0}")
          .balance__currencyBalance {{numbersFormat(bal.availableFunds)}}
          .balance__equivBalance ${{numbersFormat(bal.balanceFiat)}}
    Icon.balance__icon.balance__icon--alert(id="alert-inactive" @click="open({name:'addAlert'})")
</template>

<script>
import {mapMutations} from 'vuex';
import {numbersFormat} from '@/mixins';

export default {
  mixins: [numbersFormat],
  methods: {
    ...mapMutations('modal', [
      'open',
    ]),
    setCurrency(curr) {
      if (typeof curr == 'string') return curr.toLowerCase();
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
  &__content {
    position: relative;
    display: flex;
    height: 75px;
    padding: 16px 16px 0 24px;
    margin-bottom: 14px;
    background: transparent;
    transition: background .5s;
    &:hover {
      background: $background__blue_white;
      transition: background .5s;
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
