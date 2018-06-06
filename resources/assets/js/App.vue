<template>
  <router-view></router-view>
</template>

<script>
import axios from 'axios';
import { interceptors, post, get } from './helpers/api.js';
import Auth from './store/auth.js';
import User from './store/user.js';

export default {
  created() {
    // global error http handler
    interceptors((err) => {
      switch (err.response.status) {
        case 401:
          if (err.config.url.includes('/auth/signin'))
            break;
          // Try to refresh token
          return post('/auth/refresh', { refresh_token: this.authState.refresh_token })
            .then(res => {
              // Received a new valid token.
              Auth.set(res.data.token, res.data.refresh_token);
              // Try the previous request again.
              err.config.__isRetryRequest = true;
              err.config.headers.Authorization = `Bearer ${res.data.token}`;
              return axios(err.config);
            })
            .catch(error => {
              console.log('Refresh Login error:', error);
              // Failed to get a new token, ask user to login again.
              Auth.remove();
              this.$router.push('/auth/login');
            });
          break;
        case 404:
          this.$router.push('/not-found');
          break;
      }
      return Promise.reject(err);
    });
    Auth.initialize();
    get('/user/load')
      .then(res => {
        User.clear();
        User.load(res.data.user);
        console.log(User.data);
      });
  },
  data() {
    return {
      authState: Auth.state
    };
  }
}
</script>
