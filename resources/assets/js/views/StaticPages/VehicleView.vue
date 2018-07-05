<template>
  <main class="container-fluid mt-5">
    <div class="row justify-content-center">
      <div class="col-10">
        <div class="card text-white mb-3">
          <div class="card-body">
            <div class="row" v-if="vehicle">
              <div class="col-6">
                <img :src="vehicle.image" class="img-responsive" style="max-width: 512px">
              </div>
              <div class="col-6">
                <h5 class="card-title">{{ vehicle.model.toUpperCase() }}</h5>
                <hr>
                <p class="card-text">Marca: {{ vehicle.brand }}</p>
                <p class="card-text">Modelo: {{ vehicle.model }}</p>
                <p class="card-text">Categoria: {{ vehicle.category | appCategory }}</p>
                <p class="card-text">Ano: {{ vehicle.year }}</p>
                <p class="card-text">Valor da Diária: {{ vehicle.price | appCurrency }}</p>
                <button @click="alugar"
                  class="btn btn-lg btn-dark-admin"
                  v-if="!rentCode">
                  <span v-show="loading">
                    <i class="fas fa-circle-notch fa-lg fa-fw fa-spin"></i>
                  </span>
                  <span v-show="!loading">Alugar</span>
                </button>
                <button class="btn btn-lg btn-dark"
                  disabled
                  v-else>
                  Código do Aluguel: {{ rentCode }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { post, get } from '../../helpers/api.js';
import { appCategory, appCurrency } from '../../helpers/filters.js';
import auth from '../../store/auth.js';

export default {
  filters: {
    appCategory,
    appCurrency
  },
  mounted() {
    this.loadVehicle();
  },
  data() {
    return {
      authState: auth.state,
      vehicle: null,
      rentCode: '',
      loading: false
    };
  },
  methods: {
    alugar() {
      if (!auth.isLoggedIn) {
        alert('Faça login para continuar!');
        return;
      } else {
        this.loading = true;
        post(`/rent/${this.$route.params.vid}`)
          .then(res => {
            this.rentCode = res.data.code;
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    loadVehicle() {
      get(`/vehicle/${this.$route.params.vid}`)
        .then(res => {
          this.vehicle = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>