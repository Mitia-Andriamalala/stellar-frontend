<template>
    <div class="order-confirmation">
      <h1>Merci pour votre achat !</h1>
      <p>Votre commande a été confirmée avec succès. Voici les détails :</p>
  
      <!-- Résumé de la commande -->
      <div class="order-summary">
        <h2>Numéro de commande: {{ orderId }}</h2>
        <div v-for="(product, index) in cart" :key="index" class="order-item">
          <p>{{ product.name }} x {{ product.quantity }}</p>
          <p class="price">Prix: €{{ Number(product.price).toFixed(2) }}</p>
        </div>
        <div class="total">
          <h3>Total: €{{ totalAmount.toFixed(2) }}</h3>
        </div>
      </div>
  
      <p>Nous vous enverrons un email de confirmation sous peu.</p>
  
      <!-- Boutons d'action -->
      <div class="action-buttons">
        <router-link to="/dashboard" class="button">Retour au tableau de bord</router-link>
        <router-link to="/products" class="button">Continuer à acheter</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'OrderConfirmation',
    data() {
      return {
        orderId: this.generateOrderId(),
        cart: [],
      };
    },
    computed: {
      totalAmount() {
        return this.cart.reduce((total, product) => total + (product.price * product.quantity), 0);
      },
    },
    mounted() {
      this.loadCart();
    },
    methods: {
      // Charger la dernière commande depuis le localStorage
      loadCart() {
        const lastOrder = JSON.parse(localStorage.getItem('lastOrder')) || [];
        this.cart = lastOrder;
      },
  
      // Générer un ID de commande fictif
      generateOrderId() {
        return Math.floor(Math.random() * 1000000);
      },
    },
  };
  </script>
  
  <style scoped>
  .order-confirmation {
    background-color: #1d1c1b;
    color: #fff;
    padding: 40px 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 100vh;
  }
  
  h1 {
    font-size: 2.5em;
    color: #e08b0d;
    margin-bottom: 30px;
  }
  
  .order-summary {
    margin-bottom: 30px;
  }
  
  .order-item {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .price {
    font-weight: bold;
    color: #e08b0d;
  }
  
  .total h3 {
    font-size: 22px;
    color: #e08b0d;
    margin-top: 10px;
  }
  
  .action-buttons {
    margin-top: 30px;
  }
  
  .button {
    padding: 12px 25px;
    background-color: #e08b0d;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    margin: 10px;
    font-size: 1.2em;
  }
  
  .button:hover {
    background-color: #c07a0c;
  }
  
  @media (max-width: 768px) {
    h1 {
      font-size: 2em;
    }
    .order-summary {
      margin-top: 20px;
    }
  }
  </style>
  