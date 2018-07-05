<template>
  <!-- Todas as Contas -->
  <div class="card admin-card mt-3 mr-3">
    <div class="card-header header-admin" style="font-size: 22px">
      <strong>Todas as Contas</strong>
    </div>
    <!-- <div class="form-group">
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
    </div> -->
    <div class="table-responsive">
      <table class="table mb-3">
        <thead class="thead-dark">
          <tr class="text-center">
            <th scope="col"></th>
            <th scope="col">Nome</th>
            <th scope="col">Nasc.</th>
            <th scope="col">e-mail</th>
            <th scope="col">CPF</th>
            <th scope="col">Tipo</th>
            <th scope="col">Editar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, idx) in users" :key="idx" class="text-center">
            <th scope="row">{{ user.id }}</th>
            <td>{{ user.name }}</td>
            <td>{{ user.birthday }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.cpf }}</td>
            <td>{{ user.role }}</td>
            <td>
              <a href="#" @click="removeUser(user.id, idx)" class="card-link">Excluir</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { get, del } from '../../../helpers/api.js';
export default {
  data() {
    return {
      users: []
    }
  },  

  mounted() {
    this.loadUsers();
  },

  methods: {
    removeUser(id, idx) {
      this.users.splice(idx, 1);
      del(`/auth/${id}`)
        .then(console.log)
        .catch(console.error);
    },
    loadUsers() {
      get('/auth')
        .then(res => {
          this.users = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
</script>
