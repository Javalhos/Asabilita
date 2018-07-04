<template>
  <div class="container">
    <div class="row">

      <!-- Carousel -->
      <div class="col-8">
        <div id="carouselCars" class="carousel slide mt-3" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselCars" data-slide-to="0" class="active"></li>
            <li data-target="#carouselCars" data-slide-to="1"></li>
            <li data-target="#carouselCars" data-slide-to="2"></li>
          </ol>

          <div class="carousel-inner">
            <div class="carousel-item active">
              <img class="d-block w-100" src="https://i.imgur.com/t8roETj.jpg" alt="First-slide">

              <div class="carousel-caption d-none d-block">
                <p>Venha conhecer o Audi R8, nosso carro mais alugado!</p>
              </div>
            </div>

            <div class="carousel-item">
              <img class="d-block w-100" src="https://i.imgur.com/6xH54dv.jpg" alt="Third-slide">
            </div>

            <div class="carousel-item">
              <img class="d-block w-100" src="https://i.imgur.com/BFh0mzs.jpg" alt="Second-slide">
            </div>
          </div>

          <a class="carousel-control-prev" href="#carouselCars" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>

          <a class="carousel-control-next" href="#carouselCars" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>

        </div>
      </div>

      <!-- Card -->
      <div class="offset-1 col-3">
        <div class="card">
          <div class="card-header">
            Outros disponíveis para aluguel:
          </div>

          <div class="card-body">
            <div class="container" v-for="vehicle in vehicles" :key="vehicle.id">
              
              <div class="card text-white bg-dark">
                <img class="card-img-top" :src="vehicle.image">

                <div class="card-body">
                  <h5 class="card-title">{{ vehicle.model.toUpperCase() }}</h5>
                  <p class="card-text">Diária - {{ `R$ ${String(vehicle.price.toFixed(2)).replace(/\,/g, '^').replace(/\./g, ',').replace(/\^/g, '.')}` }}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Auth from '../../store/auth.js';
import { get } from '../../helpers/api.js';
import * as filters from '../../helpers/filters.js';

export default {
  filters,
  mounted() {
    this.loadVehicle();
  },
  methods: {
    loadVehicle() {
      this.loading = true;
      get('/vehicle')
        .then(res => {
          this.vehicles = res.data.data;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  data() {
    return {
      loading: false,
      vehicles: [],
      authState: Auth.state,
    }
  }
}
</script>