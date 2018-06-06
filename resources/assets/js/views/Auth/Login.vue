<template>
	<main class="container h-75">
		<div class="row mt-5 h-100 align-items-center justify-content-center">
      <div class="col-md-4">
        <div class="card-login shadow">
          <article class="card-body">
            <h4 class="card-title mb-4 mt-1 text-center">Login</h4>
            <form class="p-2" @submit.prevent="login">        
              <div class="form-group">
                <input type="email"
                  :class="{ 'form-control form-control-lg': true, 'is-invalid': !!errors.email }"
                  placeholder="e-Mail"
                  v-model="form.email">
                <small class="form-text text-danger" v-show="!!errors.email">{{ errors.email }}</small>
              </div>
    
              <div class="form-group">
                <input type="password"
                  :class="{ 'form-control form-control-lg': true, 'is-invalid': !!errors.password }"
                  placeholder="Senha"
                  v-model="form.password">
                <small class="form-text text-danger" v-show="!!errors.password">{{ errors.password }}</small>
              </div>
    
              <button type="submit" class="btn btn-lg btn-dark btn-block">
                <span v-if="loading">
                  <i class="fas fa-circle-notch fa-lg fa-fw fa-spin"></i>
                </span>
                <span v-else>Login</span>
              </button>
            </form>
          </article>
        </div>
      </div>
    </div>
	</main>
</template>

<script>
import { post, get } from '../../helpers/api.js';
import Auth from '../../store/auth.js';
import User from '../../store/user.js';
import Logo from '../../components/Logo.vue';

export default {
  data() {
    return {
      blockSocial: true,
      useSocial: true,
      loading: false,
      errors: {},
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    toggleMode() {
      this.useSocial = !this.useSocial;
    },
    login() {
      // Limpa Erros
      for (let field in this.form) {
        this.errors[field] = '';
      }
      // Tenta registrar
      this.loading = true;
      post('/auth/signin', this.form)
        // Sucesso
        .then(res => {
          let { data } = res;
          Auth.set(data.token, data.refreshToken);
          get('/user/load')
            .then(resp => {
              User.clear();
              User.load(resp.data.user);
            });
          this.$router.push('/');
        })
        // Erro
        .catch(err => {
          if (!err.response)
            return;
          switch (err.response.status) {
            case 400:
              err.config.data.errors.forEach(error => {
                this.errors[error.field] = error.message;
              });
              break;
            case 401:
              for (let error of err.response.data) {
                console.log(error);
                this.errors[error.field] = error.message;
              }
              break;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  components: {
    'app-logo': Logo
  }
}
</script>
