<template>
  <!-- Buscar/Alterar -->
  <div class="card admin-card mt-3 mr-3">
    <div class="card-header header-admin" style="font-size: 22px">
      <strong>Buscar/Alterar</strong>
    </div>
    <!-- SELEÇÃO POR SELECT -->
    <form class="mt-3">
      <div class="form-row mr-3">
        <div class="form-group col-md-6 ml-3">
          <select class="form-control" v-model="sOpt.searchBy" value="">
            <option value="" selected>Todos</option>
            <option value="model">Por modelo</option>
            <option value="brand">Por marca</option>
            <option value="license_plate">Por placa</option>
            <option value="rented_between">Por Período de locação</option>
            <option value="for_sale">À venda</option>
            <option value="sold">Vendidos</option>
          </select>
        </div>
        <!-- Este e o próximo dropdown subistitui o anterior de acordo com a escolha do User -->
        <!-- Somente para "Por marca" ou inserir row -->
        <template v-if="sOpt.searchBy !== ''">
          <div class="form-group col ml-3" v-if="sOpt.searchBy == 'brand'">
            <input type="text" class="form-control" placeholder="Marca">
          </div>
          <!-- Somente para "Por Modelo" ou inserir row -->
          <div class="form-group col ml-3" v-else-if="sOpt.searchBy == 'model'">
            <input type="text" class="form-control" placeholder="Modelo">
          </div>
          <!-- Somente para a opção "Alugados por período!" -->
          <div class="form-group col ml-3" v-else-if="sOpt.searchBy == 'rented_between'">
            <app-datepicker v-model="sOpt.period_range"
              :shortcuts="sOpt.period"
              :range="true"
              lang="pt-br"
              placeholder="Período de Locação"
              input-class="form-control"
              width="100%"
              format="dd/MM/yyyy"></app-datepicker>
          </div>
          <!-- Busca por placa -->
          
          <div class="form-group col ml-3" v-else-if="sOpt.searchBy == 'license_plate'">
            <input type="text" class="form-control" placeholder="Placa">
          </div>
        </template>
        <div class="form-group col-2 ml-3">
          <button class="btn btn-dark-admin btn-block" type="button">
            <span v-if="loading">
              <i class="fas fa-circle-notch fa-lg fa-fw fa-spin"></i>
            </span>
            <span v-else>Buscar</span>
          </button>
        </div>
      </div>
    </form>

    <!-- Tabela de Consulta -->
    <div class="table-responsive">
      <table class="table mb-3">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Placa</th>
            <th scope="col">Marca</th>
            <th scope="col">Modelo</th>
            <th scope="col">Ano</th>
            <th scope="col">Categoria</th>
            <th scope="col">Status</th>
            <th scope="col">Quilometragem</th>
            <th scope="col">Valor</th>
            <th scope="col">Editar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(vehicle, idx) in vehicles" :key="idx">
            <th scope="row">
              {{ vehicle.id }}
            </th>
            <td>
              <a href="#"
                data-toggle="tooltip"
                data-html="true"
                v-b-tooltip.left.hover.html="`<img class='img-responsive' style='max-width: 300px' src='${vehicle.image}'>`"
                class="card-link">{{ vehicle.license_plate }}</a>
            </td>
            <td>{{ vehicle.brand }}</td>
            <td>{{ vehicle.model }}</td>
            <td>{{ vehicle.year }}</td>
            <td>{{ vehicle.category | appCategory }}</td>
            <td>{{ vehicle.status | appStatus }}</td>
            <td>{{ vehicle.mileage }}</td>
            <td>{{ `R$ ${String(vehicle.price.toFixed(2)).replace(/\,/g, '^').replace(/\./g, ',').replace(/\^/g, '.')}` }}</td>
            <td>
              <a href="#" class="card-link">Alterar</a>
              <a href="#" @click="removeVehicle(idx, vehicle.id)" class="card-link">Excluir</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import { get, del } from '../../../helpers/api.js';
import * as filters from '../../../helpers/filters.js';

export default {
  filters,
  data() {
    return {
      loading: false,
      sOpt: {
        searchBy: '',
        period_range: '',
        period: [
          {
            text: 'Hoje',
            start: new Date,
            end: new Date
          }
        ]
      },
      vehicles: []
    }
  },
  mounted() {
    this.loadVehicle();
  },
  methods: {
    loadVehicle() {
      get('/vehicle')
        .then(res => {
          this.vehicles = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    removeVehicle(idx, id) {
      del(`/vehicle/${id}`)
        .then(res => {
          this.vehicles.splice(idx, 1);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {
    'app-datepicker': DatePicker
  }
}
</script>

<style>
  .mx-datepicker .form-control {
    max-width: 100%;
    width: 100%;
  }
  .mx-datepicker .form-control:read-only {
    background: #fff;
  }
</style>
