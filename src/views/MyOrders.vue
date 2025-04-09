<!-- MyOrders.vue -->
<template>
    <div class="my-orders">
      <h1>Mes Commandes</h1>
      <button @click="fetchOrders" class="refresh-btn">Rafraîchir</button>
      <div v-if="orders.length === 0">Aucune commande pour le moment.</div>
      <ul v-else>
        <li v-for="order in orders" :key="order.id" class="order-item">
          <p>Commande #{{ order.ref }}</p>
          <p>Total: {{ order.total_ttc }} {{ order.currency }}</p>
          <p>Statut: {{ order.status }}</p>
          <button v-if="order.status === 'Commande validée'" @click="createInvoice(order.id)">Créer facture</button>
          <button v-if="order.status.startsWith('Facture créée')" @click="createPayment(order.id)">Enregistrer paiement</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'MyOrders',
    data() {
      return {
        orders: [],
        apiUrl: 'http://localhost/dolibarr-21.0.0/htdocs/api/index.php',
        apiToken: 'stellaradmin2025' // Ton token Dolibarr
      };
    },
    mounted() {
      this.fetchOrders();
    },
    methods: {
      async fetchOrders() {
        try {
          const ordersResponse = await axios.get(`${this.apiUrl}/orders`, {
            headers: { 'DOLAPIKEY': this.apiToken }
          });
          const invoicesResponse = await axios.get(`${this.apiUrl}/invoices`, {
            headers: { 'DOLAPIKEY': this.apiToken }
          });
  
          this.orders = ordersResponse.data.map(order => {
            const invoice = invoicesResponse.data.find(
              inv => inv.ref_client === order.ref_client && inv.total_ttc === order.total_ttc
            );
            const mappedOrder = {
              id: order.id,
              ref: order.ref,
              total_ttc: order.total_ttc,
              currency: order.multicurrency_code || 'MGA',
              statut: Number(order.statut),
              status: this.getOrderStatus(order, invoice),
              facture_id: invoice ? invoice.id : null,
              paid: order.billed === 1 || (invoice && invoice.paye === '1')
            };
            console.log(
              `Commande ${order.ref} - Statut: ${order.statut}, Invoice: ${JSON.stringify(invoice || 'aucune facture trouvée')}, Billed: ${order.billed}, Paye (facture): ${invoice?.paye}, Statut affiché: ${mappedOrder.status}`
            );
            return mappedOrder;
          });
          console.log('Réponse API complète (orders) :', ordersResponse.data);
          console.log('Réponse API complète (invoices) :', invoicesResponse.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des données :', error.response?.data || error);
        }
      },
      getOrderStatus(order, invoice) {
        const statut = Number(order.statut);
        if (statut === 0) return 'Brouillon';
        if (statut === 1 && !invoice) return 'Commande validée';
        if (invoice && order.billed !== 1 && invoice.paye !== '1') return `Facture créée avec la référence ${invoice.ref}`;
        if (order.billed === 1 || (invoice && invoice.paye === '1')) return 'Paiement effectué';
        return 'En attente';
      },
      async createInvoice(orderId) {
        try {
          const response = await axios.post(`${this.apiUrl}/invoices/fromorder/${orderId}`, {}, {
            headers: { 'DOLAPIKEY': this.apiToken }
          });
          console.log(`Facture créée pour ${orderId}, ID : ${response.data}`);
          await this.fetchOrders();
        } catch (error) {
          console.error('Erreur lors de la création de la facture :', error.response?.data || error);
          alert('Erreur lors de la création de la facture.');
        }
      },
      async createPayment(orderId) {
        try {
          const order = this.orders.find(o => o.id === orderId);
          if (!order.facture_id) {
            throw new Error('Aucune facture associée à cette commande.');
          }
          const paymentData = {
            facture_id: order.facture_id, // "5" pour IN2504-0001
            datepaye: Math.floor(Date.now() / 1000),
            amount: Number(order.total_ttc), // 6000000
            type: 'LIQ', // Espèce, comme dans ton règlement
            multicurrency_amount: Number(order.total_ttc),
            multicurrency_code: order.currency // "MGA"
          };
          const paymentResponse = await axios.post(`${this.apiUrl}/payments`, paymentData, {
            headers: {
              'DOLAPIKEY': this.apiToken,
              'Content-Type': 'application/json'
            }
          });
          console.log(`Paiement enregistré pour la facture ${order.facture_id}, ID paiement : ${paymentResponse.data}`);
          await this.fetchOrders();
        } catch (error) {
          console.error('Erreur lors de l’enregistrement du paiement :', error.response?.data || error);
          alert('Erreur lors de l’enregistrement du paiement : ' + (error.response?.data?.error?.message || error.message));
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .my-orders {
    background-color: #1d1c1b;
    color: #fff;
    padding: 40px 20px;
    min-height: 100vh;
    text-align: center;
  }
  h1 {
    font-size: 2.5em;
    color: #e08b0d;
    margin-bottom: 30px;
  }
  .refresh-btn {
    background-color: #e08b0d;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 20px;
  }
  .refresh-btn:hover {
    background-color: #c07a0c;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  .order-item {
    background-color: #2c2c2c;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    text-align: left;
  }
  button {
    background-color: #e08b0d;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  button:hover {
    background-color: #c07a0c;
  }
  </style>