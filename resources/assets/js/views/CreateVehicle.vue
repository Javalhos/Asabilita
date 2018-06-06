<template> 
  <section class="section">
    <h1 class="title">Cadastrando Veículos</h1>

  <form @submit.prevent="cadastrar">
      <div class="field">
        <div class="control">
          <input type="text"
            :class="{ 'input': true, 'is-danger': !!errors.brand }"
            v-model="form.brand"
            placeholder="Marca">
          <p class="help is-danger" v-show="!!errors.brand">{{ errors.brand }}</p>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <input type="text"
            :class="{ 'input': true, 'is-danger': !!errors.model }"
            v-model="form.model"
            placeholder="Modelo">
          <p class="help is-danger" v-show="!!errors.model">{{ errors.model }}</p>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <input type="text"
            :class="{ 'input': true, 'is-danger': !!errors.license_plate }"
            v-model="form.license_plate"
            placeholder="Placa">
          <p class="help is-danger" v-show="!!errors.license_plate">{{ errors.license_plate }}</p>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <input type="text"
            :class="{ 'input': true, 'is-danger': !!errors.year }"
            v-model="form.year"
            placeholder="Ano">
          <p class="help is-danger" v-show="!!errors.year">{{ errors.year }}</p>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-body">
          <div class="field">
            <div class="control">
              <div class="select is-fullwidth">
                <select type="text"
                  :class="{ 'input select': true, 'is-danger': !!errors.status }"
                  v-model="form.status">
                  <option value="">Selecione um Status</option>
                  <option value="AVAILABLE">Disponível</option>
                  <option value="RENTED">Alugado</option>
                  <option value="MAINTENANCE">Em Manutenção</option>
                  <option value="FOR_SALE">À Venda</option>
                  <option value="SOLD">Vendido</option>
                  <option value="UNAVAILABLE">Indisponível</option>
                </select>
              </div>
              <p class="help is-danger" v-show="!!errors.status">{{ errors.status }}</p>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input type="text"
                :class="{ 'input': true, 'is-danger': !!errors.mileage }"
                v-model="form.mileage"
                placeholder="Quilometragem">
              <p class="help is-danger" v-show="!!errors.mileage">{{ errors.mileage }}</p>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input type="number"
                :class="{ 'input': true, 'is-danger': !!errors.price }"
                v-model="form.price"
                placeholder="Preço"
                min="0"
                step="0.01">
              <p class="help is-danger" v-show="!!errors.price">{{ errors.price }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="field">
        <div class="control is-expanded">
          <button :class="{ 'button is-primary is-fullwidth': true, 'is-loading': loading }">Adicionar</button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import { post } from '../helpers/api.js';

export default {
  data() {
    return {
      loading: false,
      errors: {},
      form: {
        brand: '',
        model: '',
        license_plate: '',
        year: '',
        status: '',
        mileage: '',
        price: ''
      }
    };
  },
  methods: {
    cadastrar() {
      this.loading = true;
      for (let field in this.errors) {
        this.errors[field] = '';
      }

      post('/vehicle', this.form)
        .then(console.log)
        .catch(err => {
          switch (err.response.status) {
            case 400:
              for (let error of err.response.data.errors) {
                this.errors[error.field] = error.message;
              };
              break;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
}
</script>