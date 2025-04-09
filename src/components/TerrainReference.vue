<template>
  <section class="terrain-section">
    <img class="background-3" src="img/Rectangle 4.png" alt="Fond VTT Stellar Z" />

    <div class="content-container">
      <h2 class="text-wrapper-10 animate-fade-in">Produit phare</h2>
      <h3 class="text-wrapper-11 animate-slide-up">STELLAR Z : Le Produit Phare de STELLAR</h3>
      <h4 class="text-wrapper-12 animate-slide-up">Description :</h4>

      <article class="avec-stellar-z-nous animate-slide-up" v-observe-visibility="visibilityOptions">
        <p class="avec-stellarz-nous-d">
          <span class="text-wrapper-6">Avec Stellar</span>
          <span class="text-wrapper-7 animate-text-highlight">Z</span>
          <span class="text-wrapper-6">
            , nous définissons un nouveau standard. Grâce à des matériaux innovants comme la fibre
            de carbone et une technologie de pointe, ce produit phare se distingue par ses performances
            exceptionnelles et sa robustesse incomparable.
          </span>
        </p>
      </article>

      <!-- CTA -->
      <div class="cta-group left animate-slide-up" v-observe-visibility="visibilityOptions">
        <div class="div-wrapper animate-pulse" role="button" aria-label="Prendre rendez-vous">
          <div class="text-wrapper-13">Prendre rdv</div>
        </div>
      </div>

      <!-- Description Gravity -->
      <p class="d-couvrez-notre-mod animate-slide-up" v-observe-visibility="visibilityOptions">
        <span class="text-wrapper-14">Découvrez notre modèle innovant : le </span>
        <span class="text-wrapper-15 animate-text-highlight">VTT </span>
        <span class="text-wrapper-14">Gravity</span>
      </p>

      <p class="le-VTT-gravity-est animate-slide-up" v-observe-visibility="visibilityOptions">
        <span class="text-wrapper-6">Le </span>
        <span class="text-wrapper-16 animate-text-highlight">VTT </span>
        <span class="text-wrapper-6">Gravity est une variation exceptionnelle de Stellar </span>
        <span class="text-wrapper-7 animate-text-highlight">Z</span>
        <span class="text-wrapper-6">
          , offrant des caractéristiques uniques telles que sa structure ultra-légère en fibre de carbone et
          un système de propulsion révolutionnaire qui garantit des performances supérieures de 15%
        </span>
      </p>

      <!-- Image Gravity -->
      <img class="my-hightower animate-bounce-in" src="img/MY25_Hightower_Angled_green.png" alt="VTT Stellar Gravity modèle vert" v-observe-visibility="visibilityOptions" />

      <!-- CTA -->
      <div class="cta-group right animate-slide-up" v-observe-visibility="visibilityOptions">
        <div class="essayez-le-VTT-wrapper animate-pulse" role="button" aria-label="Essayer le VTT Gravity">
          <p class="essayez-le-VTT">Essayez le VTT Gravity</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TerrainReference',
  data() {
    return {
      visibilityOptions: {
        callback: this.handleVisibility,
        intersection: { threshold: 0.2 }
      }
    };
  },
  methods: {
    handleVisibility(isVisible, entry) {
      if (isVisible) {
        entry.target.classList.add('visible');
      }
    }
  }
};
</script>

<style scoped>
.terrain-section {
  position: relative;
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  z-index: 1;
  font-family: 'Montserrat', sans-serif;
  background: #f5f7fa;
}

.background-3 {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
  z-index: -1;
  animation: parallax 20s infinite linear;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 1;
}

.text-wrapper-10 {
  font-weight: 700;
  font-size: 64px;
  color: #e08b0d;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.text-wrapper-11 {
  font-weight: 600;
  font-size: 28px;
  color: #ffffff;
  margin-bottom: 20px;
}

.text-wrapper-12 {
  font-weight: 700;
  font-size: 24px;
  color: #e08b0d;
  margin-bottom: 10px;
}

.avec-stellarz-nous-d {
  font-size: 18px;
  line-height: 1.6;
  color: #ffffff;
  margin-bottom: 30px;
}

.text-wrapper-6 {
  color: #ffffff;
}

.text-wrapper-7,
.text-wrapper-15,
.text-wrapper-16 {
  color: #e08b0d;
  font-weight: bold;
}

.animate-text-highlight {
  display: inline-block;
  transition: transform 0.3s ease, color 0.3s ease;
}

.animate-text-highlight:hover {
  transform: scale(1.1);
  color: #c07a0c;
}

.cta-group {
  margin: 30px 0;
  display: flex;
  width: 100%;
  opacity: 0;
  transform: translateY(50px);
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.cta-group.visible {
  opacity: 1;
  transform: translateY(0);
}

.cta-group.left {
  justify-content: flex-start;
}

.cta-group.right {
  justify-content: flex-end;
}

.div-wrapper,
.essayez-le-VTT-wrapper {
  background-color: #e08b0d;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.div-wrapper:hover,
.essayez-le-VTT-wrapper:hover {
  background-color: #c77400;
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.text-wrapper-13,
.essayez-le-VTT {
  font-weight: 700;
  font-size: 18px;
  color: #ffffff;
  margin: 0;
}

.d-couvrez-notre-mod {
  font-size: 20px;
  color: #ffffff;
  margin: 30px 0 10px;
  opacity: 0;
  transform: translateY(50px);
  transition: transform 4s ease, opacity 4s ease;
}

.d-couvrez-notre-mod.visible {
  opacity: 1;
  transform: translateY(0);
}

.le-VTT-gravity-est {
  font-size: 18px;
  line-height: 1.6;
  color: #ffffff;
  margin-bottom: 30px;
  opacity: 0;
  transform: translateY(50px);
  transition: transform 1s ease, opacity 4s ease;
}

.le-VTT-gravity-est.visible {
  opacity: 7;
  transform: translateY(0);
}

.my-hightower {
  width: 600px;
  max-width: 100%;
  height: auto;
  display: block;
  margin: 40px auto;
  opacity: 0;
  transform: translateY(20px);
  transition: transform 0.4s ease, opacity 0.4s ease, box-shadow 0.4s ease, filter 0.4s ease;
}

.my-hightower.visible {
  opacity: 1;
  transform: translateY(0);
}

.my-hightower:hover {
  transform: translateY(-10px);
  opacity: 0.95;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
  filter: brightness(1.1);
}

/* Animations */
@keyframes parallax {
  0% { background-position: 0 0; }
  100% { background-position: 150px 0; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 4; }
}

@keyframes slideUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}



@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.animate-fade-in {
  animation: fadeIn 1s ease-in forwards;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out forwards;
}

.animate-bounce-in {
  animation: bounceIn 1s ease-out forwards;
}

.animate-pulse {
  animation: pulse 2s infinite ease-in-out;
}

/* Responsive */
@media screen and (max-width: 768px) {
  .cta-group.left,
  .cta-group.right {
    justify-content: center;
  }

  .text-wrapper-10 {
    font-size: 36px;
  }

  .text-wrapper-11,
  .text-wrapper-12 {
    font-size: 20px;
  }

  .d-couvrez-notre-mod,
  .le-VTT-gravity-est {
    font-size: 16px;
  }

  .div-wrapper,
  .essayez-le-VTT-wrapper {
    padding: 10px 20px;
  }

  .my-hightower {
    width: 100%;
  }
}
</style>