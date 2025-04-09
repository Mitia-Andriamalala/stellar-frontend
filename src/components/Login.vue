<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <!-- Ajout du logo à côté du titre -->
        <h2>{{ isRegistering ? 'Inscription Stellar' : 'Connexion Stellar' }}</h2>
      </div>

      <!-- Formulaire de connexion -->
      <form v-if="!isRegistering" @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="username">Identifiant</label>
          <input
            type="text"
            v-model="username"
            id="username"
            required
            placeholder="Entrez votre identifiant"
            aria-label="Identifiant"
          />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
            type="password"
            v-model="password"
            id="password"
            required
            placeholder="Entrez votre mot de passe"
            aria-label="Mot de passe"
          />
        </div>
        <button type="submit" :disabled="loggingIn" class="login-btn">
          {{ loggingIn ? 'Connexion...' : 'Se connecter' }}
        </button>
        <p v-if="loginError" class="error">{{ loginError }}</p>
        <p class="toggle-form">
          Pas de compte ? <a href="#" @click.prevent="toggleForm">S'inscrire</a>
        </p>
      </form>

      <!-- Formulaire d'inscription -->
      <form v-else @submit.prevent="register" class="login-form">
        <div class="form-group">
          <label for="reg-username">Identifiant</label>
          <input
            type="text"
            v-model="regUsername"
            id="reg-username"
            required
            placeholder="Choisissez un identifiant"
            aria-label="Identifiant"
          />
        </div>
        <div class="form-group">
          <label for="reg-email">Email</label>
          <input
            type="email"
            v-model="regEmail"
            id="reg-email"
            required
            placeholder="Entrez votre email"
            aria-label="Email"
          />
        </div>
        <div class="form-group">
          <label for="reg-password">Mot de passe</label>
          <input
            type="password"
            v-model="regPassword"
            id="reg-password"
            required
            placeholder="Choisissez un mot de passe"
            aria-label="Mot de passe"
          />
        </div>
        <button type="submit" :disabled="registering" class="login-btn">
          {{ registering ? 'Inscription...' : 'S\'inscrire' }}
        </button>
        <p v-if="registerError" class="error">{{ registerError }}</p>
        <p v-if="registerSuccess" class="success">{{ registerSuccess }}</p>
        <p class="toggle-form">
          Déjà un compte ? <a href="#" @click.prevent="toggleForm">Se connecter</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      // Données pour la connexion
      username: '',
      password: '',
      loggingIn: false,
      loginError: '',

      // Données pour l'inscription
      isRegistering: false,
      regUsername: '',
      regEmail: '',
      regPassword: '',
      registering: false,
      registerError: '',
      registerSuccess: '', // Message de succès après inscription

      // URLs des API
      loginApiUrl: 'http://localhost/dolibarr-21.0.0/htdocs/custom/stellarimport/login_api.php',
      dolibarrApiUrl: 'http://localhost/dolibarr-21.0.0/htdocs/api/index.php/login',
    };
  },
  methods: {
    // Basculer entre les formulaires de connexion et d'inscription
    toggleForm() {
      this.isRegistering = !this.isRegistering;
      this.loginError = '';
      this.registerError = '';
      this.registerSuccess = ''; // Réinitialiser le message de succès
      this.username = '';
      this.password = '';
      this.regUsername = '';
      this.regEmail = '';
      this.regPassword = '';
    },

    // Méthode de connexion
    async login(useDolibarrApi = false, token = null) {
      this.loggingIn = true;
      this.loginError = '';
      try {
        // Choisir l'URL de l'API en fonction du paramètre useDolibarrApi
        const url = useDolibarrApi ? this.dolibarrApiUrl : this.loginApiUrl;

        const response = await axios.get(url, {
          params: {
            login: this.username,
            password: this.password,
          },
          headers: token && useDolibarrApi ? { 'DOLAPIKEY': token } : {}, // Utiliser le jeton si fourni et si on utilise l'API Dolibarr
        });

        if (useDolibarrApi) {
          // Réponse de l'API Dolibarr
          if (response.data.success) {
            localStorage.setItem('user', JSON.stringify({
              id: response.data.id,
              login: this.username,
              token: response.data.success,
            }));
            this.username = '';
            this.password = '';
            this.$router.push('/dashboard');
          } else {
            this.loginError = response.data.error?.message || 'Erreur de connexion';
          }
        } else {
          // Réponse de login_api.php
          if (response.data.success) {
            localStorage.setItem('user', JSON.stringify({
              id: response.data.id,
              login: this.username,
              token: response.data.token,
            }));
            this.username = '';
            this.password = '';
            this.$router.push('/dashboard');
          } else {
            this.loginError = response.data.message || 'Erreur de connexion';
          }
        }
      } catch (error) {
        this.loginError = error.response?.data?.message || error.response?.data?.error?.message || 'Erreur de connexion au serveur';
        console.error(error);
      } finally {
        this.loggingIn = false;
      }
    },

    // Méthode d'inscription
    async register() {
      this.registering = true;
      this.registerError = '';
      this.registerSuccess = '';
      try {
        const response = await axios.post('http://localhost/dolibarr-21.0.0/htdocs/custom/stellarimport/register.php', {
          login: this.regUsername,
          email: this.regEmail,
          password: this.regPassword,
        });

        if (response.data.success) {
          // Afficher un message de succès
          this.registerSuccess = 'Utilisateur créé';
          
          // Rediriger vers le formulaire de connexion après un délai
          setTimeout(() => {
            this.toggleForm();
          }, 2000); // 2 secondes pour que l'utilisateur voie le message
        } else {
          this.registerError = response.data.error || 'Erreur';
        }
      } catch (error) {
        this.registerError = error.response?.data?.error || 'Erreur';
        console.error(error);
      } finally {
        this.registering = false;
      }
    },
  },
};
</script>

<style scoped>
/* Réinitialisation des styles globaux pour plein écran */
.login-page {
  background-color: #1d1c1b;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

:deep(*) {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-container {
  max-width: 400px;
  width: 100%;
  padding: 40px;
  background-color: #2c2c2c;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  text-align: center;
  transition: transform 0.3s ease;
}

.login-container:hover {
  transform: translateY(-5px);
}

/* Style pour l'en-tête (logo + titre) */
.login-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px; /* Espace entre le logo et le titre */
  margin-bottom: 30px;
}

.login-logo {
  width: 80px; /* Ajuste la taille du logo selon tes besoins */
  height: 80px;
  object-fit: contain; /* Assure que le logo n'est pas déformé */
}

h2 {
  font-size: 2em;
  color: #e08b0d;
  margin: 0; /* Supprime la marge par défaut pour un meilleur alignement */
  font-family: 'Montserrat', sans-serif;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  text-align: left;
}

label {
  font-size: 1.1em;
  color: #fff;
  margin-bottom: 8px;
  display: block;
}

input {
  width: 100%;
  padding: 12px;
  font-size: 1em;
  border-radius: 8px;
  border: 1px solid #555;
  background-color: #333;
  color: #fff;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #e08b0d;
  box-shadow: 0 0 5px rgba(224, 139, 13, 0.5);
}

.login-btn {
  padding: 12px;
  background-color: #e08b0d;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.2em;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.login-btn:disabled {
  background-color: #555;
  cursor: not-allowed;
}

.login-btn:not(:disabled):hover {
  background-color: #c07a0c;
  transform: scale(1.02);
}

.error {
  color: #ff4d4d;
  margin-top: 15px;
  font-size: 1em;
  font-weight: 500;
}

.success {
  color: #4caf50; /* Vert pour le message de succès */
  margin-top: 15px;
  font-size: 1em;
  font-weight: 500;
}

.toggle-form {
  margin-top: 20px;
  color: #fff;
}

.toggle-form a {
  color: #e08b0d;
  text-decoration: none;
}

.toggle-form a:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 480px) {
  .login-container {
    margin: 20px;
    padding: 20px;
  }

  .login-header {
    flex-direction: column; /* Passe en colonne sur les petits écrans */
    gap: 10px;
  }

  .login-logo {
    width: 40px; /* Réduit la taille du logo sur mobile */
    height: 40px;
  }

  h2 {
    font-size: 1.5em;
  }

  .login-btn {
    font-size: 1em;
  }
}
</style>