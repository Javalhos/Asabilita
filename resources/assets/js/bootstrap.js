try {
  require('bootstrap.native/dist/bootstrap-native-v4');
} catch (e) {
  console.log(e);
}

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
  console.error('CSRF token not found: http://adonisjs.com/docs/4.0/csrf');
}
