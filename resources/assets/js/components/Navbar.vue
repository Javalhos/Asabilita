<template>
  <header class="header shadow">
    <div class="container-fluid">
      <!-- Nav -->
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
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
            <router-link to='/admin' tag="li" v-if="currentUser.role === 'ADMIN'">
              <a class="nav-link">Admin</a>
            </router-link>
            <router-link to="my-account" tag="li" class="nav-item">
              <a class="nav-link">Minha Conta</a>
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

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false">
              FROTA
            </a>
            <div class="dropdown-menu shadow">
              <router-link to="/category/small" class="dropdown-item">Pequenos</router-link>
              <router-link to="/category/hatch" class="dropdown-item">Hatch</router-link>
              <router-link to="/category/sedan" class="dropdown-item">Sedã</router-link>
              <router-link to="/category/suv" class="dropdown-item">SUV</router-link>
              <router-link to="/category/luxury" class="dropdown-item">Luxo</router-link>
              <router-link to="/category/sporting" class="dropdown-item">Esportivos</router-link>
              <div class="dropdown-divider"></div>
              <router-link to="/category/all" class="dropdown-item">Todos</router-link>
            </div>
          </li>
          <li class="nav-item">
            <router-link to="about" class="nav-link">SOBRE NÓS</router-link>
          </li>
          <li class="nav-item mr-2">
            <router-link to="contact" class="nav-link">CONTATO</router-link>
          </li>
        </ul>
      </nav>
      <!-- End Nav Secundária -->
    </div>
  </header>
</template>

<script>
import { post } from '../helpers/api.js';
import Auth from '../store/auth.js';
import User from '../store/user.js';
import Logo from "./Logo.vue";

export default {
  props: [ 'extended' ],
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
}
</script>