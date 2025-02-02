<template>
  <div class="add-car-container">
    <h2>Add Car</h2>
    <form @submit.prevent="addCar" class="add-car-form">
      <div class="form-group">
        <label for="brand">Brand</label>
        <input
          type="text"
          id="brand"
          v-model="car.brand"
          class="form-input"
          placeholder="Enter car brand"
        />
      </div>
      <div class="form-group">
        <label for="model">Model</label>
        <input
          type="text"
          id="model"
          v-model="car.model"
          class="form-input"
          placeholder="Enter car model"
        />
      </div>
      <div class="form-group">
        <label for="year">Year</label>
        <input
          type="number"
          id="year"
          v-model="car.year"
          class="form-input"
          placeholder="Enter car year"
        />
      </div>
      <div class="form-group">
        <label for="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          v-model="car.imageUrl"
          class="form-input"
          placeholder="Enter image URL"
        />
      </div>
      <div class="form-group">
        <button type="submit" class="submit-btn">Add Car</button>
      </div>
      <p v-if="message" class="success-message">{{ message }}</p>
    </form>
  </div>
</template>

<script>
import apiClient from '@/api/api.js'

export default {
  data() {
    return {
      car: {
        brand: '',
        model: '',
        year: null,
        imageUrl: '',
      },
      message: '',
    }
  },
  methods: {
    async addCar() {
      try {
        const response = await apiClient.post('/car', this.car)
        this.message = 'Car added successfully!'
        console.log('Car added:', response.data)

        // Reset form setelah berhasil
        this.car = { brand: '', model: '', year: null, imageUrl: '' }

        // Redirect ke halaman daftar mobil setelah 1 detik
        setTimeout(() => {
          this.$router.push('/car')
        }, 1000)
      } catch (error) {
        console.error('Error adding car:', error)
      }
    },
  },
}
</script>

<style scoped>
.add-car-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.add-car-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-input {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

.form-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
}

.submit-btn {
  padding: 10px 15px;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.success-message {
  color: green;
  text-align: center;
  margin-top: 10px;
}
</style>
