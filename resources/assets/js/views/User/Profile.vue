<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col align-self-start">
            </div>
            <div class="col-8 align-self-center">
                <div class="card">
                    <h4 class="card-header">{{ user.fullName}}</h4>
                    <div class="card-body">
                        <h5>Informações Principais</h5>
                        <form>
                            <div class="form-row">
                                <div class="form-group col-6">
                                    <label>Email</label>
                                    <input type="text" class="form-control" v-model="user.email" disabled>
                                </div>
                                <div class="form-group col-6">
                                    <label>Cpf</label>
                                    <input type="text" class="form-control" v-model="user.cpf" disabled>
                                </div>
                            </div>
                        </form>
                        <hr>
                        <h5>Locações</h5>
                        <table class="table table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col">Código</th>
                                    <th scope="col">Preço Final</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Início</th>
                                    <th scope="col">Fim</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="rental in rentals" :key="rental.id">
                                    <td>{{ rental.code }}</td>
                                    <td>R$ {{ rental.final_price }},00</td>
                                    <td>{{ finalStatus(rental) }}</td>
                                    <td>{{ startDate(rental) }}</td>
                                    <td>{{ endDate(rental) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col align-self-end">
            </div>
        </div>
    </div>
</template>

<script>
import { get } from '../../helpers/api'
import moment from 'moment'

export default {
    data () {
        return {
            user: {},
            rentals: []
        }
    },
    async mounted () {
        await get('/user/load')
            .then(res => this.user = res.data.user )
            .catch(err => console.log(err))

        await get(`/rental/${this.user.id}`)
            .then(res => { this.rentals.push(res.data) })
            .catch(err => console.log(err))

        console.log(this.rentals)
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
        }
    }
}
</script>