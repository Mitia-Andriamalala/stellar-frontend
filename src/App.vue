<template>
  <div id="app">
    <!-- Si non connecté, afficher le formulaire de login -->
    <div v-if="!isLoggedIn">
      <LoginPage /> <!-- Appel du composant LoginPage -->
    </div>

    <!-- Si connecté, afficher le contenu existant -->
    <div v-else>
      <!-- Navbar -->
      <StellarNavbar />

      <!-- Une seule instance de router-view ici, qui chargera le contenu de la route -->
      <router-view /> <!-- Cette section affichera le contenu lié à la route active -->

      <!-- Footer -->
    </div>
  </div>
</template>

<script>
import StellarNavbar from './components/StellarNavbar.vue';
import LoginPage from './components/Login.vue'; // Import du composant LoginPage

export default {
  name: 'App',
  components: {
    StellarNavbar,
    LoginPage, // Déclaration du composant LoginPage
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('user');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('user');
    }
  }
};
</script>

<style scoped>
#app {
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  text-align: center;
  overflow-x: hidden;
  font-family: 'Montserrat', sans-serif;
}

.footer-stellar {
  background-color: #e08b0d;
  color: black;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem 1.5rem;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
}
</style>
