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
                <button @click="alugar" class="btn btn-lg btn-dark-admin">Alugar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { get } from '../../helpers/api.js';
import * as filters from '../../helpers/filters.js';
import auth from '../../store/auth.js';

export default {
  filters,
  mounted() {
    this.loadVehicle();
  },
  data() {
    return {
      authState: auth.state,
      vehicle: null
    };
  },
  methods: {
    alugar() {
      if (!auth.isLoggedIn)
        alert('Faça login para continuar!');
      else
        alert('Já pode retirar o carro na loja!')
    },
    loadVehicle() {
      get(`/vehicle/${this.$route.params.vid}`)
        .then(res => {
          this.vehicle = res.data.data
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
</script>