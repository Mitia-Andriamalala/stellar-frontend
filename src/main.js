import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Assure-toi d'importer le routeur ici

createApp(App)
  .use(router) // Utilise le routeur
  .mount('#app') // Monte l'application sur l'élément HTML avec l'id 'app'
