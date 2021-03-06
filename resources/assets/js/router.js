import Vue from 'vue';
import VueRouter from 'vue-router';

import {
  // Static Pages
  StaticPages, Home, NotFound, VehicleView, About, Contact,
  // Auth Pages
  Auth, Register, Login,
  // Admin Pages
  Admin, Dashboard, AllAccounts, Report, ConfirmRental, RentalReport,
  // Vehicle Management Pages
  NewVehicle, SearchVehicle,
  // User Pages
  Profile
} from './views';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
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
	  // rental
	  { path: 'rental/confirm', component: ConfirmRental },
      // Vehicle Management
      { path: 'vehicle', component: SearchVehicle },
      { path: 'vehicle/new', component: NewVehicle },
      //Account Management
      { path: 'accounts', component: AllAccounts},
      { path: 'report', component: Report},
      { path: 'report/rental', component: RentalReport }
    ] },
    // Root Routes
    { path: '/', component: StaticPages, children: [
      { path: '', component: Home },
      { path: 'vehicle/:vid', component: VehicleView},
      { path: 'about', component: About},
      { path: 'contact', component: Contact},
      { path: '/user', component: Profile },
    ] },
    // Exception Handler Routes
    { path: '/not-found', component: NotFound },
    { path: '*', component: NotFound }
  ]
});
