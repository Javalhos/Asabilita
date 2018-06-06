<template>
	<main class="h-75 mt-5">
		<div class="row mt-5 h-100 align-items-center">
      <div class="col-md-4 offset-md-4">
        <div class="card-register shadow mt-4">
          <article class="card-body">
            <h4 class="card-title text-center">Nova Conta</h4>
            <form class="p-2" @submit.prevent="register">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <input
                    type="text"
                    :class="{ 'form-control form-control-lg': true, 'is-invalid': !!errors.name }"
                    placeholder="Nome"
                    v-model="form.name">
                  <small class="form-text text-danger" v-show="!!errors.name">{{ errors.name }}</small>
                </div>
    
                <div class="form-group col-md-6">
                  <input type="text"
                  :class="{ 'form-control form-control-lg': true, 'is-invalid': !!errors.last_name }"
                    placeholder="Sobrenome"
                    v-model="form.last_name">
                  <small class="form-text text-danger" v-show="!!errors.last_name">{{ errors.last_name }}</small>
                </div>
              </div>
    
              <div class="form-group">
                <input type="text"
                  :class="{ 'form-control form-control-lg': true, 'is-invalid': !!errors.birthday }"
                  placeholder="Data de Nascimento DD/MM/AAAA"
                  v-model="form.birthday">
                <small class="form-text text-danger" v-show="!!errors.birthday">{{ errors.birthday }}</small>
              </div>

              <div class="form-group">
                <input type="text"
                  :class="{ 'form-control form-control-lg': true, 'is-invalid': !!errors.cpf }"
                  placeholder="CPF"
                  @keyup="checkCPF"
                  v-model="form.cpf">
                <small class="form-text text-danger" v-show="!!errors.cpf">{{ errors.cpf }}</small>
              </div>
    
              <div class="form-group">
                <input type="email"
                  :class="{ 'form-control form-control-lg': true, 'is-invalid': !!errors.email }"
                  placeholder="e-Mail"
                  v-model="form.email">
                <small class="form-text text-danger" v-show="!!errors.email">{{ errors.email }}</small>
              </div>
    
              <div class="form-row">
                <div class="form-group col-md-6">
                  <input type="password"
                    :class="{ 'form-control form-control-lg': true, 'is-invalid': !!errors.password }"
                    placeholder="Senha"
                    v-model="form.password">
                  <small class="form-text text-danger" v-show="!!errors.password">{{ errors.password }}</small>
                </div>
    
                <div class="form-group col-md-6">
                  <input type="password"
                    :class="{ 'form-control form-control-lg': true, 'is-invalid': !!errors.password_confirmation }"
                    placeholder="Repetir Senha"
                    v-model="form.password_confirmation">
                  <small class="form-text text-danger"
                    v-show="!!errors.password_confirmation">
                    {{ errors.password_confirmation }}
                  </small>
                </div>
              </div>
              <button type="submit" class="btn btn-lg btn-dark btn-block">
                <span v-if="loading">
                  <i class="fas fa-circle-notch fa-lg fa-fw fa-spin"></i>
                </span>
                <span v-else>Registrar</span>
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

class SocialButton {
  constructor(color) {
    this.url = '';
    this.classes = {
      'button is-fullwidth is-large is-link': true,
      'is-loading': false,
      [color]: true
    };
    this.disabled = true;
  }
}

export default {
  data() {
    return {
      blockSocial: true,
      useSocial: true,
      social: {
        facebook: new SocialButton('is-link'),
        twitter: new SocialButton('is-info'),
        google: new SocialButton('is-danger')
      },
      loading: false, //Used to trigger the errors because it will force the render event
      errors: {},
      form: {
        name: '',
        last_name: '',
        cpf: '',
        birthday: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  mounted() {
    if (!this.blockSocial) {
      this.loadSocialButtons();
    }
  },
  methods: {
    checkCPF() {
      this.form.cpf = this.form.cpf.replace(/\D/g, '');
    },
    loadSocialButtons() {
      this.getSocialRegisterURL('facebook');
      this.getSocialRegisterURL('twitter');
      this.getSocialRegisterURL('google');
    },
    getSocialRegisterURL(provider) {
      this.social[provider].classes['is-loading'] = true;
      get(`/ally/register/${provider}`)
        .then(res => {
          this.social[provider].url = res.data.url;
          this.social[provider].disabled = false;
        })
        .catch(err => {
          this.social[provider].url = '';
          this.social[provider].disabled = true;
        })
        .finally(() => {
          this.social[provider].classes['is-loading'] = false;
        });
    },
    toggleMode() {
      this.useSocial = !this.useSocial;
    },
    /**
     * Tenta registrar um usuário
     */
    register() {
      this.loading = true;
      // Limpa os erros
      for (let field in this.errors) {
        this.errors[field] = '';
      }

      // Tenta registrar
      post('/auth/signup', this.form)
        .then(res => {
          Auth.set(res.data.tokens.token, res.data.tokens.refresh_token);
          User.load(res.data.user);
          this.$router.push('/');
        })
        .catch(err => {
          console.log(err);
          // Trata os erros
          switch (err.response.status) {
            case 400: // Bad Request - Erros de validação
              err.response.data.errors.forEach(error => {
                this.errors[error.field] = error.message;
              });
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
