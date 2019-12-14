export default {
  mounted() {
    if (this.$router.history.current.name !== 'login') {
      if (!window.user) {
        this.$router.push({ name: 'login', query: { to: this.$route.fullPath } });
      } else if (!window.user.signedIn) {
        this.$router.push({ name: 'login', query: { to: this.$route.fullPath } });
      }
    }
  },
};
