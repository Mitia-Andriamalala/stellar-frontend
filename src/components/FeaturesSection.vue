<template>
  <div class="features-section">
    <img class="background-4" src="img/Rectangle 4.png" alt="Background" />
    <div class="features-title animate-fade-in">Caractéristiques</div>
    <img class="main-bike animate-bounce-in" src="img/Rectangle 25.png" alt="Main Bike" />

    <div class="features-content">
      <div class="feature-item animate-feature-item" v-observe-visibility="visibilityOptions">
        <img src="img/designDetails_Built2Last_HT-BR-NO-50-MT-TB-HKSL-HK-BL-HB.webp" alt="Built to Last" />
        <h3>PENSÉ POUR DURER</h3>
        <p>
          Un vélo n'est pas fait pour être jeté. Grâce à un cadre robuste en aluminium forgé en titane et des roulements gratuits à vie, nos vélos sont pensés pour durer.
        </p>
      </div>
      <div class="feature-item animate-feature-item" v-observe-visibility="visibilityOptions">
        <img src="img/DesignDetails_LongTrav_NO-MT-BU_fae5a5f1-b6c2-429c-b154-b4fe57e96d71.png" alt="Long Travel" />
        <h3>DÉBATTEMENT IMPORTANT</h3>
        <p>
          Fourche en 38mm et 170mm de débattement VPP™, compatible air ou ressort, pour explorer tous les spots sans se poser de questions.
        </p>
      </div>
      <div class="feature-item animate-feature-item" v-observe-visibility="visibilityOptions">
        <img src="img/designDetails_CC_V10-BU-ST-SK.png" alt="Carbon CC" />
        <h3>CARBONE CC</h3>
        <p>
          Peu de fabricants maîtrisent le carbone comme Stellar. Nos cadres, développés en Californie, sont fabriqués dans notre propre usine et garantis à vie.
        </p>
      </div>
      <div class="feature-item animate-feature-item" v-observe-visibility="visibilityOptions">
        <img src="img/DesignDetails_VPP_V10_95bcc99d-d9d7-4054-aa28-fefbf968dffa.png" alt="VPP" />
        <h3>VPP (Virtual Pivot Point)</h3>
        <p>
          208mm de débattement VPP™ parfaitement exploité, avec la facilité d'ajuster et d'entretenir en plus.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeaturesSection',
  data() {
    return {
      visibilityOptions: {
        callback: this.handleVisibility,
        intersection: { threshold: 0.3 }
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
.features-section {
  position: relative;
  width: 100%;
  padding: 60px 20px;
  box-sizing: border-box;
  overflow: hidden;
  background: #f5f7fa;
}

.background-4 {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
  z-index: -1;
  animation: parallax 25s infinite linear;
}

.features-title {
  font-family: "Montserrat-Bold", Helvetica;
  font-weight: 700;
  color: #e08b0d;
  font-size: 48px;
  text-align: center;
  margin-bottom: 40px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  position: relative;
}

.main-bike {
  display: block;
  margin: 0 auto 60px;
  max-width: 800px;
  width: 100%;
  height: auto;
  z-index: 1;
  position: relative;
  transition: transform 0.3s ease;
}

.features-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  z-index: 1;
  position: relative;
}

.feature-item {
  width: 280px;
  text-align: left;
  background: rgba(0, 0, 0, 0.4);
  padding: 20px;
  border-radius: 10px;
  box-sizing: border-box;
  opacity: 0;
  transform: translateY(50px);
  transition: transform 0.4s ease, opacity 0.4s ease, background 0.3s ease, box-shadow 0.3s ease;
}

.feature-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.feature-item:hover {
  background: rgba(0, 0, 0, 0.6);
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.feature-item img {
  width: 100%;
  height: auto;
  object-fit: contain;
  margin-bottom: 10px;
  transition: transform 0.3s ease;
}

.feature-item:hover img {
  transform: scale(1.05);
}

.feature-item h3 {
  font-family: "Montserrat-Bold", Helvetica;
  font-size: 18px;
  color: #e08b0d;
  margin-bottom: 10px;
}

.feature-item p {
  font-family: "Montserrat-Regular", Helvetica;
  font-size: 16px;
  color: #ffffff;
  line-height: 1.5;
}

/* Animations */
@keyframes parallax {
  0% { background-position: 0 0; }
  100% { background-position: 150px 0; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes bounceIn {
  0% { transform: scale(0.9); opacity: 0; }
  60% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); }
}

@keyframes featureItemEnter {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 1s ease-in forwards;
}

.animate-bounce-in {
  animation: bounceIn 1s ease-out forwards;
}

.animate-feature-item {
  animation: featureItemEnter 0.8s ease-out;
  animation-fill-mode: both;
}

/* Responsive */
@media (max-width: 768px) {
  .features-title {
    font-size: 36px;
  }

  .main-bike {
    max-width: 100%;
    margin-bottom: 40px;
  }

  .feature-item {
    width: 100%;
  }
}
</style>