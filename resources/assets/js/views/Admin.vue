<template>
  <div class="h-100">
    <app-navbar :extended="false" :extraClass="'fixed-top shadow'"></app-navbar>
    <main class="container-fluid" style="margin-top: 56px">
        <div class="row">
          <div class="col-md-2 pl-0">
            <app-admin-nav></app-admin-nav>
          </div>
          <!-- card -->
          <div class="col pl-0 pt-5 pr-5 pb-5">
            <router-view></router-view>            
          </div>
        </div>
    </main>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import AdminNav from './Admin/AdminNav.vue';
import { AppEvent } from '../helpers/AppEvent';
import shared from '../store/shared';

export default {
  mounted() {
    shared.bgClass = 'admin';
  },
  destroyed() {
    shared.bgClass = '';
  },
  components: {
    'app-navbar': Navbar,
    'app-admin-nav': AdminNav
  }
}
</script>

<style>
::-webkit-scrollbar {
    width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
    background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555; 
}
</style>
