<template>
  <v-container>
    <v-row justify="center" align="center" style="height: 600px;">
      <login-btn/>
    </v-row>
  </v-container>
</template>
<script>
import loginButton from '../components/LoginButton.vue';

export default {
  components: {
    'login-btn': loginButton,
  },
};
</script>
