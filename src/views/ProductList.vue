<template>
  <div class="product-list-page">
    <h1>Liste des Produits Stellar</h1>

    <!-- Section de filtrage -->
    <div class="filter-section">
      <h2>Filtres</h2>
      <div class="filter-group">
        <!-- Filtre par nom -->
        <div class="filter-item">
          <label for="filter-label">Rechercher par nom :</label>
          <input
            type="text"
            id="filter-label"
            v-model="filterLabel"
            placeholder="Ex: Bicyclette X"
            @input="applyFilters"
          />
        </div>


        <!-- Filtre par catégorie -->
        <div class="filter-item">
          <label for="filter-category">Catégorie :</label>
          <select id="filter-category" v-model="filterCategory" @change="applyFilters">
            <option value="">Toutes les catégories</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.label }}
            </option>
          </select>
        </div>

        <!-- Filtre par plage de prix -->
        <div class="filter-item price-range">
          <label>Prix (MGA) :</label>
          <div class="price-inputs">
            <input
              type="number"
              v-model.number="filterPriceMin"
              placeholder="Min"
              min="0"
              @input="applyFilters"
            />
            <span>à</span>
            <input
              type="number"
              v-model.number="filterPriceMax"
              placeholder="Max"
              min="0"
              @input="applyFilters"
            />
          </div>
        </div>

        <!-- Tri par prix -->
        <div class="filter-item">
          <label for="sort-price">Trier par prix :</label>
          <select id="sort-price" v-model="sortOrder" @change="applyFilters">
            <option value="">Aucun tri</option>
            <option value="asc">Prix croissant</option>
            <option value="desc">Prix décroissant</option>
          </select>
        </div>

        <!-- Bouton pour réinitialiser les filtres -->
        <button @click="resetFilters" class="reset-btn">Réinitialiser les filtres</button>
      </div>
    </div>

    <!-- Liste des produits -->
    <div v-if="loading" class="loading">Chargement...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="filteredProducts.length === 0" class="no-results">
      Aucun produit ne correspond aux critères.
    </div>
    <div v-else class="product-container">
      <article v-for="product in filteredProducts" :key="product.id" class="product">
        <h2>{{ product.label }}</h2><!-- Utilisation de label comme référence -->
        <p class="category">Catégorie: <span>{{ product.category || 'Non défini' }}</span></p>
        <p class="price">Prix: <span>{{ product.price }} MGA</span></p>
        <button @click="addToCart(product)" aria-label="Ajouter {{ product.label }} au panier">
          Ajouter au panier
        </button>
      </article>
    </div>
    <router-link to="/cart" class="go-to-cart-btn">Voir le Panier</router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductList',
  data() {
    return {
      products: [], // Liste brute des produits
      filteredProducts: [], // Liste des produits après application des filtres
      categories: [], // Liste des catégories
      loading: true,
      error: null,
      apiToken: 'stellaradmin2025',
      apiUrl: 'http://localhost/dolibarr-21.0.0/htdocs/api/index.php',
      // Filtres
      filterLabel: '', // Filtre par nom
      filterRef: '', // Filtre par référence
      filterCategory: '', // Filtre par catégorie
      filterPriceMin: null, // Filtre par prix minimum
      filterPriceMax: null, // Filtre par prix maximum
      sortOrder: '', // Tri par prix (asc ou desc)
    };
  },
  mounted() {
    this.fetchCategories();
    this.fetchProducts();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get(`${this.apiUrl}/categories?type=product`, {
          headers: { 'DOLAPIKEY': this.apiToken },
        });
        this.categories = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
        // Simulation des catégories en cas d'échec
        this.categories = [
          { id: '1', label: 'Vélos de ville' },
          { id: '2', label: 'Vélos tout-terrain' },
          { id: '3', label: 'Vélos électriques' },
        ];
      }
    },
    async fetchProducts() {
      try {
        const response = await axios.get(`${this.apiUrl}/products`, {
          headers: { 'DOLAPIKEY': this.apiToken },
        });
        // Ajout des noms des catégories aux produits
        this.products = await Promise.all(
          response.data.map(async product => {
            // Récupérer les catégories associées au produit via l'API
            let categoryNames = 'Non défini';
            try {
              const categoryResponse = await axios.get(
                `${this.apiUrl}/products/${product.id}/categories`,
                {
                  headers: { 'DOLAPIKEY': this.apiToken },
                }
              );
              const categoryIds = categoryResponse.data.map(cat => cat.id);
              const categories = this.categories.filter(cat => categoryIds.includes(cat.id));
              categoryNames = categories.map(cat => cat.label).join(', ') || 'Non défini';
            } catch (error) {
              console.error(`Erreur lors de la récupération des catégories pour le produit ${product.id}:`, error);
            }
            return {
              ...product,
              category: categoryNames,
            };
          })
        );
        this.filteredProducts = [...this.products]; // Copie initiale pour le filtrage
        this.loading = false;
      } catch (error) {
        // Simulation statique en cas d'échec (basé sur tes CSV)
        this.products = [
          { id: 'BK1', label: 'Bicyclette 1', price: 850, category: 'Vélos de ville' },
          { id: 'BK2', label: 'Bicyclette 2', price: 875, category: 'Vélos tout-terrain' },
          { id: 'BK3', label: 'Bicyclette 3', price: 900, category: 'Vélos électriques' },
          { id: 'BK4', label: 'Bicyclette 4', price: 950, category: 'Vélos de ville' },
          { id: 'BK5', label: 'Bicyclette 5', price: 800, category: 'Vélos tout-terrain' },
        ];
        this.filteredProducts = [...this.products]; // Copie initiale pour le filtrage
        this.error = 'Simulation activée (API indisponible)';
        this.loading = false;
        console.error('Erreur API:', error);
      }
    },
    addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProduct = cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        product.quantity = 1;
        cart.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${product.label} a été ajouté au panier.`);

      // Trace dans Dolibarr
      axios.post('http://localhost/dolibarr-21.0.0/htdocs/custom/stellarimport/log_action.php', {
        action: 'add_to_cart',
        product_ref: product.label, // Utilisation de label comme référence
        product_name: product.label,
        timestamp: new Date().toISOString(),
      })
        .then(response => console.log('Trace ajout panier:', response.data))
        .catch(error => console.error('Erreur trace:', error));
    },
    applyFilters() {
      let filtered = [...this.products];

      // Filtre par nom (label)
      if (this.filterLabel) {
        filtered = filtered.filter(product =>
          product.label.toLowerCase().includes(this.filterLabel.toLowerCase())
        );
      }

      // Filtre par référence (label)
      if (this.filterRef) {
        filtered = filtered.filter(product =>
          product.label.toLowerCase().includes(this.filterRef.toLowerCase())
        );
      }

      // Filtre par catégorie
      if (this.filterCategory) {
        filtered = filtered.filter(product => {
          const category = this.categories.find(cat => cat.id === this.filterCategory);
          return category && product.category.includes(category.label);
        });
      }

      // Filtre par plage de prix
      if (this.filterPriceMin !== null && this.filterPriceMin >= 0) {
        filtered = filtered.filter(product => product.price >= this.filterPriceMin);
      }
      if (this.filterPriceMax !== null && this.filterPriceMax >= 0) {
        filtered = filtered.filter(product => product.price <= this.filterPriceMax);
      }

      // Tri par prix
      if (this.sortOrder) {
        filtered.sort((a, b) => {
          if (this.sortOrder === 'asc') {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        });
      }

      this.filteredProducts = filtered;
    },
    resetFilters() {
      this.filterLabel = '';
      this.filterRef = '';
      this.filterCategory = '';
      this.filterPriceMin = null;
      this.filterPriceMax = null;
      this.sortOrder = '';
      this.filteredProducts = [...this.products]; // Réinitialise la liste filtrée
    },
  },
};
</script>

<style scoped>
.product-list-page {
  background-color: #1e1e1e; /* Fond sombre pour donner une ambiance professionnelle */
  color: #fff; /* Texte blanc pour un bon contraste */
  padding: 40px;
  text-align: center;
}

h1 {
  font-size: 3em;
  color: #e08b0d; /* Couleur orange pour attirer l'attention */
  margin-bottom: 30px;
  font-family: 'Montserrat', sans-serif;
}

/* Styles pour la section de filtrage */
.filter-section {
  background-color: #2c2c2c;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.filter-section h2 {
  font-size: 1.8em;
  color: #e08b0d;
  margin-bottom: 20px;
}

.filter-group {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 200px;
}

.filter-item label {
  font-size: 1.1em;
  color: #fff;
  font-weight: 500;
}

.filter-item input,
.filter-item select {
  padding: 10px;
  font-size: 1em;
  border-radius: 8px;
  border: 1px solid #555;
  background-color: #333;
  color: #fff;
  transition: border-color 0.3s ease;
}

.filter-item input:focus,
.filter-item select:focus {
  outline: none;
  border-color: #e08b0d;
}

.price-range {
  align-items: center;
}

.price-inputs {
  display: flex;
  gap: 10px;
  align-items: center;
}

.price-inputs input {
  width: 100px;
}

.price-inputs span {
  color: #bbb;
}

.reset-btn {
  padding: 10px 20px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.reset-btn:hover {
  background-color: #e04343;
}

/* Styles pour la liste des produits */
.loading {
  font-size: 1.5em;
  color: #fff;
}

.error {
  color: red;
  font-size: 1.2em;
}

.no-results {
  font-size: 1.2em;
  color: #bbb;
}

.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}

.product {
  background-color: #2c2c2c; /* Carte sombre avec un léger contraste */
  border-radius: 12px;
  padding: 20px;
  max-width: 320px;
  min-height: 400px; /* Légère augmentation pour accueillir la catégorie */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* Ombre portée pour effet de profondeur */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product:hover {
  transform: translateY(-5px); /* Effet de survol pour la carte */
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4); /* Ombre plus accentuée lors du survol */
}

.product h2 {
  font-size: 1.6em;
  font-weight: 700;
  color: #e08b0d;
  margin-bottom: 10px;
  font-family: 'Montserrat', sans-serif;
}

.reference {
  font-size: 1.1em;
  color: #bbb;
  margin-bottom: 10px;
}

.category {
  font-size: 1.1em;
  color: #bbb;
  margin-bottom: 10px;
}

.category span {
  color: #e08b0d; /* Catégorie en orange pour correspondre au thème */
}

.price {
  font-size: 1.2em;
  font-weight: 600;
  margin-bottom: 20px;
}

.price span {
  color: #e08b0d; /* Prix en orange */
}

button {
  padding: 12px 25px;
  background-color: #e08b0d;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #c07a0c; /* Couleur plus foncée au survol pour le bouton */
}

.go-to-cart-btn {
  display: inline-block;
  margin-top: 40px;
  padding: 12px 25px;
  background-color: #e08b0d;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.2em;
  transition: background-color 0.3s ease;
}

.go-to-cart-btn:hover {
  background-color: #c07a0c; /* Couleur plus foncée au survol pour le bouton "Voir le Panier" */
}
</style>