<template>
  <router-view :class="shared.bgClass"></router-view>
</template>

<script>
import axios from 'axios';
import { interceptors, post, get } from './helpers/api.js';
import Auth from './store/auth.js';
import User from './store/user.js';
import shared from './store/shared.js';

let interval;

export default {
  data() {
    return {
      loading: true,
      authState: Auth.state,
      shared
    };
  },
  mounted() {
    let that = this;
    if (!Auth.state.refresh_token || Auth.state.refresh_token == 'undefined') {
      interval = setInterval(() => {
        if (!Auth.state.refresh_token || Auth.state.refresh_token == 'undefined')
          clearInterval(interval);
        else
          that.setup();
      }, 10);
    }
    
  },
  methods: {
    setup() {
      // global error http handler
      interceptors((err) => {
        switch (err.response.status) {
        case 401:
          if (err.config.url.includes('/auth/refresh'))
            break;
          if (!Auth.state.refresh_token || Auth.state.refresh_token == "undefined") {
            console.log(Auth.state.refresh_token);
            Auth.remove();
            this.$router.push('/auth/login');
          }
          // Try to refresh token
          return post('/auth/refresh', { refresh_token: Auth.state.refresh_token })
          .then(res => {
            // Received a new valid token.
            Auth.set(res.data.token, res.data.refresh_token);
            // Try the previous request again.
            err.config.__isRetryRequest = true;
            err.config.headers.Authorization = `Bearer ${res.data.token}`;
            return axios(err.config);
          })
          .catch(error => {
            console.log('Refresh Login error:', error.message, error.response.data);
            // Failed to get a new token, ask user to login again.
          });
          break;
        case 404:
          this.$router.push('/not-found');
          break;
        }
        return Promise.reject(err);
      });
      Auth.initialize();
      if (Auth.isGuest)
        return;

      console.log(Auth.state.refresh_token, Auth.isGuest, Auth.isAdmin, Auth);
      get('/user/load')
        .then(res => {
          User.clear();
          User.load(res.data.user);
        });
    }
  }
}
</script>
