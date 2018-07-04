<template>
  <!-- Todas as Contas -->
  <div class="card admin-card mt-3 mr-3">
    <div class="card-header header-admin" style="font-size: 22px">
      <strong>Todas as Contas</strong>
    </div>
    <div class="form-group">
      <div class="form-check ml-4 mt-3">
        <input class="form-check-input" type="checkbox" id="gridCheck">
        <label class="form-check-label" for="gridCheck">
          Mostrar somente contas Bloqueadas
        </label>
      </div>
    </div>
    <div class="form-group">
      <div class="form-check ml-4">
        <input class="form-check-input" type="checkbox" id="gridCheck">
        <label class="form-check-label" for="gridCheck">
          Mostrar somente contas Ativas
        </label>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table ml-3 mr-3 mb-3">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Usuário</th>
            <th scope="col">Nasc.</th>
            <th scope="col">e-mail</th>
            <th scope="col">CPF</th>
            <th scope="col">Senha</th>
            <th scope="col">Tipo</th>
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
            <td>
              <a href="#" class="card-link">Alterar</a>
              <a href="#" class="card-link">Excluir</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
