<template>
  <section class="contact-section" aria-labelledby="contact-title">
    <img class="background-6" src="/img/Rectangle 4.png" alt="Image de fond formulaire contact" />

    <div class="contact-form-container">
      <h2 id="contact-title" class="form-title">Contact</h2>
      <p class="form-subtitle">Essayez le STELLAR Z près de chez vous !</p>

      <form @submit.prevent="submitForm" aria-label="Formulaire de contact pour essai STELLAR Z">
        <div class="form-grid">
          <!-- Nom -->
          <div class="form-group">
            <label for="name">Nom*</label>
            <input type="text" v-model="name" id="name" placeholder="Entrez votre nom ici" required aria-required="true" />
          </div>

          <!-- Email -->
          <div class="form-group">
            <label for="email">Email*</label>
            <input type="email" v-model="email" id="email" placeholder="Entrez votre email ici" required aria-required="true" />
          </div>

          <!-- Téléphone -->
          <div class="form-group">
            <label for="phone">Téléphone*</label>
            <input type="text" v-model="phone" id="phone" placeholder="Entrez votre téléphone" required aria-required="true" />
          </div>

          <!-- Ville -->
          <div class="form-group">
            <label for="city">Ville souhaitée*</label>
            <select v-model="city" id="city" required aria-required="true">
              <option value="" disabled selected>Choisissez une ville</option>
              <option>Antananarivo</option>
              <option>Toamasina</option>
              <option>Fianarantsoa</option>
              <option>Mahajanga</option>
              <option>Toliara</option>
            </select>
          </div>

          <!-- Date -->
          <div class="form-group full-width">
            <label for="date">Date pour rendez-vous*</label>
            <input type="date" v-model="date" id="date" required aria-required="true" />
          </div>
        </div>

        <div class="button-wrapper">
          <button type="submit">Trouver un magasin</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContactSection',
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      city: '',
      date: ''
    };
  },
  methods: {
    submitForm() {
      console.log('Formulaire soumis:', {
        name: this.name,
        email: this.email,
        phone: this.phone,
        city: this.city,
        date: this.date
      });
      alert('Demande envoyée avec succès ! (Simulation)');
      this.name = '';
      this.email = '';
      this.phone = '';
      this.city = '';
      this.date = '';
    }
  }
};
</script>

<style scoped>
.contact-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 80px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat', sans-serif; /* ✅ Font global */
}

.background-6 {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
  z-index: -1;
}

.contact-form-container {
  width: 100%;
  max-width: 1100px;
  padding: 50px;
  border: 2px solid #e08b0d;
  border-radius: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  box-sizing: border-box;
}

.form-title {
  font-weight: 700;
  font-size: 48px;
  color: #e08b0d;
  text-align: center;
  margin-bottom: 10px;
}

.form-subtitle {
  font-size: 20px;
  margin-bottom: 40px;
  font-weight: 400;
  text-align: center;
}

.form-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.form-group {
  flex: 1 1 calc(50% - 24px);
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  flex: 1 1 100%;
}

label {
  margin-bottom: 6px;
  font-size: 15px;
  font-weight: 600;
}

input,
select {
  padding: 14px;
  background-color: #0f0f0f;
  color: white;
  border: 1px solid #e08b0d;
  border-radius: 6px;
  font-size: 15px;
  font-family: 'Montserrat', sans-serif;
}

input::placeholder,
select:invalid {
  color: #ccc;
}

select:required:invalid {
  color: #ccc;
}

.button-wrapper {
  margin-top: 35px;
  text-align: center;
  width: 100%;
}

button {
  background-color: #e08b0d;
  color: white;
  font-weight: 700;
  padding: 14px 30px;
  font-size: 20px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s ease;
  font-family: 'Montserrat', sans-serif;
}

button:hover {
  background-color: #c77300;
}

@media (max-width: 768px) {
  .form-group {
    flex: 1 1 100%;
  }

  .form-title,
  .form-subtitle {
    text-align: center;
  }

  .button-wrapper {
    text-align: center;
  }
}
</style>
