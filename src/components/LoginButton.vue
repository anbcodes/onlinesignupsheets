<template>
  <div id="google-signin-btn">
  </div>
</template>
<script>
import log from '../utils/Log';
import googleUtils from '../utils/Google';

export default {
  mounted() {
    googleUtils.renderLoginButton('google-signin-btn', async () => {
      this.signedIn = true;
      window.user = { signedIn: true };
      this.$router.push({ path: this.$route.query.to || '/' });
      this.$bus.$emit('auth:login');

      this.log('Logged in');
    });

    this.$bus.$on('auth:logout', async () => {
      const auth2 = window.gapi.auth2.getAuthInstance();
      await auth2.signOut();
      auth2.disconnect();

      this.signedIn = false;

      this.$router.push({ name: 'login' });
    });
  },
  props: {
    big: Boolean,
  },
  data: () => ({
    log: (...args) => { log(__filename, ...args); },
    signedIn: false,
  }),
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>
