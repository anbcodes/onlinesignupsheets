<template>
  <div class="home">
    <v-btn to="login">Login</v-btn>
  </div>
</template>

<script>
import Sheet from '../utils/Sheet';

export default {
  name: 'home',
  created() {
    this.$bus.$on('auth:login', () => {
      if (window.user && window.user.signedIn) {
        // eslint-disable-next-line
        new Sheet('Online Sign Up Sheets');
      }
    });
  },
};
</script>
