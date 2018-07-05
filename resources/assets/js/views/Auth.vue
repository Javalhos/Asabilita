<template>
  <div class="h-100">
    <app-navbar :extended="true"></app-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Logo from '../components/Logo.vue';

export default {
  components: {
    'app-logo': Logo,
    'app-navbar': Navbar
  }
}
</script>
