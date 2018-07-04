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
            De
            <input type="date" class="form-control md-6"> até
            <input type="date">
          </div>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table ml-3 mr-3 mb-3">
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
            <tr>
              <th scope="row">1</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <a href="#" class="card-link">Alterar</a>
                <a href="#" class="card-link">Excluir</a>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <a href="#" class="card-link">Alterar</a>
                <a href="#" class="card-link">Excluir</a>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <a href="#" class="card-link">Alterar</a>
                <a href="#" class="card-link">Excluir</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
