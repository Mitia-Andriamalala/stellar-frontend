<template>
  <section class="other-products">
    <h2 class="text-wrapper-25">Autres Produits Stellar</h2>
    <p class="text-wrapper-26">Découvrez la gamme STELLAR</p>

    <div class="product-list">
      <!-- SB160 -->
      <article class="product-card">
        <img
          src="img/MY24_5010_C_S_GlossBlack_2e6ed078-a723-4cef-b936-19232630fd6b.png"
          alt="Vélo tout terrain Stellar SB160"
          class="bike-image"
        />
        <h3 class="text-wrapper-28">Stellar SB160</h3>
        <div class="groupe-2">
          <div class="overlap-2" role="button" aria-label="Découvrir le SB160">
            <span class="text-wrapper-27">Découvrir</span>
          </div>
        </div>
      </article>

      <!-- ARC -->
      <article class="product-card">
        <img
          src="img/MY25_Bronson_C_R_Kalimotxo_4e6cdac2-f7f1-4346-b236-b33227483e89.png"
          alt="Vélo tout terrain Stellar ARC"
          class="bike-image"
        />
        <h3 class="stellar">Stellar ARC</h3>
        <div class="groupe-3">
          <div class="overlap-3" role="button" aria-label="Découvrir le ARC">
            <span class="text-wrapper-27">Découvrir</span>
          </div>
        </div>
      </article>

      <!-- R25 -->
      <article class="product-card">
        <img
          src="img/MY25_Hightower_CC_X0_AXS_RSV_GlossDayGreen_3ca2f549-e0ea-4c74-9069-7b573166f9a1.png"
          alt="Vélo tout terrain Stellar R25"
          class="bike-image"
        />
        <h3 class="stellar-sb">Stellar R25</h3>
        <div class="groupe-3">
          <div class="overlap-3" role="button" aria-label="Découvrir le R25">
            <span class="text-wrapper-27">Découvrir</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AutresProduitsStellar'
};
</script>

<style scoped>
.other-products {
  text-align: center;
  padding: 60px 20px;
  background-image: url('@/assets/img/Rectangle4.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  font-family: 'Montserrat', sans-serif; /* ✅ GLOBAL FONT */
}

.text-wrapper-25 {
  font-weight: 700;
  font-size: 42px;
  color: #e08b0d;
  margin-bottom: 10px;
}

.text-wrapper-26 {
  font-weight: 400;
  font-size: 20px;
  color: #ffffff;
  margin-bottom: 40px;
}

.product-list {
  display: flex;
  justify-content: center;
  gap: 60px;
  flex-wrap: wrap;
}

.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  width: 100%;
}

.bike-image {
  width: 100%;
  height: auto;
  transition: transform 0.3s ease;
}

.bike-image:hover {
  transform: scale(1.05);
}

.text-wrapper-28,
.stellar,
.stellar-sb {
  font-weight: 600;
  font-size: 20px;
  color: #ffffff;
  margin-top: 20px;
  margin-bottom: 12px;
}

.groupe-2,
.groupe-3 {
  display: flex;
  justify-content: center;
}

.overlap-2,
.overlap-3 {
  background-color: #e08b0d;
  padding: 10px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.overlap-2:hover,
.overlap-3:hover {
  background-color: #ff9d1a;
}

.text-wrapper-27 {
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;
}

/* ✅ Responsive */
@media (max-width: 768px) {
  .product-list {
    flex-direction: column;
    gap: 40px;
  }

  .bike-image {
    width: 90%;
  }

  .text-wrapper-25 {
    font-size: 32px;
  }

  .text-wrapper-26 {
    font-size: 18px;
  }

  .text-wrapper-27 {
    font-size: 15px;
  }
}
</style>
