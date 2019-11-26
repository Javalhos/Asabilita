<template>
  <!-- Relatório de Veículos -->
  <div class="card admin-card mt-3 mr-3">
    <div class="card-header header-admin" style="font-size: 22px">
      <strong>Relatório de Veículos</strong>
    </div>
    <div class="form-group">
      <div class="dropdown mt-3 ml-3 mb-3">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
        aria-expanded="false">
          Opções de Busca
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">Em circulação</a>
          <a class="dropdown-item" href="#">Disponíveis</a>
          <a class="dropdown-item" href="#">Em manutenção</a>
          <a class="dropdown-item" href="#">Mais alugados</a>
          <a class="dropdown-item" href="#">Alugados por período</a>
          <a class="dropdown-item" href="#">À venda</a>
          <a class="dropdown-item" href="#">Vendidos</a>
        </div>
      </div>


      <!-- Somente para a opção "Alugados por período!" -->
      <div class="datepicker ml-4 mb-3">
        <div class="row">
          <div class="col">
            <div class="form-row">
              <div class="form-group col-6">
                <label class="form-control-label mb-0">De</label>
                <input type="date" class="form-control" placeholder="Escolha uma data...">
              </div>
              <div class="form-group col-6">
                <label for="" class="from-control-label mb-0">Até</label>
                <input type="date" class="form-control">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table">
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
            <tr v-for="vehicle in vehicles" :key="vehicle.id">
              <th scope="row">{{ vehicle.id }}</th>
              <td>{{ vehicle.license_plate }}</td>
              <td>{{ vehicle.brand }}</td>
              <td>{{ vehicle.model }}</td>
              <td>{{ vehicle.year }}</td>
              <td>{{ vehicle.category }}</td>
              <td>{{ vehicle.status }}</td>
              <td>{{ vehicle.mileage }}</td>
              <td>{{ vehicle.buy_price }}</td>
              <td>
                <a href="#" class="card-link" @click="deleteVehicle(idx, vehicle.id)">Excluir</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { get, del } from '../../../helpers/api'

export default {
  data () {
    return {
      vehicles: []
    }
  },
  mounted () {
    get('/vehicle')
      .then(res => {
        const { data } = res.data

        if (data)
          this.vehicles = data
      })
      .catch(err => console.error(err))
  },
  methods: {
    deleteVehicle (idx, id) {
      del(`/vehicle/${id}`)
        .then(res => {
          this.vehicles.splice(idx, 1)
        })
        .catch(err => console.error(e))
    }
  }
}
</script>
