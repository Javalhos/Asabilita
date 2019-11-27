<template>
  <!-- Relatório de Veículos -->
  <div class="card admin-card mt-3 mr-3">
    <div class="card-header header-admin" style="font-size: 22px">
      <strong>Relatório de Locações</strong>
    </div>

      <div class="table-responsive">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">User ID</th>
              <th scope="col">ID do Veículo</th>
              <th scope="col">Preço Final</th>
              <th scope="col">Código</th>
              <th scope="col">Reserva</th>
              <th scope="col">Status</th>
              <th scope="col">Início</th>
              <th scope="col">Fim</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rental in rentals" :key="rental.id">
              <th scope="row">{{ rental.id }}</th>
              <td>{{ rental.user_id }}</td>
              <td>{{ rental.vehicle_id }}</td>
              <td>R$ {{ rental.final_price }},00</td>
              <td>{{ rental.code }}</td>
              <td>{{ isReserved(rental) }}</td>
              <td>{{ finalStatus(rental) }}</td>
              <td>{{ startDate(rental) }}</td>
              <td>{{ endDate(rental) }}</td>
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
      rentals: []
    }
  },
  mounted () {
    get('/rentals')
      .then(res => { this.rentals = res.data })
      .catch(err => console.error(err))
  },
  methods: {
    startDate (rental) {
        return moment(rental.start).format('DD/MM/YYYY')
    },
    finalStatus (rental) {
        if (rental.status == 'NOT_CONFIRMED')
            return 'Pendente'
        else if (rental.status == 'CONFIRMED')
            return 'Confirmado'
        else
            return 'Cancelado'
    },
    endDate (rental) {
        return moment(rental.end).format('DD/MM/YYYY')
    },
    isReserved (rental) {
        if (rental.reserved == 1)
            return 'Sim'
        else
            return 'Não'
    }
  }
}
</script>
