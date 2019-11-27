<template>
	<main class="container-fluid h-75">
		<div class="row mt-5 h-100 align-items-center justify-content-center">
      <div class="col-md-4">
        <div class="card-login shadow">
          <article class="card-body">
            <h4 class="card-title mb-4 mt-1 text-center">Login</h4>
            <form class="p-2" @submit.prevent="login">        
              <div class="form-group">
                <input type="email"
                  :class="{ 'form-control form-control-lg': true, 'is-invalid': !!frm.err.email }"
                  placeholder="e-Mail"
                  v-model="frm.data.email">
                <small class="form-text text-danger" v-show="!!frm.err.email">{{ frm.err.email }}</small>
              </div>
    
              <div class="form-group">
                <input type="password"
                  :class="{ 'form-control form-control-lg': true, 'is-invalid': !!frm.err.password }"
                  placeholder="Senha"
                  v-model="frm.data.password">
                <small class="form-text text-danger" v-show="!!frm.err.password">{{ frm.err.password }}</small>
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
import { FormFactory } from '../../helpers/Form.js';

export default {
  data() {
    return {
      blockSocial: true,
      useSocial: true,
      loading: false,
      frm: FormFactory.makeForm({
        email: '',
        password: ''
      })
    }
  },
  methods: {
    toggleMode() {
      this.useSocial = !this.useSocial;
    },
    login() {
      // Limpa Erros
      this.frm.resetErrors();
      // Tenta registrar
      this.loading = true;
      post('/auth/signin', this.frm.data)
        // Sucesso
        .then(res => {
          let { data } = res;
          Auth.set(data.token);
          get('/user/load')
            .then(resp => {
              User.clear();
              User.load(resp.data.user);
            });
          this.$router.push('/');
        })
        // Erro
        .catch(err => {
          let errors = {};
          if (!err.response)
            return;
          switch (err.response.status) {
            case 400:
              for (let error in err.config.data.errors) {
                errors[error.field] = error.message;
              }
              this.frm.setErrors(errors);
              break;
            case 401:
              for (let error in err.config.data) {
                errors[error.field] = error.message;
              }
              this.frm.setErrors(errors);
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
