import Vue from 'vue';
import VueRouter from 'vue-router';

import {
  // Static Pages
  StaticPages, Home, NotFound,
  // Auth Pages
  Auth, Register, Login,
  // Admin Pages
  Admin, Dashboard,
  //
  CreateVehicle
} from './views';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  linkActiveClass: '',
  linkExactActiveClass: 'active',
  routes: [
    // Auth Routes
    { path: '/auth', meta: { guest: true }, component: Auth, children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register }
    ] },
    // Admin Routes
    { path: '/admin', meta: { auth: true, isAdmin: true }, component: Admin, children: [
      { path: '', component: Dashboard },
    ] },
    // Root Routes
    { path: '/', component: StaticPages, children: [
      { path: '', component: Home },
      { path: 'createVehicle', component: CreateVehicle }
    ] },
    // Exception Handler Routes
    { path: '/not-found', component: NotFound },
    { path: '*', component: NotFound }
  ]
});
