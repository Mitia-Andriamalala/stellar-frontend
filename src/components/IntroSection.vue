<template>
  <div class="intro-section">
    <img class="back" src="/img/Rectangle 6.png" alt="Background" />
    <img class="re-image" src="/img/Rectangle 7.png" alt="Overlay Image" />

    <!-- Nouveau logo image à la place du texte -->
    <img class="stellar-z-image" src="/img/stellar.svg" alt="Stellar Z Logo" />

    <p class="intro-text">
      Découvrez une nouvelle dimension du VTT avec le VTT Gravity, le modèle innovant conçu pour les
      aventures extrêmes
    </p>

    <div class="frame"></div>
  </div>
</template>

<script>
export default {
  name: 'IntroSection'
};
</script>

<style scoped>
.intro-section {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.back {
  position: absolute;
  width: 120%;
  height: 100%;
  top: 0;
  left: -4%;
  object-fit: cover;
  z-index: 0;
}

.re-image {
  position: absolute;
  height: 110%;
  right: -5%;
  top: -5%;
  object-fit: cover;
  z-index: 1;
}

/* 👇 Nouveau style pour l'image "Stellar Z" */
.stellar-z-image {
  position: absolute;
  top: 200px;
  left: 80px;
  width: 600px;
  height: auto;
  z-index: 2;
}

.intro-text {
  position: absolute;
  top: 480px;
  left: 80px;
  width: 520px;
  font-family: "Hector-Regular", Helvetica;
  color: #e08b0d;
  font-size: 22px;
  line-height: 1.5;
  z-index: 2;
}

.frame {
  position: absolute;
  top: 640px;
  left: 80px;
  width: 260px;
  height: 80px;
  background-image: url('@/assets/img/Groupe20.svg');
  background-size: 100% 100%;
  cursor: pointer;
  z-index: 2;
  transition: transform 0.3s ease;
}

.frame:hover {
  transform: scale(1.05);
}

/* ---------- RESPONSIVE ZONE ---------- */
@media (max-width: 1024px) {
  .stellar-z-image {
    width: 350px;
    top: 80px;
    left: 40px;
  }

  .intro-text {
    font-size: 18px;
    width: 90%;
    left: 40px;
    top: 360px;
  }

  .frame {
    width: 200px;
    height: 70px;
    top: 500px;
    left: 40px;
  }

  .re-image {
    height: 120%;
    right: -10%;
    top: -10%;
  }
}

@media (max-width: 768px) {
  .stellar-z-image {
    width: 250px;
    top: 60px;
    left: 20px;
  }

  .intro-text {
    font-size: 16px;
    top: 280px;
    left: 20px;
    width: 90%;
  }

  .frame {
    top: 420px;
    left: 20px;
    width: 180px;
    height: 60px;
  }

  .re-image {
    height: 130%;
    right: -20%;
    top: -15%;
  }
}

@media (max-width: 480px) {
  .stellar-z-image {
    width: 180px;
    top: 40px;
    left: 16px;
  }

  .intro-text {
    font-size: 14px;
    top: 220px;
    left: 16px;
    width: 90%;
  }

  .frame {
    top: 340px;
    left: 16px;
    width: 150px;
    height: 50px;
  }

  .re-image {
    height: 150%;
    right: -25%;
    top: -20%;
  }
}
</style>
