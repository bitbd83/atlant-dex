<template lang="pug">
.table
  Header(:title="title")
  .table__content
    slot
</template>

<script>
import Header from 'components/Header.vue';
export default {
  components: {
    Header,
  },
  props: {
    title: String,
  },
};
</script>

<style lang="scss">
.table {
  display: flex;
  flex-direction: column;
  flex: 2;
  &__content {

  }
}
</style>
