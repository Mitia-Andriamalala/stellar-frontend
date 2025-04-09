import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/DashboardPage.vue';
import ProductList from '../views/ProductList.vue';
import LandingPage from '../views/LandingPage.vue';
import OrderConfirmation from '../views/OrderHistory.vue'; // Page de confirmation de commande
import CartPage from '../views/CartPage.vue'; // Page du panier
import CheckoutPage from '../views/CheckoutPage.vue'; // Page de validation de commande
import MyOrders from '../views/MyOrders.vue'; // Nouvelle page "Mes Commandes"
import RatePage from '../views/RatePage.vue'; //

const routes = [
  // Route pour le tableau de bord après connexion
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }, // Page protégée
  },

  // Route pour la liste des produits
  {
    path: '/products',
    name: 'products',
    component: ProductList,
    meta: { requiresAuth: true }, // Page protégée
  },

  // Route pour la page d'aperçu général
  {
    path: '/landing',
    name: 'landing',
    component: LandingPage,
  },

  // Route pour la confirmation de commande
  {
    path: '/order-history/:orderId',
    name: 'orderhistory',
    component: OrderConfirmation,
    meta: { requiresAuth: true }, // Page protégée
  },

  // Route pour le panier
  {
    path: '/cart',
    name: 'cart',
    component: CartPage,
    meta: { requiresAuth: true }, // Page protégée
  },

  // Route pour la validation de commande
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutPage,
    meta: { requiresAuth: true }, // Page protégée
  },
  {
    path: '/rate',
    name: 'rate',
    component: RatePage,
    meta: { requiresAuth: true }, // Page protégée
  },

  // Nouvelle route pour "Mes Commandes"
  {
    path: '/my-orders',
    name: 'myorders',
    component: MyOrders,
    meta: { requiresAuth: true }, // Page protégée
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Garde de navigation pour protéger les pages nécessitant une authentification
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (to.meta.requiresAuth && !user) {
    next('/'); // Redirige vers la page de login
  } else {
    next(); // Permet la navigation
  }
});

export default router;