<template>
  <header class="header shadow">
      <!-- Nav -->
      <nav :class="`navbar ${extraClass} navbar-expand-lg navbar-dark bg-dark`">
        <app-logo></app-logo>

        <!-- Navbar Collapse -->
        <button class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mainNavBar"
          aria-controls="mainNavBar"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- End Navbar Collapse -->

        <!-- NAV Links -->
        <div class="collapse navbar-collapse" id="mainNavBar">
          <ul class="navbar-nav ml-auto" v-if="!!authState.token">
            <router-link to='/admin' tag="li" class="nav-item" v-if="currentUser.role === 'ADMIN'">
              <a class="nav-link">Admin</a>
            </router-link>
            <li class="nav-item">
              <a href="" @click.prevent="logout" class="nav-link" v-if="!logoutLoading">Sair</a>
              <a href="#" class="nav-link" v-else>
                <i class="fas fa-circle-notch fa-spin"></i>
              </a>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto" v-else>
            <router-link to="/auth/login" tag="li" class="nav-item">
              <a class="nav-link">Login</a>
            </router-link>
            <router-link to="/auth/register" tag="li" class="nav-item">
              <a class="nav-link">Register</a>
            </router-link>
          </ul>
        </div>
        <!-- End NAV Links -->
      </nav>
      <!-- End Nav -->

      <!-- Nav Secundária -->
      <nav class="nav-secundaria navbar-dark" v-if="extended">
        <ul class="nav justify-content-end">
          <li class="nav-item">
            <router-link class="nav-link" to="/">HOME</router-link>
          </li>
           <li class="nav-item" v-if="!!authState.token">
            <router-link class="nav-link" to="/user">PROFILE</router-link>
          </li>
        </ul>
      </nav>
      <!-- End Nav Secundária -->
  </header>
</template>

<script>
import { post } from '../helpers/api.js';
import Auth from '../store/auth.js';
import User from '../store/user.js';
import Logo from './Logo.vue';

export default {
  props: ['extended', 'extraClass'],
  data() {
    return {
      logoutLoading: false,
      authState: Auth.state,
      currentUser: User.data
    };
  },
  methods: {
    logout() {
      this.logoutLoading = true;
      Auth.remove();
      User.clear();
      this.logoutLoading = false;
      this.$router.push('/');
    }
  },
  components: {
    'app-logo': Logo
  }
};
</script>