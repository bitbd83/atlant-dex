// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
Dropdown.flagSwitch(
  :class="{'flagSwitch--phone': isPhone}",
  :options="flags",
  no-border,
  no-padding,
  underline,
  :value="value",
  @input="setFlag",
  v-bind="$attrs",
  isColorBlack="",
  isSmallTriangle="",
)
  template(
    slot="option",
    slot-scope="props",
  )
    .flagSwitch__option
      img.flagSwitch__optionImage(:src="`/static/flags/${props.option}.png`")
      div.flagSwitch__optionText {{getOptionText(props.option)}}
  template(
    slot="singleLabel",
    slot-scope="props",
  )
    .flagSwitch__option
      div.flagSwitch__optionText.flagSwitch__optionText--singleLabel #[span(v-show="isPhone") +]{{getSingleLabelText(props.option)}}
      img.flagSwitch__optionImage(:src="`/static/flags/${props.option}.png`")
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import {getCountryCurrency} from 'services/countries';
import Dropdown from 'components/Dropdown';
import {countryCurrencies} from '@/store/staticData/countryCurrencies';

export default {
  computed: {
    ...mapState('geo', ['countries']),
    ...mapGetters('geo', ['getCountryName', 'getCountryPhoneCode']),
    isCurrency() {
      return this.type === 'currency';
    },
    isPhone() {
      return this.type === 'phone';
    },
    countriesArray() {
      let arr = [];
      this.countries.forEach((el) => {
        arr.push(el.code);
      });
      return arr;
    },
    flags() {
      return this.isCurrency ? Object.keys(countryCurrencies) : this.countriesArray;
    },
  },
  methods: {
    ...mapActions('geo', ['getCountries']),
    setFlag(flag) {
      this.$emit('input', flag);
    },
    getOptionText(option) {
      return this.isCurrency ? getCountryCurrency(option) : this.getCountryName(option);
    },
    getSingleLabelText(option) {
      if (this.isCurrency) {
        return getCountryCurrency(option);
      } else if (this.isPhone) {
        return this.getCountryPhoneCode(option);
      } else {
        return this.getCountryName(option);
      }
    },
  },
  created() {
    this.getCountries();
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: 'country',
    },
  },
  components: {
    Dropdown,
  },
};
</script>

<style lang='scss' scoped>
@import 'variables';
.flagSwitch {
  /* width: 50px; */

  &--phone & {

    &__optionText--singleLabel {
      min-width: 33px;
      text-align: left;
    }
  }

  &__option {
    align-items: center;
    display: flex;
    width: max-content;
  }

  &__optionImage {
    width: 20px;
  }

  &__optionImage + &__optionText,
  &__optionText + &__optionImage {
    margin-left: 5px;
  }
}
</style>
