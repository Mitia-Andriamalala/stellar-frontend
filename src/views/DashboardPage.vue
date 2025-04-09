<template>
  <div class="dashboard">
    <!-- Afficher le nom de l'utilisateur connecté -->
    <h1>Tableau de bord des ventes - Bienvenue, {{ userLogin || 'Utilisateur' }} !</h1>

    <!-- Statistiques rapides -->
    <div class="stats">
      <div class="stat-card">
        <h3>Total des ventes</h3>
        <p>{{ totalSales }} {{ currency }}</p>
      </div>
      <div class="stat-card">
        <h3>Commandes en cours</h3>
        <p>{{ pendingOrders }}</p>
      </div>
      <div class="stat-card">
        <h3>Montant payé</h3>
        <p>{{ totalPaid }} {{ currency }}</p>
      </div>
    </div>

    <!-- Graphiques -->
    <div class="charts">
      <div class="chart-container">
        <h3>Ventes par mois</h3>
        <BarChart :chart-data="salesChartData" :options="chartOptions" />
      </div>
      <div class="chart-container">
        <h3>Répartition des statuts</h3>
        <PieChart :chart-data="statusChartData" :options="chartOptions" />
      </div>
    </div>

    <!-- Section d'exportation -->
    <div class="export-section">
      <h3>Exporter les données</h3>
      <form @submit.prevent="exportData" class="export-form">
        <div class="form-group">
          <label>Champs à exporter :</label>
          <div class="checkbox-group">
            <label v-for="(field, key) in exportFields" :key="key">
              <input type="checkbox" v-model="selectedFields" :value="key" />
              {{ field.label }}
            </label>
          </div>
        </div>
        <div class="form-group">
          <label for="export-format">Format d'exportation :</label>
          <select id="export-format" v-model="exportFormat" required>
            <option value="csv">CSV</option>
            <option value="json">JSON</option>
            <option value="pdf">PDF</option>
          </select>
        </div>
        <button type="submit" :disabled="selectedFields.length === 0" class="export-btn">
          Exporter
        </button>
      </form>
    </div>

    <!-- Détails des ventes -->
    <div class="sales-details">
      <h3>Détails des ventes récentes</h3>
      <table>
        <thead>
          <tr>
            <th>Réf. Commande</th>
            <th>Total TTC</th>
            <th>Statut</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in recentOrders" :key="order.id">
            <td>{{ order.ref }}</td>
            <td>{{ order.total_ttc }} {{ order.currency }}</td>
            <td>{{ order.status }}</td>
            <td>{{ formatDate(order.date) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Bar as BarChart, Pie as PieChart } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
import { Parser } from '@json2csv/plainjs'; // Importer json2csv
import jsPDF from 'jspdf'; // Importer jsPDF

// Enregistrer les composants Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

export default {
  name: 'DashboardPage',
  components: {
    BarChart,
    PieChart
  },
  data() {
    return {
      orders: [],
      invoices: [],
      apiUrl: 'http://localhost/dolibarr-21.0.0/htdocs/api/index.php',
      apiToken: 'stellaradmin2025',
      currency: 'MGA',
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      userLogin: '',
      // Données pour l'exportation
      exportFields: {
        id: { label: 'ID', value: order => order.id },
        ref: { label: 'Référence', value: order => order.ref },
        total_ttc: { label: 'Total TTC', value: order => order.total_ttc },
        currency: { label: 'Devise', value: order => order.currency },
        status: { label: 'Statut', value: order => order.status },
        date: { label: 'Date', value: order => this.formatDate(order.date) },
        facture_id: { label: 'ID Facture', value: order => order.facture_id || 'N/A' }
      },
      selectedFields: [], // Champs sélectionnés pour l'exportation
      exportFormat: 'csv' // Format d'exportation par défaut
    };
  },
  computed: {
    totalSales() {
      return this.orders.reduce((sum, order) => sum + Number(order.total_ttc), 0).toLocaleString();
    },
    pendingOrders() {
      return this.orders.filter(order => order.status === 'Commande validée').length;
    },
    totalPaid() {
      return this.invoices
        .filter(invoice => invoice.paye === '1')
        .reduce((sum, invoice) => sum + Number(invoice.total_ttc), 0)
        .toLocaleString();
    },
    salesChartData() {
      const monthlySales = this.getMonthlySales();
      return {
        labels: Object.keys(monthlySales),
        datasets: [{
          label: 'Ventes mensuelles',
          backgroundColor: '#e08b0d',
          data: Object.values(monthlySales)
        }]
      };
    },
    statusChartData() {
      const statusCount = {
        'Commande validée': 0,
        'Facture créée': 0,
        'Paiement effectué': 0
      };
      this.orders.forEach(order => {
        if (order.status.startsWith('Facture créée')) statusCount['Facture créée']++;
        else statusCount[order.status]++;
      });
      return {
        labels: Object.keys(statusCount),
        datasets: [{
          data: Object.values(statusCount),
          backgroundColor: ['#ff6384', '#36a2eb', '#4bc0c0']
        }]
      };
    },
    recentOrders() {
      return this.orders.slice(0, 5); // 5 dernières commandes
    }
  },
  mounted() {
    // Récupérer le nom de l'utilisateur depuis localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.login) {
      this.userLogin = user.login;
    }

    // Charger les données du tableau de bord
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const ordersResponse = await axios.get(`${this.apiUrl}/orders`, {
          headers: { 'DOLAPIKEY': this.apiToken }
        });
        const invoicesResponse = await axios.get(`${this.apiUrl}/invoices`, {
          headers: { 'DOLAPIKEY': this.apiToken }
        });

        this.invoices = invoicesResponse.data;
        this.orders = ordersResponse.data.map(order => {
          const invoice = this.invoices.find(
            inv => inv.ref_client === order.ref_client && inv.total_ttc === order.total_ttc
          );
          return {
            id: order.id,
            ref: order.ref,
            total_ttc: order.total_ttc,
            currency: order.multicurrency_code || 'MGA',
            statut: Number(order.statut),
            status: this.getOrderStatus(order, invoice),
            date: order.date_commande,
            facture_id: invoice ? invoice.id : null
          };
        });
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
    getMonthlySales() {
      const monthlySales = {};
      this.orders.forEach(order => {
        const date = new Date(order.date_commande * 1000);
        const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
        monthlySales[monthYear] = (monthlySales[monthYear] || 0) + Number(order.total_ttc);
      });
      return monthlySales;
    },
    formatDate(timestamp) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString('fr-FR');
    },
    exportData() {
      if (this.selectedFields.length === 0) {
        alert('Veuillez sélectionner au moins un champ à exporter.');
        return;
      }

      // Préparer les données à exporter
      const dataToExport = this.orders.map(order => {
        const row = {};
        this.selectedFields.forEach(field => {
          row[field] = this.exportFields[field].value(order);
        });
        return row;
      });

      // Générer le nom du fichier
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `export-ventes-${timestamp}`;

      // Exporter selon le format choisi
      if (this.exportFormat === 'csv') {
        this.exportToCSV(dataToExport, filename);
      } else if (this.exportFormat === 'json') {
        this.exportToJSON(dataToExport, filename);
      } else if (this.exportFormat === 'pdf') {
        this.exportToPDF(dataToExport, filename);
      }
    },
    exportToCSV(data, filename) {
      const fields = this.selectedFields;
      const opts = { fields };
      try {
        const parser = new Parser(opts);
        const csv = parser.parse(data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', `${filename}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.error('Erreur lors de l\'exportation en CSV :', err);
      }
    },
    exportToJSON(data, filename) {
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', `${filename}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    exportToPDF(data, filename) {
      const doc = new jsPDF();
      let y = 10;

      // Ajouter un titre
      doc.setFontSize(16);
      doc.text('Exportation des ventes', 10, y);
      y += 10;

      // Ajouter les en-têtes
      doc.setFontSize(12);
      const headers = this.selectedFields.map(field => this.exportFields[field].label);
      headers.forEach((header, index) => {
        doc.text(header, 10 + index * 40, y);
      });
      y += 10;

      // Ajouter les données
      doc.setFontSize(10);
      data.forEach(row => {
        this.selectedFields.forEach((field, index) => {
          doc.text(String(row[field]), 10 + index * 40, y);
        });
        y += 10;
        if (y > 270) { // Passer à une nouvelle page si nécessaire
          doc.addPage();
          y = 10;
        }
      });

      // Télécharger le PDF
      doc.save(`${filename}.pdf`);
    }
  }
};
</script>

<style scoped>
.dashboard {
  background-color: #1d1c1b;
  color: #fff;
  padding: 40px 20px;
  min-height: 100vh;
}
h1 {
  font-size: 2.5em;
  color: #e08b0d;
  margin-bottom: 30px;
  text-align: center;
}
.stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;
}
.stat-card {
  background-color: #2c2c2c;
  padding: 20px;
  border-radius: 8px;
  width: 30%;
  text-align: center;
}
.stat-card h3 {
  color: #e08b0d;
  margin-bottom: 10px;
}
.charts {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}
.chart-container {
  width: 48%;
  background-color: #2c2c2c;
  padding: 20px;
  border-radius: 8px;
}
.chart-container h3 {
  color: #e08b0d;
  text-align: center;
  margin-bottom: 20px;
}
.sales-details {
  background-color: #2c2c2c;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 40px;
}
.sales-details h3 {
  color: #e08b0d;
  margin-bottom: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #444;
}
th {
  color: #e08b0d;
}

/* Styles pour la section d'exportation */
.export-section {
  background-color: #2c2c2c;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 40px;
}
.export-section h3 {
  color: #e08b0d;
  margin-bottom: 20px;
}
.export-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.form-group label {
  font-size: 1.1em;
  color: #fff;
}
.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #fff;
}
select {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #555;
  background-color: #333;
  color: #fff;
}
.export-btn {
  padding: 10px;
  background-color: #e08b0d;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.export-btn:disabled {
  background-color: #555;
  cursor: not-allowed;
}
.export-btn:not(:disabled):hover {
  background-color: #c07a0c;
}
</style>