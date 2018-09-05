// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
canvas#qr
</template>

<script>
  import Qrious from 'qrious';

  export default {
    methods: {
      createQR() {
        new Qrious({
          element: document.querySelector('#qr'),
          value: this.text,
          size: this.size,
          background: this.isWhiteBackground ? '#ffffff' : '#004DFF',
          foreground: this.isWhiteBackground ? '#000000' : '#ffffff',
        });
      },
    },
    watch: {
      text() {
        this.createQR();
      },
    },
    mounted() {
      this.createQR();
    },
    props: {
      text: {
        type: [String, Number],
        required: true,
        default: '',
      },
      size: {
        type: [Number, String],
        required: false,
        default: 128,
      },
      isWhiteBackground: Boolean,
    },
  };
</script>
