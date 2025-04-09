<template>
  <div class="gallery-section">
    <img class="background-5" src="img/Rectangle 4.png" alt="Background" />
    <div class="gallery-title animate-fade-in">Galerie & Produits</div>

    <div class="gallery-grid">
      <div class="gallery-item animate-gallery-item" v-observe-visibility="visibilityOptions">
        <img src="img/Megatower22_52i06111.png" alt="Bike 1" class="gallery-image" />
      </div>

      <div class="gallery-item middle-feature animate-gallery-item" @click="showVideo = true" v-observe-visibility="visibilityOptions">
        <img src="img/AM_Jackson-VALA-240903-170_c1c41acf-1ca0-4721-ae03-ce53807e6a3ee.png" alt="Video Feature" class="gallery-image" />
      </div>

      <div class="gallery-item animate-gallery-item" v-observe-visibility="visibilityOptions">
        <img src="img/Dan_Booker_Tasmania_-_Bronson_road_trip_SML-571.png" alt="Bike 2" class="gallery-image" />
      </div>
    </div>

    <div class="gallery-landscape animate-gallery-item" v-observe-visibility="visibilityOptions">
      <img src="img/phoyo.png" alt="Bike 3" class="gallery-landscape-image" />
      <div class="play-button animated large" @click="showVideo = true"></div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'GallerySection',
  data() {
    return {
      showVideo: false,
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
.gallery-section {
  position: relative;
  width: 100%;
  padding: 80px 20px 100px;
  overflow: hidden;
  box-sizing: border-box;
  background: #f5f7fa;
}

.background-5 {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
  z-index: -1;
  animation: parallax 30s infinite linear;
}

.gallery-title {
  text-align: center;
  font-family: "Montserrat-Bold", Helvetica;
  font-weight: 700;
  color: #e08b0d;
  font-size: 48px;
  margin-bottom: 60px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  position: relative;
}

.gallery-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  z-index: 1;
  position: relative;
}

.gallery-item {
  width: 100%;
  max-width: 400px;
  aspect-ratio: 2/3;
  text-align: center;
  position: relative;
  cursor: pointer;
  opacity: 0;
  transition: transform 0.4s ease, opacity 0.4s ease, box-shadow 0.3s ease;
}

.gallery-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  transition: transform 0.4s ease;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.gallery-landscape {
  width: 100%;
  max-width: 900px;
  margin: 80px auto 0;
  text-align: center;
  position: relative;
  opacity: 0;
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.gallery-landscape.visible {
  opacity: 1;
  transform: translateY(0);
}

.gallery-landscape-image {
  width: 100%;
  border-radius: 12px;
  height: auto;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.gallery-landscape:hover .gallery-landscape-image {
  transform: scale(1.03);
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.play-button.large {
  width: 100px;
  height: 100px;
}

.play-button::before {
  content: '';
  display: block;
  width: 0;
  height: 0;
  border-left: 26px solid #e08b0d;
  border-top: 16px solid transparent;
  border-bottom: 16px solid transparent;
  margin-left: 6px;
}

.play-button:hover {
  background-color: rgba(0, 0, 0, 0.9);
  transform: translate(-50%, -50%) scale(1.1);
}

.play-button.animated {
  animation: pulse 1.5s infinite ease-in-out;
}

.video-modal-enter-active,
.video-modal-leave-active {
  transition: opacity 0.5s ease;
}

.video-modal-enter-from,
.video-modal-leave-to {
  opacity: 0;
}

.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.video-container {
  width: 80%;
  max-width: 960px;
  height: 540px;
  background: #000;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

/* Animations */
@keyframes parallax {
  0% { background-position: 0 0; }
  100% { background-position: 200px 0; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes galleryItemEnter {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes pulse {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 1s ease-in forwards;
}

.animate-gallery-item {
  animation: galleryItemEnter 0.8s ease-out;
  animation-fill-mode: both;
}

/* Responsive */
@media (max-width: 768px) {
  .gallery-title {
    font-size: 32px;
  }

  .gallery-grid {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  .gallery-item {
    max-width: 90%;
    aspect-ratio: 3/4;
  }

  .play-button.large {
    width: 80px;
    height: 80px;
  }

  .play-button::before {
    border-left: 18px solid #e08b0d;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
  }

  .video-container {
    width: 95%;
    height: 50vh;
  }
}
</style>