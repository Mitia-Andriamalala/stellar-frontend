<template>
  <div class="navbar">
    <img class="rectangle" src="img/Rectangle 31.png" alt="Navbar Background" />
    
    <!-- Logo -->
    <div class="logo-group">
      <img class="logo" src="img/logo.png" alt="STELLAR Logo" />
    </div>

    <!-- Liens de navigation -->
    <div class="nav-links">
      <router-link to="/landing" class="link-product">Aperçu général</router-link>
      <div class="text-wrapper-4">Caractéristiques</div>
      <div class="caract-ristiques">Galerie&Produits</div>

      <!-- Lien vers la liste des produits Stellar -->
      <router-link to="/products" class="link-product">Boutique</router-link>

      <!-- Liens e-commerce -->
      <router-link to="/cart" class="link-product">Panier</router-link>
      <router-link to="/my-orders" class="link-product">Mes Commandes</router-link>
      <router-link to="/rate" class="link-product">Note Produits</router-link>
      <router-link to="/dashboard" class="link-product">Dashboard</router-link> <!-- Ajout ici -->
      <router-link to="/checkout" class="link-product">Paiement</router-link>

      <!-- Connexion et Déconnexion -->
      <button v-if="!isLoggedIn" class="login-btn" @click="login">Se connecter</button>
      <button v-if="isLoggedIn" class="logout-btn" @click="logout">Se déconnecter</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StellarNavbar',
  data() {
    return {
      isLoggedIn: false,
    };
  },
  mounted() {
    document.body.style.margin = '0';
    if (localStorage.getItem('user')) {
      this.isLoggedIn = true;
    }
  },
  methods: {
    login() {
      this.isLoggedIn = true;
      localStorage.setItem('user', 'connected');
    },
    logout() {
      this.isLoggedIn = false;
      localStorage.removeItem('user');
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.navbar {
  position: relative;
  width: 100%;
  height: 90px;
  overflow: hidden;
  top: 0;
  margin: 0;
  padding: 0;
}

.rectangle {
  position: absolute;
  width: 100%;
  height: 100px;
  top: 0;
  left: 0;
  object-fit: cover;
  z-index: 0;
}

.logo-group {
  position: absolute;
  top: 32px;
  left: 20px;
  width: 110px;
  height: auto;
  z-index: 1;
}

.logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.nav-links {
  position: absolute;
  top: 30px;
  right: 40px;
  display: flex;
  gap: 25px;
  align-items: center;
  z-index: 2;
  flex-wrap: wrap;
}

.nav-links div {
  font-family: "Montserrat-Bold", Helvetica;
  font-size: 16px;
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
  transition: color 0.3s ease;
  white-space: nowrap;
}

.nav-links div:hover {
  color: #e08b0d;
}

.link-product {
  font-family: "Montserrat-Bold", Helvetica;
  font-size: 16px;
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
  transition: color 0.3s ease;
  text-decoration: none; /* Ajout pour éviter le soulignement par défaut */
}

.link-product:hover {
  color: #e08b0d;
}

.login-btn,
.logout-btn {
  padding: 10px 20px;
  background-color: #e08b0d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-btn:hover,
.logout-btn:hover {
  background-color: #c07a0c;
}

/* Responsive */
@media (max-width: 1024px) {
  .nav-links {
    gap: 20px;
    right: 30px;
  }
  .nav-links div {
    font-size: 15px;
  }
}

@media (max-width: 768px) {
  .navbar {
    height: auto;
    padding-bottom: 15px;
  }
  .logo-group {
    top: 20px;
    width: 100px;
  }
  .nav-links {
    top: 70px;
    left: 0;
    right: 0;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
    padding: 0 20px;
  }
  .nav-links div {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .logo-group {
    width: 90px;
    top: 15px;
  }
  .nav-links {
    top: 65px;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .nav-links div {
    font-size: 14px;
  }
}
</style>