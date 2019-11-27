<template>
	<div class="card admin-card mt-3 mr-3">
		<div class="card-header header-admin" style="font-size: 22px">
		  <strong>Confirmação de Reservas</strong>
		</div>

    <div class="card-body" v-if="loaded === false">
      <form class="form-inline">
        <div class="form-group mr-3">
          <input type="text" class="form-control" size="50" placeholder="Código de Reserva" v-model="code">
        </div>
        <button class="btn btn-success" @click="getReserva" :disabled="loading">
          <span v-show="loading">
            <i class="fas fa-circle-notch fa-lg fa-fw fa-spin"></i>
          </span>
          <span v-show="!loading">Buscar Reserva</span>
        </button>
      </form>
    </div>

    <div class="card-body" v-if="loaded">
      <div class="row">
        <div class="col-6">
          <img :src="rentalData.vehicle.image" class="img-responsive" style="max-width: 512px">
          <hr>
          <h5>Serviços Adicionais</h5>
          <div class="form-check form-check-inline">
            <input type="checkbox" class="form-check-input" id="gps" value="gps">
            <label for="gps" class="form-check-label">GPS</label>
          </div>
          <div class="form-check form-check-inline">
            <input type="checkbox" class="form-check-input" id="babySeat" value="babySeat">
            <label for="babySeat" class="form-check-label">Cadeirinha de Criança</label>
          </div>
          <div class="form-check form-check-inline">
            <input type="checkbox" class="form-check-input" id="airConditioning" value="airConditioning">
            <label for="airConditioning" class="form-check-label">Ar Condicionado</label>
          </div>
        </div>
        <div class="col-6">
          <form>
            <h5>{{ rentalData.vehicle.model }}</h5>
            <hr>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Marca</label>
                <input type="text" class="form-control" v-model="rentalData.vehicle.brand" disabled>
              </div>
              <div class="form-group col-md-6">
                <label>Categoria</label>
                <input type="text" class="form-control" v-model="rentalData.vehicle.category" disabled>
              </div>
            </div>
            <div class="form-group">
              <label>Valor da Diária</label>
              <input type="text" class="form-control" v-model="rentalData.vehicle.formatedPrice" disabled>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Data de Retirada</label>
                <app-datepicker
                  v-model="rentalData.start"
                  lang="pt-br"
                  placeholder="Data de Retirada"
                  width="100%"
                  :editable="false"
                  :disabled="true"
                  format="dd/MM/yyyy"
                >
                </app-datepicker>
              </div>
              <div class="form-group col-md-6">
                <label>Data de Devolução</label>
                <app-datepicker
                  v-model="rentalData.end"
                  lang="pt-br"
                  placeholder="Data de Devolução"
                  width="100%"
                  :disabled="true"
                  :editable="false"
                  format="dd/MM/yyyy"
                >
                </app-datepicker>
              </div>
            </div>
          </form>
          <hr>
          <form>
            <label>Valor Final</label>
            <div class="form-row">
              <div class="form-group col-md-8">
                <input type="text" class="form-control" v-model="finalPrice" disabled>
              </div>
              <div class="form-group col-md-4">
                <button type="button" @click="concluirAluguel" class="btn btn-dark-admin btn-block">
                  <span v-show="loading">
                    <i class="fas fa-circle-notch fa-lg fa-fw fa-spin"></i>
                  </span>
                  <span v-show="!loading">Concluir Aluguel</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import DatePicker from 'vue2-datepicker'
import { post, get } from '../../../helpers/api.js'
import auth from '../../../store/auth.js'

export default {
  components: { 'app-datepicker': DatePicker },
  data () {
    return {
      code: '',
      loaded: false,
      authState: auth.state,
      rentalData: {
        vehicle: null,
        code: '',
        start: '',
        end: '',
        final_price: ''
      },
      loading: false,
    }
  },
  computed: {
    finalPrice() {
      if (!this.rentalData.start || !this.rentalData.end)
        return 'R$ 00,00'

      let startDate = moment(this.rentalData.start)
      let endDate = moment(this.rentalData.end)
      let diffDays = endDate.diff(startDate, 'days')
      this.rentalData.final_price = this.rentalData.vehicle.price * diffDays

      return `R$ ${this.rentalData.vehicle.price * diffDays},00`
    }
  },
  methods: {
    async getReserva () {
      this.loading = true
      try {
        const { data } = await get(`/rental/code/${this.code}`)

        this.rentalData = { ...data }
        this.rentalData.vehicle.formatedPrice =  `R$ ${this.rentalData.vehicle.price},00`
        this.loaded = true
        console.log(data)
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    concluirAluguel () {
      this.loading = true
      post(`/rental/confirm/${this.code}`)
          .then(res => {
            this.rentalData = {}
            this.loaded = false
            alert('Aluguel confirmado com sucesso!')
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            this.loading = false
          })
    }
    
  }
}
</script>

