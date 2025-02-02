<template>
  <div class="car-page">
    <h2>List of Cars</h2>
    <div v-if="cars.length === 0" class="no-data">
      <p>No cars available to display.</p>
    </div>
    <div class="car-list" v-else>
      <div class="car-card" v-for="(car, index) in cars" :key="index">
        <img :src="car.imageUrl" alt="Car Image" class="car-image" />
        <div class="car-details">
          <h3>{{ car.brand }}</h3>
          <p>Model: {{ car.model }}</p>
          <p>Year: {{ car.year }}</p>
        </div>
        <div class="action-buttons">
          <button @click="editCar(car.id)" class="edit-btn">Edit</button>
          <button @click="deleteCar(car.id)" class="delete-btn">Delete</button>
        </div>
      </div>
    </div>

    <div class="pagination">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="pagination-button"
      >
        Previous
      </button>
      <span class="page-info">Page {{ currentPage }}</span>
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="cars.length < pageSize"
        class="pagination-button"
      >
        Next
      </button>
    </div>

    <div class="navigation">
      <button @click="goBack" class="back-btn">Back</button>
    </div>
  </div>
</template>

<script>
import apiClient from '@/api/api.js' // Import the apiClient

export default {
  data() {
    return {
      cars: [], // List of car models
      currentPage: Number(this.$route.params.page) || 1, // Default to page 1
      pageSize: 10, // Number of items per page
    }
  },
  methods: {
    async fetchCars(page) {
      try {
        const response = await apiClient.get(
          `/car?page=${page}&pageSize=${this.pageSize}`, // Use apiClient for the API request
        )
        this.cars = response.data // Update the car models list
      } catch (error) {
        console.error('Error fetching car models:', error)
      }
    },
    goToPage(page) {
      if (page < 1) return // Don't allow going below page 1
      this.currentPage = page
      this.fetchCars(page) // Fetch cars for the selected page
      this.$router.push(`/car/${page}`) // Update the URL to reflect the current page
    },
    goBack() {
      this.$router.push('/') // Redirect to the home page
    },
    async editCar(id) {
      const updatedCar = prompt(
        'Enter the updated car details (Brand, Model, Year, ImageUrl) separated by commas:',
      )
      if (!updatedCar) return

      const [Brand, Model, Year, ImageUrl] = updatedCar.split(',').map((item) => item.trim())
      const carData = { Brand, Model, Year: Number(Year), ImageUrl }

      try {
        await apiClient.put(`/car/${id}`, carData) // Use PUT API to update car
        alert('Car updated successfully!')
        this.fetchCars(this.currentPage) // Refresh the car list
      } catch (error) {
        console.error('Error updating car:', error)
        alert('Failed to update the car. Check the console for more details.')
      }
    },
    async deleteCar(id) {
      if (!confirm('Are you sure you want to delete this car?')) return

      try {
        await apiClient.delete(`/car/${id}`) // Use DELETE API to remove car
        alert('Car deleted successfully!')
        this.fetchCars(this.currentPage) // Refresh the car list
      } catch (error) {
        console.error('Error deleting car:', error)
        alert('Failed to delete the car. Check the console for more details.')
      }
    },
  },
  created() {
    this.fetchCars(this.currentPage) // Initial fetch when the component is created
  },
}
</script>

<style scoped>
.car-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.no-data {
  text-align: center;
  font-style: italic;
}

.car-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.car-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  width: 250px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.car-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
}

.car-details h3 {
  margin: 10px 0;
  font-size: 18px;
}

.car-details p {
  margin: 5px 0;
  color: #555;
}

.action-buttons {
  margin-top: 10px;
}

.edit-btn,
.delete-btn {
  padding: 5px 10px;
  font-size: 14px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-btn {
  background-color: #007bff;
  color: white;
}

.edit-btn:hover {
  background-color: #0056b3;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.delete-btn:hover {
  background-color: #a71d2a;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 4px;
  cursor: pointer;
}

.pagination-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.page-info {
  font-size: 16px;
  margin: 0 10px;
}

.navigation {
  margin-top: 20px;
  text-align: center;
}

.back-btn {
  padding: 10px 15px;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-btn:hover {
  background-color: #0056b3;
}

.back-btn:active {
  background-color: #003f7f;
}
</style>
