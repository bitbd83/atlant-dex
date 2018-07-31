// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

<template lang="pug">
ModalLayout(step="1", isSuccess="false", :title="fail")
  Status(:isSuccess="false" v-on:getBack="close")
</template>

<script>
import {mapMutations} from 'vuex';
import ModalLayout from '@/layouts/ModalLayout';
import Status from 'components/Status.vue';

export default {
  components: {
    ModalLayout,
    Status,
  },
  methods: {
    ...mapMutations('modal', ['close']),
  },
};
</script>

<style lang="scss">
</style>
