// Copyright 2017, 2018 Tensigma Ltd.

// Licensed under the Microsoft Reference Source License (MS-RSL)

// This license governs use of the accompanying software. If you use the software, you accept this license.
// If you do not accept the license, do not use the software.

// 1. Definitions
// The terms "reproduce," "reproduction," and "distribution" have the same meaning here as under U.S. copyright law.
// "You" means the licensee of the software.
// "Your company" means the company you worked for when you downloaded the software.
// "Reference use" means use of the software within your company as a reference, in read only form, for the sole purposes
// of debugging your products, maintaining your products, or enhancing the interoperability of your products with the
// software, and specifically excludes the right to distribute the software outside of your company.
// "Licensed patents" means any Licensor patent claims which read directly on the software as distributed by the Licensor
// under this license.

// 2. Grant of Rights
// (A) Copyright Grant- Subject to the terms of this license, the Licensor grants you a non-transferable, non-exclusive,
// worldwide, royalty-free copyright license to reproduce the software for reference use.
// (B) Patent Grant- Subject to the terms of this license, the Licensor grants you a non-transferable, non-exclusive,
// worldwide, royalty-free patent license under licensed patents for reference use.

// 3. Limitations
// (A) No Trademark License- This license does not grant you any rights to use the Licensor’s name, logo, or trademarks.
// (B) If you begin patent litigation against the Licensor over patents that you think may apply to the software
// (including a cross-claim or counterclaim in a lawsuit), your license to the software ends automatically.
// (C) The software is licensed "as-is." You bear the risk of using it. The Licensor gives no express warranties,
// guarantees or conditions. You may have additional consumer rights under your local laws which this license cannot
// change. To the extent permitted under your local laws, the Licensor excludes the implied warranties of merchantability,
// fitness for a particular purpose and non-infringement.

<template lang="pug">
  .verificationUploadInput(
    :class="[{'verificationUploadInput--help': isShowHelp}, validationClass]"
  )
    .verificationUploadInput__inputBlock
      .verificationUploadInput__inputWrap(
        :class="{'verificationUploadInput__inputWrap--canDrop': canDrop}"
      )
        .verificationUploadInput__fileName(v-if="fileName") {{fileName}}
        .verificationUploadInput__plus(v-else="fileName") +
        input.verificationUploadInput__input(
          type="file",
          :accept="acceptTypes",
          @change="onChange",
          ref="input",
          @dragenter="canDrop = true",
          @dragleave="canDrop = false",
          @drop="canDrop = false",
        )
      .verificationUploadInput__helpIcon(
        @mouseenter="isShowHelp = true",
        @mouseleave="isShowHelp = false",
      )
        Icon(id="help")
    img.verificationUploadInput__image(
      :src="imageSrc"
    )
</template>

<script>
import {notification} from 'services/notification';

const acceptTypes = ['application/pdf', 'image/*'];

export default {
  name: 'VerificationUploadInput',
  data() {
    return {
      // file: null,
      isShowHelp: false,
      canDrop: false,
      acceptTypes: acceptTypes.join(','),
    };
  },
  computed: {
    fileName() {
      return this.value ? this.value.name : null;
    },
    validationClass() {
      if (this.validation) {
        return `verificationUploadInput--${this.validation}`;
      }
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
          text: 'This file type is not acceptable!',
          title: 'Wrong file',
        });
      }
    },
    isFileAcceptable(file) {
      return (file && file.type.match(acceptTypes.join('|')));
    },
  },
  props: {
    imageSrc: String,
    validation: [String, Boolean],
    value: [File, String],
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import 'variables';
  .verificationUploadInput {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;

    &__inputBlock {
      position: relative;
    }
    &__inputWrap {
      align-items: center;
      border: 1px dashed $input-border-color;
      display: flex;
      height: 96px;
      justify-content: center;
      position: relative;
      width: 96px;

      &--canDrop {
        background-color: rgba($input-valid-color, .3);
      }
    }
    &__input {
      cursor: pointer;
      height: 100%;
      left: 0;
      opacity: 0;
      position: absolute;
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
    &__plus {
      font-size: 30px;
      font-weight: bold;
    }
    &__helpIcon {
      cursor: pointer;
      fill: #ffc600;
      position: absolute;
      right: -25px;
      top: -15px;
      transition: fill .3s ease;
    }
    &__image {
      margin-left: 85px;
      opacity: .25;
      transition: opacity .3s ease;
    }

    &--help &{
      &__image {
        opacity: 1;
      }
      &__helpIcon {
        fill: #034468;
      }
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
  }
</style>
