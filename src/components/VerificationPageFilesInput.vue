// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
  .verificationUploadInput
    icon.verificationUploadInput__helpIcon(
      :class="{'verificationUploadInput__helpIcon--active' : active}",
      id="help",
      @click="$emit('showDesc')",
    )
    label.verificationUploadInput__inputBlock
      .input.verificationUploadInput__inputWrap(
        :class="{'verificationUploadInput__inputWrap--canDrop': canDrop, 'input--error': isError}"
      )
        .verificationUploadInput__fileName(v-if="fileName") {{fileName}}
        icon(id="icon-upload").verificationUploadInput__icon(v-else="fileName")
        input.verificationUploadInput__input(
          type="file",
          :accept="acceptTypes",
          @change="onChange",
          ref="input",
          @dragenter="canDrop = true",
          @dragleave="canDrop = false",
          @drop="canDrop = false",
        )
      span.verificationUploadInput__label {{label}}
</template>

<script>
import {notification} from 'services/notification';

const acceptTypes = ['application/pdf', 'image/*'];

export default {
  name: 'VerificationUploadInput',
  data() {
    return {
      isShowHelp: false,
      canDrop: false,
      acceptTypes: acceptTypes.join(','),
    };
  },
  computed: {
    fileName() {
      return this.value ? this.value.name : null;
    },
  },
  methods: {
    onChange() {
      const newFile = this.$refs.input.files[0];
      if (this.isFileAcceptable(newFile)) {
        this.$emit('input', newFile);
      } else {
        notification({
          type: 'error',
          text: this.$t('this_file_type_is_not_acceptable'),
          title: this.$t('wrong_file'),
        });
      }
    },
    isFileAcceptable(file) {
      return (file && file.type.match(acceptTypes.join('|')));
    },
  },
  props: {
    validation: [String, Boolean],
    value: [File, String],
    label: String,
    active: Boolean,
    isError: Boolean,
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import 'variables';
  .verificationUploadInput {
    position: relative;
    display: flex;

    &__inputBlock {
      display: flex;
      align-items: center;
    }
    &__inputWrap {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 139px;
      min-width: 139px;
      height: 139px;
      border-radius: 2px;

      &--canDrop {
        background-color: rgba($input-valid-color, .3);
      }
    }
    &__input {
      cursor: pointer;
      position: absolute;
      height: 100%;
      left: 0;
      opacity: 0;
      top: 0;
      width: 100%;
    }
    &__fileName {
      display: flex;
      font-size: 9px;
      line-height: 12px;
      padding: 5px;
      text-align: center;
      white-space: normal;
      word-break: break-all;
    }
    &__icon {
      width: 25px;
      height: 25px;
      fill: $background__blue;
    }
    &__helpIcon {
      cursor: pointer;
      fill: $fill__blue;
      position: absolute;
      left: 145px;
      top: -10px;
      width: 15px;
      height: 15px;
      &--active {
        fill: $fill__green;
      }
    }
    &__image {
      margin-left: 85px;
      opacity: .25;
    }
    &--valid & {
      &__inputWrap {
        border-color: $input-valid-color;
      }
    }
    &--error & {
      &__inputWrap {
        border-color: $input-error-color;
      }
    }
    &__label {
      display: inline;
      cursor: pointer;
      max-width: 114px;
      margin-left: 20px;
      text-decoration: underline;
      font-size: 12px;
      line-height: 19px;
    }
  }
</style>
