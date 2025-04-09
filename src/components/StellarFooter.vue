<template>
    <footer class="w-full bg-[#e08b0d] text-white px-6 py-10 flex flex-col md:flex-row md:justify-between items-start md:items-center">
      <!-- Texte gauche -->
      <div class="flex-1 space-y-2">
        <p class="text-2xl font-extrabold tracking-wide uppercase">
          <span class="text-black">STELLAR Z</span> – L’avenir du VTT high-tech
        </p>
        <p class="font-medium text-sm">Téléphone : <span class="font-semibold text-black">01 22 86 34 89</span></p>
        <p class="font-medium text-sm">Email : <span class="font-semibold text-black">contact@stellar.com</span></p>
      </div>
  
      <!-- Réseaux sociaux -->
      <div class="flex flex-col items-start md:items-end">
        <span class="text-sm font-semibold mb-2">Suivez-nous</span>
        <div class="flex gap-3 items-center">
          <a href="#" aria-label="Facebook">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" class="icon-img" alt="Facebook" />
          </a>
          <a href="#" aria-label="Instagram">
            <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" class="icon-img" alt="Instagram" />
          </a>
          <a href="#" aria-label="Twitter">
            <img src="@/assets/img/Tracé 96.png" class="icon-img" alt="Twitter" />
          </a>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  // No JS needed
  </script>
  
  <style scoped>
  .icon-img {
    width: 28px;
    height: 28px;
    object-fit: contain;
    transition: transform 0.2s ease;
  }
  
  .icon-img:hover {
    transform: scale(1.1);
  }
  
  footer p,
  footer span {
    font-family: 'Montserrat', sans-serif;
  }
  </style>
  