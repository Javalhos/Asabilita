<template>
  <!-- Cadastro novos veículos -->
  <div class="card admin-card mt-3 mr-3">
    <div class="card-header header-admin" style="font-size: 22px">
      <strong>Cadastro de Novos Veículos</strong>
    </div>
    <form>
      <div class="row">
        <div class="col-6">
          <img :src="form.image || '/images/car-default.png'" alt="" class="img-responsive img-thumbnail m-3" style="max-height: 512px">
        </div>
        <div class="col-6">
          <div class="form-row mt-3 pr-3">
    
            <div class="form-group col-6 ml-3">
              <label>Marca</label>
              <input type="text" class="form-control" placeholder="Marca" v-model="form.brand">
              <small class="form-text text-danger" v-show="!!errors.brand">{{ errors.brand }}</small>
            </div>
    
            <div class="form-group col ml-3">
              <label>Modelo</label>
              <input type="text" class="form-control" placeholder="Modelo" v-model="form.model">
              <small class="form-text text-danger" v-show="!!errors.model">{{ errors.model }}</small>
            </div>
    
          </div>

          <div class="form-row pr-3">
            <div class="form-group col ml-3">
              <label>Ano</label>
              <input type="number"
                class="form-control"
                placeholder="Ano"
                min="1700"
                :max="(new Date).getFullYear()"
                v-model="form.year">
              <small class="form-text text-danger" v-show="!!errors.year">{{ errors.year }}</small>
            </div>

            <div class="form-group col-4 ml-3">
              <label>Categoria</label>
              <select class="form-control" v-model="form.category">
                <option value="SMALL">Pequeno</option>
                <option value="HATCH">Hatch</option>
                <option value="SEDAN">Sedã</option>
                <option value="SUV">SUV</option>
                <option value="LUXURY">Luxo</option>
                <option value="SPORTING">Esportivo</option>
              </select>
              <small class="form-text text-danger" v-show="!!errors.category">{{ errors.category }}</small>
            </div>

            <div class="form-group col-4 ml-3">
              <label>Status</label>
              <select class="form-control" v-model="form.status" @change="statusUpdated">
                <option value="AVAILABLE">Disponível</option>
                <option value="RENTED">Alugado</option>
                <option value="MAINTENANCE">Em Manutenção</option>
                <option value="FOR_SALE">À Venda</option>
                <option value="SOLD">Vendido</option>
                <option value="UNAVAILABLE">Indisponível</option>
              </select>
              <small class="form-text text-danger" v-show="!!errors.status">{{ errors.status }}</small>
            </div>
          </div>

          <div class="form-row pr-3" v-if="form.status === 'SOLD'">
            <div class="form-group col-6 ml-3">
              <label>Preço da Venda</label>
              <input type="number" class="form-control" v-model="form.sell_price" min="0" step="0.01" placeholder="Valor da Venda">
              <small class="form-text text-danger" v-show="!!errors.sell_price">{{ errors.sell_price }}</small>
            </div>

            <div class="form-group col ml-3">
              <label>Data da Venda</label><br>
              <app-datepicker v-model="form.sell_date"
                lang="pt-br"
                placeholder="Selecione uma Data"
                input-class="form-control"
                width="auto"
                :editable="true"
                format="dd/MM/yyyy"></app-datepicker>
              <small class="form-text text-danger" v-show="!!errors.sell_date">{{ errors.sell_date }}</small>
            </div>
          </div>
          
          <div class="form-row pr-3">
            <div class="form-group col-6 ml-3">
              <label>Preço da Compra</label>
              <input type="number" class="form-control" v-model="form.buy_price" min="0" step="0.01" placeholder="Valor da Compra">
              <small class="form-text text-danger" v-show="!!errors.buy_price">{{ errors.buy_price }}</small>
            </div>

            <div class="form-group col ml-3">
              <label>Data da Compra</label><br>
              <app-datepicker v-model="form.buy_date"
                lang="pt-br"
                placeholder="Selecione uma Data"
                input-class="form-control"
                width="auto"
                :editable="true"
                format="dd/MM/yyyy"></app-datepicker>
              <small class="form-text text-danger" v-show="!!errors.buy_date">{{ errors.buy_date }}</small>
            </div>
          </div>
    
          <div class="form-row pr-3">
    
            <div class="form-group col-3 ml-3">
              <label>Quilometragem</label>
              <input type="number" class="form-control" placeholder="Km" v-model="form.mileage">
              <small class="form-text text-danger" v-show="!!errors.mileage">{{ errors.mileage }}</small>
            </div>
    
            <div class="form-group col-3 ml-3">
              <label>Placa</label>
              <input type="text" class="form-control" placeholder="Placa" v-model="form.license_plate">
              <small class="form-text text-danger" v-show="!!errors.license_plate">{{ errors.license_plate }}</small>
            </div>
    
            <div class="form-group col ml-3">
              <label>Valor Aluguél Diário</label>
              <input type="number" class="form-control" placeholder="Valor Diário" v-model="form.price" min="0" step="0.01">
              <small class="form-text text-danger" v-show="!!errors.price">{{ errors.price }}</small>
            </div>
          </div>

          <div class="form-row pr-3">
            <div class="form-group col ml-3">
              <label>Imagem do Veículo</label>
              <b-form-file accept="image/*"
                placeholder="Nenhuma Imagem Selecionada"
                v-model="imageFile"
                @input="imageInput"></b-form-file>
              <small class="form-text text-danger" v-show="!!errors.image">{{ errors.image }}</small>
            </div>
          </div>

          <div class="form-row pr-3 mb-3">
            <div class="col ml-3">
              <button type="button" @click="createVehicle" class="btn btn-dark-admin">
                <span v-if="loading">
                  <i class="fas fa-circle-notch fa-lg fa-fw fa-spin"></i>
                </span>
                <span v-else>Salvar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { post } from '../../../helpers/api.js';
import moment from 'moment';
import DatePicker from 'vue2-datepicker';

export default {
  data() {
    return {
      imageFile: null,
      errors: {},
      form: {
        license_plate: '',
        brand: '',
        model: '',
        category: 'SMALL',
        status: 'AVAILABLE',
        year: (new Date).getFullYear(),
        mileage: '',
        price: '',
        buy_date: '',
        buy_price: '',
        image: ''
      },
      waitImage: false,
      loading: false
    };
  },
  computed: {
    imgPreview() {
      if (!this.imageFile && !this.form.image)
        return '/images/car-default';
      return this.form.image;
    }
  },
  methods: {
    imageInput() {
      this.waitImage = true;
      let frm = this.form;
      if (!this.imageFile) {
        this.form.image = '';
        return;
      }

      let fr = new FileReader;
      fr.onload = () => {
        frm.image = fr.result;
        this.waitImage = false;
      };
      fr.readAsDataURL(this.imageFile);
    },
    statusUpdated() {
      if (this.form.status === 'SOLD')
        return;
      this.form.sell_date = '';
      this.form.sell_price = '';
    },
    createVehicle() {
      while (this.waitImage == true) {
        console.log("Waiting Image Upload");
      }

      // Limpa Erros
      for (let field in this.form) {
        this.errors[field] = '';
      }
      // Tenta registrar
      this.loading = true;
      post('/vehicle', this.form)
        // Sucesso
        .then(res => {
          let { data } = res;
          this.form = {
            license_plate: '',
            brand: '',
            model: '',
            category: 'SMALL',
            status: 'AVAILABLE',
            year: (new Date).getFullYear(),
            mileage: '',
            price: '',
            buy_date: '',
            buy_price: '',
            image: ''
          };
          this.errors = {};
          this.imageFile = null;
          alert('Veículo cadastrado com sucesso!');
          console.log(data);
        })
        // Erro
        .catch(err => {
          console.log('Error of the Request', err);
          if (!err.response)
            return;
          switch (err.response.status) {
            case 400:
              err.response.data.errors.forEach(error => {
                this.errors[error.field] = error.message;
              });
              break;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  components: {
    'app-datepicker': DatePicker
  }
}
</script>
