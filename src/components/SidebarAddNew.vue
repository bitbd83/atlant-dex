<template lang="pug">
  .addNew(@click="setActive")
    .addNew__container
      .addNew__plus(v-if="isActive") +
      .addNew__input(v-else) Search
    .addNew__title(v-if="isActive == false") NEW
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    setActive() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style lang="scss">
.addNew {
  display: flex;

}
</style>

