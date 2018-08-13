// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang='pug'>
label.radio(:class="{'radio--white' : isWhite}")
  input.radio__input(:id="`radio${_uid}`", type="radio", :name="name", @change="change" :class="{'radio__input--white' : isWhite}")
  .radio__icon(:class="{'radio__icon--white' : isWhite}")
  .radio__text(v-if="label") {{label}}
  slot
</template>

<script>

export default {
  model: {
    prop: 'cModel',
    event: 'change',
  },
  methods: {
    change() {
      this.$emit('change', this.value);
    },
  },
  mounted() {
    if (this.checked) {
      this.change();
      document.querySelector(`#radio${this._uid}`).checked = true;
    }
  },
  props: {
    name: {
      type: [String, Number, Object],
      default: '',
      required: true,
    },
    value: {
      type: [String, Number, Boolean, Object],
      default: '',
      required: false,
    },
    cValue: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: [String, Number],
      default: '',
      required: false,
    },
    checked: {
      type: Boolean,
      required: false,
      default: false,
    },
    isWhite: Boolean,
  },
};

</script>

<style lang='scss' scoped>
@import 'variables';
$ROOT: "radio";
.#{$ROOT} {
  display: flex;
  align-items: center;
  cursor: pointer;
  &__input {
    position: absolute;
    clip: rect(0 0 0 0);
    width: 1px;
    height: 1px;
    margin: -1px;
    background-color: transparent;
    transition: background-color .3s;
    &:checked {
      & + .#{$ROOT}__icon {
        border-color: $background__blue;
        background-color: $background__blue;
        transition: background-color .3s;
      }
    }
    &--white {
      &:checked {
        & + .#{$ROOT}__icon {
          border-color: $background__white;
          background-color: $background__white;
          transition: background-color .3s;
        }
      }
    }
  }
  &__icon {
    $size: 12px;
    width: $size;
    height: $size;
    border-radius: 50%;
    border-style: solid;
    border-width: 1px;
    border-color: $background__blue;
    flex-shrink: 0;
    &--white {
      border-color: $background__white;
    }
  }
  &__text {
    font-size: 12px;
    font-weight: bold;
    margin-left: 10px;
    color: inherit;
    text-transform: uppercase;
  }
}
</style>
