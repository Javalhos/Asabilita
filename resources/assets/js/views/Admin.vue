<template>
  <div>
    <app-navbar :extended="false"></app-navbar>
    <main class="container mt-3">
      <div class="row">
        <div class="col-3">
          <div class="card">
            <div class="card-body">
              <div class="list-group list-group-flush">
                <router-link to="/admin" class="list-group-item list-group-item-action">
                  Dashoard
                </router-link>
                <router-link to="/admin/vehicles" class="list-group-item list-group-item-action">
                  Vehicle Management
                </router-link>
                <router-link to="/admin/rentals" class="list-group-item list-group-item-action">
                  Rental Management
                </router-link>
                <router-link to="/admin/employees" class="list-group-item list-group-item-action">
                  Employee Management
                </router-link>
                <router-link to="/admin/users" class="list-group-item list-group-item-action">
                  User Management
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <router-view></router-view>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
  components: {
    'app-navbar': Navbar
  }
}
</script>

<style scoped>
  .list-group.list-group-flush .list-group-item {
    background: transparent;
    color: #ccc;

  }

  .list-group.list-group-flush .list-group-item.active {
    background: transparent;
    color: #fff;
    border-color: #fff;
  }

  .list-group.list-group-flush .list-group-item:hover {
    color: #ddd;
  }
</style>
