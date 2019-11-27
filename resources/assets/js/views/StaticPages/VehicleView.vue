<template>
  <main class="container-fluid mt-5">
    <div class="row justify-content-center">
      <div class="col-10">
        <div class="card text-white mb-3">
          <div class="card-body">
            <div class="row" v-if="vehicle">
              <div class="col-6">
                <img :src="vehicle.image" class="img-responsive" style="max-width: 512px">
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
                  <h5>{{ vehicle.model }}</h5>
                  <hr>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label>Marca</label>
                      <input type="text" class="form-control" v-model="vehicle.brand" disabled>
                    </div>
                    <div class="form-group col-md-6">
                      <label>Categoria</label>
                      <input type="text" class="form-control" v-model="vehicle.category" disabled>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Valor da Diária</label>
                    <input type="text" class="form-control" v-model="vehicle.formatedPrice" disabled>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label>Data de Retirada</label>
                      <app-datepicker
                        v-model="start"
                        lang="pt-br"
                        placeholder="Data de Retirada"
                        width="100%"
                        :editable="true"
                        format="dd/MM/yyyy"
                      >
                      </app-datepicker>
                    </div>
                    <div class="form-group col-md-6">
                      <label>Data de Devolução</label>
                      <app-datepicker
                        v-model="end"
                        lang="pt-br"
                        placeholder="Data de Devolução"
                        width="100%"
                        :editable="true"
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
                      <button type="button" @click="reservar" class="btn btn-dark-admin btn-block">
                        <span v-show="loading">
                          <i class="fas fa-circle-notch fa-lg fa-fw fa-spin"></i>
                        </span>
                        <span v-show="!loading">Reservar</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import moment from 'moment'
import DatePicker from 'vue2-datepicker'
import { post, get } from '../../helpers/api.js'
import auth from '../../store/auth.js'

export default {
  components: {
    'app-datepicker': DatePicker
  },
  mounted() {
    get(`/vehicle/${this.$route.params.vid}`)
      .then(res => {
        this.vehicle = res.data.data
        this.vehicle.formatedPrice = `R$ ${this.vehicle.price},00`
      })
      .catch(err => {
        console.log(err)
      })
  },
  data() {
    return {
      authState: auth.state,
      vehicle: null,
      rentCode: '',
      loading: false,
      start: '',
      end: '',
      fPrice: ''
    }
  },
  computed: {
    finalPrice() {
      if (!this.start || !this.end)
        return 'R$ 00,00'

      let startDate = moment(this.start)
      let endDate = moment(this.end)
      let diffDays = endDate.diff(startDate, 'days')
      this.fPrice = this.vehicle.price * diffDays

      return `R$ ${this.vehicle.price * diffDays},00`
    }
  },
  methods: {
    reservar() {
      if (!auth.isLoggedIn) {
        alert('Faça login para continuar!')
        return
      } else {
        this.loading = true
        post(`/reserve`, {
          start: this.start,
          end: this.end,
          finalPrice: this.fPrice,
          vId: this.$route.params.vid
        })
          .then(res => {
            this.rentCode = res.data.code

            this.start = ''
            this.end = ''
            this.$router.push('/')
            alert(`Reserva efetuada com sucesso, ${this.rentCode}!`)
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
}
</script>