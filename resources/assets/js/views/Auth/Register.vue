<template>
	<main class="container-fluid h-75 mt-5">
		<div class="row mt-5 h-100 align-items-center">
      <div class="col-md-4 offset-md-4">
        <div class="card bg-white text-dark shadow mt-4">
          <article class="card-body">
            <h4 class="card-title text-center">Nova Conta</h4>
            <form class="p-2" @submit.prevent="register">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <input
                    type="text"
                    :class="{ 'form-control form-control-lg': true, 'is-invalid': !!frm.err.name }"
                    placeholder="Nome"
                    v-model="frm.data.name">
                  <small class="form-text text-danger" v-show="!!frm.err.name">{{ frm.err.name }}</small>
                </div>
    
                <div class="form-group col-md-6">
                  <input type="text"
                  :class="{ 'form-control form-control-lg': true, 'is-invalid': !!frm.err.last_name }"
                    placeholder="Sobrenome"
                    v-model="frm.data.last_name">
                  <small class="form-text text-danger" v-show="!!frm.err.last_name">{{ frm.err.last_name }}</small>
                </div>
              </div>
    
              <div class="form-group">
                <app-datepicker v-model="frm.data.birthday"
                  lang="pt-br"
                  placeholder="Data de Nascimento"
                  :input-class="`form-control form-control-lg ${!!frm.err.birthday ? 'is-invalid': ''}`"
                  width="100%"
                  :editable="true"
                  format="dd/MM/yyyy"></app-datepicker>
                <small class="form-text text-danger" v-show="!!frm.err.birthday">{{ frm.err.birthday }}</small>
              </div>

              <div class="form-group">
                <input type="text"
                  :class="{ 'form-control form-control-lg': true, 'is-invalid': !!frm.err.cpf }"
                  placeholder="CPF"
                  @keyup="checkCPF"
                  v-model="frm.data.cpf"
                  maxlength="11">
                <small class="form-text text-danger" v-show="!!frm.err.cpf">{{ frm.err.cpf }}</small>
              </div>
    
              <div class="form-group">
                <input type="email"
                  :class="{ 'form-control form-control-lg': true, 'is-invalid': !!frm.err.email }"
                  placeholder="e-Mail"
                  v-model="frm.data.email">
                <small class="form-text text-danger" v-show="!!frm.err.email">{{ frm.err.email }}</small>
              </div>
    
              <div class="form-row">
                <div class="form-group col-md-6">
                  <input type="password"
                    :class="{ 'form-control form-control-lg': true, 'is-invalid': !!frm.err.password }"
                    placeholder="Senha"
                    v-model="frm.data.password">
                  <small class="form-text text-danger" v-show="!!frm.err.password">{{ frm.err.password }}</small>
                </div>
    
                <div class="form-group col-md-6">
                  <input type="password"
                    :class="{ 'form-control form-control-lg': true, 'is-invalid': !!frm.err.password_confirmation }"
                    placeholder="Repetir Senha"
                    v-model="frm.data.password_confirmation">
                  <small class="form-text text-danger"
                    v-show="!!frm.err.password_confirmation">
                    {{ frm.err.password_confirmation }}
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
import DatePicker from 'vue2-datepicker';
import { post, get } from '../../helpers/api.js';
import Auth from '../../store/auth.js';
import User from '../../store/user.js';
import Logo from '../../components/Logo.vue';
import { FormFactory } from '../../helpers/Form.js';

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
      frm: FormFactory.makeForm({
        name: '',
        last_name: '',
        cpf: '',
        birthday: '',
        email: '',
        password: '',
        password_confirmation: ''
      })
    }
  },
  mounted() {
    if (!this.blockSocial) {
      this.loadSocialButtons();
    }
  },
  methods: {
    checkCPF() {
      this.frm.data.cpf = this.frm.data.cpf.replace(/\D/g, '');
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
      this.frm.resetErrors();
      // Tenta registrar
      post('/auth/signup', this.frm.data)
        .then(res => {
          Auth.set(res.data.tokens.token);
          User.load(res.data.user);
          this.$router.push('/');
        })
        .catch(err => {
          console.log(err);
          // Trata os erros
          switch (err.response.status) {
            case 400: // Bad Request - Erros de validação
              let errs = {};
              for (let error of err.response.data.errors)
                errs[error.field] = error.message;
              this.frm.setErrors(errs);
              break;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  components: {
    'app-logo': Logo,
    'app-datepicker': DatePicker
  }
}
</script>
