<template>
  <section class="brand-section">
    <img class="background-2" src="@/assets/img/Rectangle4.png" alt="Fond présentation Stellar" />

    <!-- TITRE PRINCIPAL (SEO H1) -->
    <h1 class="presentation-marque animate-fade-in">Présentation Marque</h1>

    <!-- H2 + Paragraphe -->
    <h2 class="welcome-text animate-slide-up">Bienvenue dans l’univers Stellar.</h2>
    <p class="stellar-revolution animate-slide-up">Stellar révolutionne l'univers du vélo tout terrain.</p>

    <!-- Texte descriptif -->
    <p class="objectif animate-slide-up">
      <span class="text-wrapper-6">Notre objectif : offrir </span>
      <span class="text-wrapper-7 animate-text-highlight">légèreté</span>
      <span class="text-wrapper-6">, </span>
      <span class="text-wrapper-7 animate-text-highlight">robustesse</span>
      <span class="text-wrapper-6">, </span>
      <span class="text-wrapper-7 animate-text-highlight">audace</span>
      <span class="text-wrapper-6">, </span>
      <span class="text-wrapper-7 animate-text-highlight">innovation</span>
      <span class="text-wrapper-6"> et </span>
      <span class="text-wrapper-7 animate-text-highlight">puissance</span>
      <span class="text-wrapper-6">
        . Avec StellarZ, notre produit phare, découvrez l’excellence absolue et une technologie avant-gardiste jamais vue auparavant.
      </span>
    </p>

    <!-- SECTION 1 -->
    <article class="section-block animate-section-block" v-observe-visibility="visibilityOptions">
      <div class="text-content">
        <h3 class="text-wrapper-8">UNE RÉFÉRENCE TOUT TERRAIN</h3>
        <p class="pour-les-sorties">
          Pour les sorties épiques ou celles qui sont plus classiques, un vélo se doit d'être parfaitement équilibré pour affronter tous les terrains, tant dans son débattement que par sa géométrie.
          Si vous ne cherchez pas à aller dans les extrêmes, mais cherchez un vélo extrêmement efficace, le Hightower est fait pour vous.
        </p>
      </div>
      <img class="hightower-img" src="img/Hightower_M3_8733.png" alt="Vélo Hightower Stellar Z tout terrain" />
    </article>

    <!-- SECTION 2 -->
    <article class="section-block lower animate-section-block" v-observe-visibility="visibilityOptions">
      <div class="text-content">
        <h3 class="text-wrapper-9">UN VRAI VTT, EN TOUTE MODERNITÉ</h3>
        <p class="avec-un-caract-re-la">
          Avec un caractère à la hauteur de ses ambitions, le Stellar Z et ses 150mm de débattement VPP™ apporte une suspension active et toute l'adhérence dont vous aurez besoin.
          Ce parfait équilibre en terme de débattement et de géométrie le rend efficace et confortable sur tous types de terrain.
        </p>
      </div>
      <img class="hightower-img" src="img/Hightower_M3_9692.png" alt="Vélo Stellar Z moderne et performant" />
    </article>
  </section>
</template>

<script>
export default {
  name: 'BrandSection',
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
.brand-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding-bottom: 100px;
  overflow: hidden;
  font-family: 'Montserrat', sans-serif;
  background: #f5f7fa;
}

.background-2 {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
  z-index: 0;
  animation: parallax 20s infinite linear;
}

.presentation-marque {
  position: absolute;
  max-width: 90%;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 700;
  color: #e08b0d;
  font-size: 64px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.welcome-text,
.stellar-revolution,
.objectif {
  position: relative;
  z-index: 1;
  top: 80px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  color: #ffffff;
}

.welcome-text {
  font-size: 36px;
  margin-top: 160px;
}

.stellar-revolution {
  font-size: 32px;
  margin-top: 20px;
}

.objectif {
  font-size: 26px;
  margin-top: 20px;
  transition: opacity 0.5s ease;
}

.text-wrapper-6 {
  color: #ffffff;
}

.text-wrapper-7 {
  color: #e08b0d;
  font-weight: 600;
}

.animate-text-highlight {
  display: inline-block;
  transition: transform 0.3s ease, color 0.3s ease;
}

.animate-text-highlight:hover {
  transform: scale(1.1);
  color: #c07a0c;
}

.section-block {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 120px;
  padding: 20px 120px;
  gap: 40px;
  z-index: 1;
  position: relative;
  opacity: 0;
  transform: translateY(50px);
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.section-block.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-block.lower {
  margin-top: 60px;
}

.text-content {
  flex: 1;
  max-width: 600px;
  color: #ffffff;
}

.text-wrapper-8,
.text-wrapper-9 {
  font-weight: 700;
  font-size: 28px;
  color: #e08b0d;
  margin-bottom: 20px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}

.pour-les-sorties,
.avec-un-caract-re-la {
  font-size: 18px;
  line-height: 1.5;
  color: #ffffff;
}

.hightower-img {
  flex-shrink: 0;
  width: 500px;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  z-index: 1;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.hightower-img:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
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

@keyframes slideUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 1s ease-in forwards;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out forwards;
}

.animate-section-block {
  animation: slideUp 0.8s ease-out;
  animation-fill-mode: both;
}

/* Responsive */
@media (max-width: 768px) {
  .section-block {
    flex-direction: column;
    padding: 20px;
    align-items: center;
    text-align: center;
  }

  .hightower-img {
    width: 90%;
    margin-top: 20px;
  }

  .presentation-marque {
    font-size: 42px;
  }

  .welcome-text {
    font-size: 24px;
  }

  .stellar-revolution,
  .objectif {
    font-size: 20px;
  }
}
</style>