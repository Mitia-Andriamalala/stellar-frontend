<template>
  <div class="checkout-page">
    <h1>Passer à la commande</h1>
    <div class="order-summary">
      <h2>Résumé de la commande</h2>
      <div v-for="product in cart" :key="product.id" class="order-item">
        <p>{{ product.label }} x {{ product.quantity }}</p>
        <p class="price">Prix: {{ Number(product.price).toFixed(2) }} MGA</p>
      </div>
      <div class="total">
        <h3>Total: {{ totalAmount.toFixed(2) }} MGA</h3>
      </div>
    </div>
    <form @submit.prevent="submitPayment" class="payment-form">
      <div class="form-group">
        <label for="name">Nom complet</label>
        <input type="text" id="name" v-model="name" required placeholder="Votre nom complet" />
      </div>
      <div class="form-group">
        <label for="card">Numéro de carte</label>
        <input type="text" id="card" v-model="cardNumber" required placeholder="XXXX-XXXX-XXXX-XXXX" />
      </div>
      <div class="form-group">
        <label for="expiration">Date d'expiration</label>
        <input type="month" id="expiration" v-model="expiration" required />
      </div>
      <div class="form-group">
        <label for="cvv">CVV</label>
        <input type="text" id="cvv" v-model="cvv" required placeholder="XXX" />
      </div>
      <button type="submit" :disabled="submittingPayment">
        {{ submittingPayment ? 'Traitement...' : 'Confirmer la commande' }}
      </button>
    </form>
    <div v-if="paymentSuccess" class="payment-success">
      <h2>Votre commande a été confirmée !</h2>
      <p>Merci pour votre achat ! Consultez Dolibarr pour les détails.</p>
      <router-link to="/products">Retour aux produits</router-link>
    </div>
    <div v-if="paymentError" class="payment-error">
      <h2>Une erreur est survenue</h2>
      <p>{{ paymentError }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CheckoutPage',
  data() {
    return {
      cart: [],
      name: 'Lucifer Informatique',
      cardNumber: '4242-4242-4242-4242',
      expiration: '2025-12',
      cvv: '123',
      submittingPayment: false,
      paymentSuccess: false,
      paymentError: '',
    };
  },
  computed: {
    totalAmount() {
      return this.cart.reduce((total, product) => total + Number(product.price) * product.quantity, 0);
    },
  },
  mounted() {
    this.loadCart();
  },
  methods: {
    loadCart() {
      const lastOrder = JSON.parse(localStorage.getItem('lastOrder')) || [];
      this.cart = lastOrder;
    },
    async submitPayment() {
      this.submittingPayment = true;
      this.paymentError = '';

      // Simulation de paiement
      await new Promise(resolve => setTimeout(resolve, 2000));
      this.paymentSuccess = true;

      // Trace finale dans Dolibarr
      axios.post('http://localhost/dolibarr-21.0.0/htdocs/custom/stellarimport/log_action.php', {
        action: 'order_confirmed',
        total: this.totalAmount,
        items: this.cart.map(item => `${item.label} (x${item.quantity})`),
        timestamp: new Date().toISOString(),
      })
        .then(response => console.log('Trace confirmation:', response.data))
        .catch(error => console.error('Erreur trace:', error));

      this.submittingPayment = false;
    },
  },
};
</script>
  
  <style scoped>
  .checkout-page {
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
  
  .payment-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
    width: 100%;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 100%;
  }
  
  .form-group label {
    font-size: 16px;
    margin-bottom: 10px;
    color: #fff;
  }
  
  .form-group input {
    padding: 12px;
    font-size: 16px;
    border-radius: 10px;
    border: 2px solid #ccc;
    background-color: #333;
    color: #fff;
    margin-bottom: 10px;
  }
  
  button {
    padding: 12px 25px;
    background-color: #e08b0d;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1.2em;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  button:hover:not(:disabled) {
    background-color: #c07a0c;
  }
  
  .payment-success,
  .payment-error {
    margin-top: 20px;
    font-size: 18px;
    color: #e08b0d;
  }
  
  .payment-error {
    color: red;
  }
  
  @media (max-width: 768px) {
    h1 {
      font-size: 2em;
    }
    .payment-form {
      width: 100%;
    }
  }
  </style>
  