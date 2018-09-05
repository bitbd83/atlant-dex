<template lang="pug">
  .customInput
    input.input.customInput__input(
      @focus="onFocus",
      @blur="onBlur",
      type="text",
      @input="change",
      :value="value",
      :class="{'input--error' : isError}",
    )
    ul.customInput__list(v-if="focused && showList")
      li.customInput__item(v-for="(item, index) in  filtered" @click="$emit('change', item)")
        .customInput__label {{ item }}
    .customInput__loader(v-if="isLoading")
      VerificationPageFormCustomInputLoader
</template>

<script>
import VerificationPageFormCustomInputLoader from 'components/VerificationPageFormCustomInputLoader';

export default {
  data() {
    return {
      input: '',
      focused: false,
      currentItem: 0,
      loaderSize: 10,
    };
  },
  computed: {
    showList() {
      return this.filtered.length == 1 && this.filtered[0] == this.value ? false : this.filtered.length;
    },
    filtered() {
      const str = this.value.toLowerCase();
      if (!str) {
        return this.list;
      }
      return this.list.filter((item) => {
        let pos = 0;
        let target = item.toLowerCase();
        return [...str].every((s) => {
          target = target.substr(pos);
          pos = target.indexOf(s) + 1;
          return pos > 0;
        });
      });
    },
  },
  methods: {
    change(e) {
      this.$emit('change', e.target.value);
    },
    onFocus() {
      this.focused = true;
    },
    onBlur() {
      setTimeout(() => {
        this.focused = false;
      }, 100);
    },

  },
  model: {
    event: 'change',
  },
  props: {
    value: String,
    list: [Array],
    isLoading: Boolean,
    isError: Boolean,
  },
  components: {
    VerificationPageFormCustomInputLoader,
  },
};
</script>

<style lang="scss" scoped>
@import 'variables';

.customInput {
  position: relative;
  display: inline-block;
  &__input {
    width: 208px;
  }
  &__list {
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    top: 100%;
    max-height: 300px;
    // border: 1px solid grey;
    overflow: auto;
    background: $background__white;
  }
  &__item {
    cursor: pointer;
    padding: 10px 2px;
    display: flex;
    align-items: center;
    &:hover, &:focus {
      background: $background__grey_dark;
    }
  }
  &__flagImg {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    margin-right: 10px;
  }
  &__label {
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
