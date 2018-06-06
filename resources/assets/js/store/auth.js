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
    this.state.refresh_token = localStorage.getItem('aba_refresh_token');
  },

  set(token, refreshToken, remember = true) {
    this.options.remember = !!remember;

    if (this.options.remember) {
      localStorage.setItem('aba_token', token);
      localStorage.setItem('aba_refresh_token', refreshToken);
    } else {
      this.remove();
    }

    this.state.token = token;
    this.state.refresh_token = refreshToken;
  },

  remove() {
    localStorage.removeItem('aba_token');
    localStorage.removeItem('aba_refresh_token');
    this.initialize();
  }
}
