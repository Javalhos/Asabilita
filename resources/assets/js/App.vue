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
    
  },
  methods: {
    setup() {
      // global error http handler
      
      Auth.initialize();
      if (Auth.isGuest)
        return;

      console.log(Auth.isGuest, Auth.isAdmin, Auth);
      get('/user/load')
        .then(res => {
          User.clear();
          User.load(res.data.user);
        });
    }
  }
}
</script>
