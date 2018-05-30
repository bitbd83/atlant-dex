<template lang="pug">
.footer
  .footer__text TEST FOOTER
  TheHeaderLogout
</template>

<script>
import TheHeaderLogout from 'components/TheHeaderLogout';

export default {
  components: {
    TheHeaderLogout,
  },
};
</script>

<style lang="scss">
  .footer {
    display: flex;
    justify-content: space-between;
    background-color: #000;
    padding: 32px;
    &__text {
      color: #fff;
    }
  }
</style>
