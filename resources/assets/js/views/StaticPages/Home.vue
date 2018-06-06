<template>
  <main class="container mt-5">
    <h1 class="title">{{ message }}</h1>
    <p class="subtitle">Apenas para ver o design.</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere mollitia cum optio, velit sequi nemo. Accusamus dolor sunt numquam perspiciatis et quia unde laborum ab possimus repellendus. Tempora, quas facilis!</p>
  </main>
</template>

<script>
import Auth from '../../store/auth.js';

export default {
  data() {
    return {
      authState: Auth.state,
      date: null
    }
  },
  computed: {
    message() {
      return this.authState.token ? 'Você está logado!' : 'Você não está logado!';
    }
  }
}
</script>
