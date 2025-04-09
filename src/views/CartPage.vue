<template>
  <div class="cart-page">
    <h1>Panier Stellar</h1>
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Votre panier est vide.</p>
      <router-link to="/products" class="link-product">Voir les produits</router-link>
    </div>
    <div v-else class="cart-items">
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <div class="item-details">
          <div class="item-info">
            <h3>{{ item.label }}</h3>
            <p class="price">Prix: {{ Number(item.price).toFixed(2) }} MGA</p>
            <div class="quantity">
              <label>Quantité:</label>
              <input type="number" v-model="item.quantity" min="1" @change="updateCart" />
            </div>
          </div>
        </div>
        <button class="remove-item" @click="removeFromCart(item.id)">Supprimer</button>
      </div>
      <div class="cart-summary">
        <p>Total: {{ totalPrice.toFixed(2) }} MGA</p>
        <button @click="validateOrder" class="checkout-btn">Passer à la caisse</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CartPage',
  data() {
    return {
      cartItems: [],
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
    },
  },
  mounted() {
    this.loadCart();
  },
  methods: {
    loadCart() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      this.cartItems = cart;
    },
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    },
    updateCart() {
      this.saveCart();
    },
    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter(item => item.id !== productId);
      this.saveCart();
    },
    validateOrder() {
      // Préparer les données pour la trace
      const orderData = {
        cart: this.cartItems.map(item => ({
          ref: item.ref,
          label: item.label,
          quantity: item.quantity,
          price: item.price,
        })),
        total: this.totalPrice,
        timestamp: new Date().toISOString(),
      };

      // Trace dans Dolibarr (commande brouillon)
      axios.post('http://localhost/dolibarr-21.0.0/htdocs/custom/stellarimport/create_order.php', orderData)
        .then(response => {
          console.log('Commande brouillon créée:', response.data);
          localStorage.setItem('lastOrder', JSON.stringify(this.cartItems));
          this.cartItems = [];
          localStorage.removeItem('cart');
          this.$router.push('/checkout');
        })
        .catch(error => {
          console.error('Erreur création commande:', error);
          alert('Commande simulée enregistrée malgré une erreur de trace.');
          localStorage.setItem('lastOrder', JSON.stringify(this.cartItems));
          this.cartItems = [];
          localStorage.removeItem('cart');
          this.$router.push('/checkout');
        });
    },
  },
};
</script>
  
  <style scoped>
  .cart-page {
    background-color: #1D1C1B; /* Fond sombre */
    color: #fff; /* Texte blanc pour le contraste */
    padding: 30px;
    text-align: center;
    min-height: 100vh; /* Assure que la page prend toute la hauteur */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  
  h1 {
    font-size: 2.5em;
    color: #e08b0d; /* Utilisation de l'orange pour attirer l'attention sur le titre */
    margin-bottom: 30px;
    font-family: 'Montserrat', sans-serif;
  }
  
  .empty-cart {
    text-align: center;
    margin-top: 20px;
  }
  
  .cart-items {
    margin-top: 30px;
    flex-grow: 1; /* Permet au conteneur de s'étendre */
  }
  
  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #333;
    padding: 15px 0;
    margin-bottom: 20px;
    background-color: #2c2c2c; /* Fond gris pour les éléments du panier */
    border-radius: 8px;
  }
  
  .item-details {
    display: flex;
    align-items: center;
  }
  
  .item-info {
    text-align: left;
    flex-grow: 1;
  }
  
  .price {
    font-weight: bold;
    color: #e08b0d; /* Orange pour faire ressortir le prix */
  }
  
  .quantity {
    margin-top: 10px;
  }
  
  .remove-item {
    background-color: #ff4d4d;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .remove-item:hover {
    background-color: #ff3333; /* Effet de survol pour le bouton de suppression */
  }
  
  .cart-summary {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    border-top: 2px solid #333;
    padding-top: 20px;
  }
  
  .checkout-btn {
    padding: 12px 25px;
    background-color: #e08b0d;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-size: 1.1em;
    transition: background-color 0.3s ease;
  }
  
  .checkout-btn:hover {
    background-color: #c07a0c; /* Plus foncé au survol */
  }
  
  /* Responsive design */
  @media (max-width: 768px) {
    .cart-item {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .item-details {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .remove-item {
      width: 100%;
      margin-top: 10px;
    }
  }
  </style>
  