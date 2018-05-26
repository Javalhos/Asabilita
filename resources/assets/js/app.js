import Vue from 'vue';

import './bootstrap';
import App from './App.vue';
import { router } from './router';

const app = new Vue({
	// render: h => h('#app'),
	el: '#app',
	template: `<app></app>`,
	components: { App },
	router
});
