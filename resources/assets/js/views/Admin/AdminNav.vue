<template>
  <div class="nav-sidebar-items admin-nav pt-3">
    <ul class="nav flex-column">
      <li class="nav-item">
        <router-link exact to="/admin" class="nav-link">Dashboard</router-link>
      </li>
      <!-- Gerenciar Veículos -->
      <a class="nav-link nav-link-collapse" data-toggle="collapse" href="#collapseComponents" data-parent="#exampleAccordion"
      aria-expanded="true">

        <span class="nav-link-text">Gerenciar Veículos</span>
      </a>
      <ul class="sidenav-second-level collapse show" id="collapseComponents" style="">
        <li>
          <router-link exact to="/admin/vehicle">Visualizar</router-link>
        </li>
        <li>
          <router-link exact to="/admin/vehicle/new">Cadastrar</router-link>
        </li>
      </ul>
      <!-- Gerenciar Contas -->
      <li class="nav-item" data-toggle="tooltip" data-placement="right" title="" data-original-title="Example Pages">
        <a class="nav-link nav-link-collapse" data-toggle="collapse" href="#collapseExamplePages" data-parent="#exampleAccordion"
        aria-expanded="true">

          <span class="nav-link-text">Gerenciar Contas</span>
        </a>
        <ul class="sidenav-second-level collapse show" id="collapseExamplePages" style="">
          <li>
            <router-link exact to="/admin/accounts">Todas as Contas</router-link>
          </li>
          <!-- <li> -->
            <!-- <a href="#">Alterar</a> -->
          <!-- </li> -->
        </ul>
      </li>
      <!-- Relatórios -->
      <li class="nav-item" data-toggle="tooltip" data-placement="right" title="" data-original-title="Menu Levels">
        <a class="nav-link nav-link-collapse" data-toggle="collapse" href="#collapseMulti" data-parent="#exampleAccordion"
        aria-expanded="true">

          <span class="nav-link-text">Relatórios</span>
        </a>
        <ul class="sidenav-second-level collapse show" id="collapseMulti" style="">
          <li>
            <router-link to="/admin/report" tag="a">Alugueis</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
  .admin-nav .active{
    color: #f7901a;
  }
</style>
