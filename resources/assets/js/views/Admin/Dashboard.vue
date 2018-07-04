<template>
  <!-- área do administrador -->
  <div class="card admin-card mt-3 mr-3">
    <div class="card-header header-admin" style="font-size: 22px">
      <strong>Área do Administrador</strong>
    </div>
    <div class="row dash-admin">
      <div class="col-sm-5 mt-3 ml-4 mb-3">
        <div class="card">
          <div class="card-body admin-card">
            <h5 class="card-title text-center">Veículos em Circulação</h5>
            <hr>
			      <h1 class="text-center">{{ available }}</h1>
          </div>
        </div>
      </div>
      <div class="col-sm-5 mt-3 mb-3">
        <div class="card">
          <div class="card-body admin-card">
            <h5 class="card-title">Veículos à venda</h5>
            <hr>
            <h1 class="text-center">{{ forSale }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from '../../helpers/api.js';

export default {
	mounted() {
		get('/vehicle/stats')
			.then(res => {
				this.available = res.data.available;
				this.forSale = res.data.forSale;
      })
      .catch(err => {
        console.log(err);
      });
	},
	data() {
		return {
			available: 0,
			forSale: 0
		}
	}
}
</script>
