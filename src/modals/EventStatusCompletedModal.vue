// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
ModalLayout
  Status(:isSuccess="true")
</template>

<script>
import ModalLayout from '@/layouts/ModalLayout';
import Status from 'components/Status.vue';

export default {
  components: {
    ModalLayout,
    Status,
  },
};
</script>

<style lang="scss">
</style>
