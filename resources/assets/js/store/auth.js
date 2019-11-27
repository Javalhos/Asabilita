import User from './user';

export default {
  options: {
    remember: true
  },

  state: {
    token: null,
    refresh_token: null
  },

  get isAdmin() {
    return User.role === 'ADMIN';
  },

  get isLoggedIn() {
    return !!this.state.token;
  },

  get isGuest() {
    return !this.isLoggedIn;
  },

  initialize() {
    this.state.token = localStorage.getItem('aba_token');
  },

  set(token, remember = true) {
    this.options.remember = !!remember;

    if (this.options.remember) {
      localStorage.setItem('aba_token', token);
    } else {
      this.remove();
    }

    this.state.token = token;
  },

  remove() {
    localStorage.removeItem('aba_token');
    this.initialize();
  }
}
