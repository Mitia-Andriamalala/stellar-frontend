<template>
  <div id="app">
    <!-- Si non connecté, afficher le formulaire de login -->
    <div v-if="!isLoggedIn" class="login-container animate-slide-in">
      <h2>Connexion</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Identifiant</label>
          <input type="text" v-model="username" id="username" required />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <button type="submit" :disabled="loggingIn" class="btn-primary">
          {{ loggingIn ? 'Connexion...' : 'Se connecter' }}
        </button>
        <p v-if="loginError" class="error animate-error">{{ loginError }}</p>
      </form>
    </div>

    <!-- Si connecté, afficher le contenu existant -->
    <div v-else>
      <!-- Navbar -->
      <StellarNavbar class="animate-fade-in" />

      <!-- Intro Section -->
      <IntroSection class="section animate-slide-up" />

      <!-- Brand Section -->
      <BrandSection class="section animate-slide-up" />

      <!-- Terrain Reference Section -->
      <TerrainReference class="section animate-slide-up" />

      <!-- Features Section -->
      <FeaturesSection class="section animate-slide-up" />

      <!-- Gallery Section -->
      <GallerySection class="section animate-slide-up" />

      <!-- Autres Produits Stellar Section -->
      <AutresProduitsStellar class="section animate-slide-up" />

      <!-- Contact Section -->
      <ContactSection class="section animate-slide-up" />

      <!-- Une seule instance de router-view -->
      <router-view class="animate-fade-in" />

      <!-- SECTION PRODUITS (API Dolibarr) -->

      <!-- Footer -->
      <footer class="footer-stellar animate-parallax">
        <div>
          <p><span class="highlight">STELLAR Z</span> : L’avenir du vélo tout terrain commence ici</p>
          <p>Téléphone : <span>01 22 86 34 89</span></p>
          <p>Email : <span>contact@stellar.com</span></p>
        </div>
        <div class="footer-socials">
          <span>stellarbicycles</span>
          <div class="social-icons">
            <a href="#" aria-label="Facebook" class="animate-icon">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
            </a>
            <a href="#" aria-label="Instagram" class="animate-icon">
              <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" />
            </a>
            <a href="#" aria-label="X (Twitter)" class="animate-icon">
              <img src="@/assets/img/Tracé 96.png" alt="X" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import IntroSection from '../components/IntroSection.vue';
import BrandSection from '../components/BrandSection.vue';
import TerrainReference from '../components/TerrainReference.vue';
import FeaturesSection from '../components/FeaturesSection.vue';
import GallerySection from '../components/GallerySection.vue';
import ContactSection from '../components/ContactSection.vue';
import AutresProduitsStellar from '../components/AutresProduitsStellar.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    IntroSection,
    BrandSection,
    TerrainReference,
    FeaturesSection,
    GallerySection,
    ContactSection,
    AutresProduitsStellar
  },
  data() {
    return {
      username: '',
      password: '',
      loggingIn: false,
      loginError: '',
      products: [],
      loading: true,
      error: null,
      apiToken: 'stellaradmin2025',
      apiUrl: 'http://localhost/dolibarr-21.0.0/htdocs/api/index.php',
      newProduct: {
        ref: '',
        label: '',
        price: '',
        type: '0',
        status: '1'
      },
      importing: false,
      importMessage: '',
      importSuccess: false,
      file: null,
      fileImportMessage: '',
      fileImportSuccess: false
    };
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('user');
    }
  },
  mounted() {
    if (this.isLoggedIn) {
      this.fetchProducts();
    }
  },
  methods: {
    async login() {
      this.loggingIn = true;
      this.loginError = '';
      try {
        const response = await axios.get(`${this.apiUrl}/login`, {
          params: { login: this.username, password: this.password },
          headers: { 'DOLAPIKEY': this.apiToken }
        });
        if (response.data.success) {
          localStorage.setItem('user', JSON.stringify({
            id: response.data.id,
            login: this.username,
            token: response.data.success
          }));
          this.username = '';
          this.password = '';
          this.fetchProducts();
        } else {
          this.loginError = response.data.error?.message || 'Erreur de connexion';
        }
      } catch (error) {
        this.loginError = error.response?.data?.error?.message || 'Erreur de connexion au serveur';
      } finally {
        this.loggingIn = false;
      }
    },
    logout() {
      localStorage.removeItem('user');
      this.products = [];
      this.loading = true;
    },
    async fetchProducts() {
      try {
        const response = await axios.get(`${this.apiUrl}/products`, {
          headers: { 'DOLAPIKEY': this.apiToken }
        });
        this.products = response.data;
        this.loading = false;
      } catch (error) {
        this.error = 'Erreur lors du chargement des produits';
        this.loading = false;
      }
    },
    async addToCart(productId) {
      const orderData = {
        socid: 1,
        date: Math.floor(Date.now() / 1000),
        lines: [{ fk_product: productId, qty: 1, subprice: 0 }]
      };
      try {
        const response = await axios.post(`${this.apiUrl}/orders`, orderData, {
          headers: { 'DOLAPIKEY': this.apiToken, 'Content-Type': 'application/json' }
        });
        alert('Commande créée ! ID: ' + response.data);
      } catch (error) {
        alert('Erreur lors de la commande');
      }
    },
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
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

/* Animations */
@keyframes slideIn {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(100px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes errorShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.animate-slide-in {
  animation: slideIn 0.8s ease-out;
}

.animate-fade-in {
  animation: fadeIn 1s ease-in;
}

.animate-slide-up {
  animation: slideUp 1s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;
}

.animate-form {
  animation: slideUp 0.8s ease-out;
  transition: transform 0.3s ease;
}

.animate-btn {
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.animate-btn:hover:not(:disabled) {
  transform: scale(1.05);
  background-color: #c07a0c;
}

.animate-success {
  animation: fadeIn 0.5s ease-in;
}

.animate-error {
  animation: errorShake 0.5s ease-in-out;
}

.animate-icon {
  transition: transform 0.3s ease;
}

.animate-icon:hover {
  transform: scale(1.2);
}


@keyframes parallax {
  0% { background-position: 0 0; }
  100% { background-position: 100% 0; }
}

/* Login */
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 2px solid #e08b0d;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #c07a0c;
  outline: none;
}

.btn-primary {
  width: 100%;
  padding: 12px;
  background-color: #e08b0d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 700;
}

.btn-primary:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error {
  color: #ff4444;
  margin-top: 10px;
  font-weight: 500;
}

/* Produits */
.content {
  padding: 40px 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  margin: 20px auto;
  max-width: 1200px;
}

.produit-heading {
  font-size: 40px;
  font-weight: 700;
  color: #e08b0d;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.import-form {
  margin: 20px auto;
  max-width: 500px;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.import-form h2 {
  color: #e08b0d;
  font-size: 24px;
  margin-bottom: 15px;
  font-weight: 700;
}

.import-form input,
.import-form input[type="file"] {
  border: 2px solid #e08b0d;
  transition: border-color 0.3s ease;
}

.import-form input:focus {
  border-color: #c07a0c;
}

.import-form .success {
  color: #28a745;
  font-weight: 600;
}

.import-form .error {
  color: #ff4444;
  font-weight: 600;
}

/* Footer */
.footer-stellar {
  color: black;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: #c07a0c;
}

@media (min-width: 768px) {
  .footer-stellar {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.footer-stellar p {
  margin: 0.5rem 0;
  font-weight: 500;
}

.highlight {
  font-weight: 900;
  text-transform: uppercase;
}

.footer-socials {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-socials span {
  font-weight: 700;
  font-size: 0.875rem;
}

.social-icons img {
  width: 32px;
  height: 32px;
}

</style>